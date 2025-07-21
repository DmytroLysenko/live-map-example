import { useMemo } from "react"

import { getMappedMapItem } from "../state/utils"

import { IMapState } from "../types/state"
import { IMapItem } from "../types/mapItem"
import { IMapProps } from "../types"
import type { IMapItem as IVenueMapItem } from "@onlocation/venue-map"

export const useMapItems = (
  items: IMapItem[],
  mapState: IMapState,
  level: IMapProps["level"],
) => {
  const { layout, settings } = mapState

  const actualLevel = level || settings.level

  const shapes = useMemo(
    () =>
      actualLevel === "row"
        ? Array.from(layout.rowByIdMap.values())
        : Array.from(layout.sectionByIdMap.values()),
    [layout, actualLevel],
  )

  return useMemo(
    () =>
      shapes.map((shape) => {
        const mappedItem = getMappedMapItem(shape.id, layout, items)
        return {
          id: shape.id,
          multiPolygon: shape.multiPolygon,
          inactiveStyles: mappedItem?.inactiveStyles,
          activeStyles: mappedItem?.activeStyles,
          noninteractive: mappedItem?.noninteractive,
          tooltip:
            level === "row" ? mappedItem?.rowTooltip : mappedItem?.sectionTooltip,
          interactive: !!mappedItem,
          fillPattern: mappedItem?.fillPattern,
        } as IVenueMapItem
      }),
    [shapes, layout, items],
  )
}
