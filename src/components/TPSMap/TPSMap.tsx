import React, { ForwardedRef, forwardRef, useRef, useState, useMemo } from "react"

import { MapStateContext, SetMapStateContext, DEFAULT_MAP_STATE } from "./state"

import VenueMap from "@onlocation/venue-map"
import LevelSelection from "./components/LevelSelection"
import MapStateMonitor from "./components/MapStateMonitor"

import { useMapItems } from "./hooks/useMapItems"
import { getIdByMapItemIdentifies, getMappedDataById } from "./state/utils"

import { IMapItemIdentifies } from "./types/common"
import type { MapRef } from "@onlocation/venue-map"
import { IMapProps } from "./types/map"

const TPSMap = forwardRef((props: IMapProps, forwardedRef: ForwardedRef<MapRef>) => {
  const {
    token,
    venueLayoutId,
    items = [],
    extraContent,
    level,

    hoveredItem,
    focusedItem,
    selectedItems,
    onItemHover,
    onItemClick,
    onItemsSelect,
    onLevelChange,
    defaultExtraContentOptions,
    ...restProps
  } = props

  const [mapState, setMapState] = useState(DEFAULT_MAP_STATE)

  const mapRef = useRef<MapRef>(null)

  const mapItems = useMapItems(items, mapState, level)

  const hoverId = useMemo(
    () =>
      getIdByMapItemIdentifies(
        hoveredItem,
        mapState.layout,
        mapState.settings.level,
      ),
    [hoveredItem, mapState.layout, mapState.settings.level],
  )
  const focusId = useMemo(
    () =>
      getIdByMapItemIdentifies(
        focusedItem,
        mapState.layout,
        mapState.settings.level,
      ),
    [focusedItem, mapState.layout, mapState.settings.level],
  )
  const selectIds = useMemo(
    () =>
      Array.from(
        new Set(
          selectedItems?.reduce((result, item) => {
            const id = getIdByMapItemIdentifies(
              item,
              mapState.layout,
              mapState.settings.level,
            )
            if (id) {
              result.push(id)
            }
            return result
          }, [] as number[]),
        ),
      ),
    [selectedItems, mapState.layout, mapState.settings.level],
  )

  const handleItemHover = (itemId: string | number | null) => {
    if (typeof onItemHover !== "function") return
    if (itemId) {
      const { mapItemIdentifies } = getMappedDataById(
        itemId as number,
        mapState.layout,
        mapState.settings.level,
      )
      onItemHover(mapItemIdentifies)
    } else {
      onItemHover()
    }
  }
  const handleItemClick = (itemId: string | number) => {
    if (typeof onItemClick !== "function") return
    const { mapItemIdentifies } = getMappedDataById(
      itemId as number,
      mapState.layout,
      mapState.settings.level,
    )
    if (mapItemIdentifies) {
      onItemClick(mapItemIdentifies)
    }
  }
  const handleItemSelect = (
    itemId: string | number,
    itemIds: (string | number)[],
  ) => {
    if (typeof onItemsSelect !== "function") return
    const selection = itemIds.reduce((result, id) => {
      const { mapItemIdentifies } = getMappedDataById(
        id as number,
        mapState.layout,
        mapState.settings.level,
      )
      if (mapItemIdentifies) {
        result.push(mapItemIdentifies)
      }
      return result
    }, [] as IMapItemIdentifies[])
    const { mapItemIdentifies } = getMappedDataById(
      itemId as number,
      mapState.layout,
      mapState.settings.level,
    )
    if (mapItemIdentifies) {
      onItemsSelect(mapItemIdentifies, selection)
    }
  }

  return (
    <MapStateContext.Provider value={mapState}>
      <SetMapStateContext.Provider value={setMapState}>
        <>
          <MapStateMonitor venueLayoutId={venueLayoutId} token={token} />
          <VenueMap
            {...restProps}
            ref={(ref) => {
              mapRef.current = ref
              if (forwardedRef) {
                if (typeof forwardedRef === "function") {
                  forwardedRef(ref)
                } else {
                  forwardedRef.current = ref
                }
              }
            }}
            defaultExtraContentOptions={defaultExtraContentOptions}
            extraContent={{
              ...extraContent,
              "top-center":
                defaultExtraContentOptions !== false &&
                defaultExtraContentOptions?.level !== false
                  ? {
                      component: (
                        <LevelSelection
                          onLevelChange={onLevelChange}
                          levelWrapperClassName={
                            defaultExtraContentOptions?.levelWrapperClassName
                          }
                        />
                      ),
                    }
                  : undefined,
            }}
            background={{ venueLayoutId }}
            items={mapItems}
            hoverId={hoverId}
            focusId={focusId}
            selectIds={selectIds}
            onItemHover={handleItemHover}
            onItemClick={handleItemClick}
            onItemSelect={handleItemSelect}
          />
        </>
      </SetMapStateContext.Provider>
    </MapStateContext.Provider>
  )
})

export default TPSMap
