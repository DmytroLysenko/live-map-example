import { IMapItem } from "../types/mapItem"
import { GeometryType, ISectionDto, IRowDto, ISection, IRow } from "../types/layout"
import { IMapState } from "../types/state"
import { IMapItemIdentifies, VenueMapLevel } from "../types/common"

export const getLayoutState = (
  sections: ISectionDto[],
): Omit<IMapState["layout"], "loading" | "venueLayoutId"> => {
  const layout: Omit<IMapState["layout"], "loading" | "venueLayoutId"> = {
    sectionByIdMap: new Map(),
    rowByIdMap: new Map(),
    sectionByNameMap: new Map(),
    rowBySectionIdRowNameMap: new Map(),
  }
  if (sections?.length) {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const { coordinates, type } = section.shape || {}
      if (type === GeometryType.MultiPolygon && coordinates?.length) {
        const innerSection: ISection = {
          ...section,
          multiPolygon: coordinates.flat(),
        }
        layout.sectionByIdMap.set(section.id, innerSection)
        // aliases should be unique within the sections of a singe venue
        Array.from(
          new Set([section.name, ...(section.sectionAliases || [])]),
        ).forEach((name) => {
          layout.sectionByNameMap.set(name, innerSection)
        })
      }
      const { rows = [] } = section
      if (rows.length) {
        for (let j = 0; j < rows.length; j++) {
          const row = rows[j]
          const { coordinates, type } = row.shape || {}
          if (type === GeometryType.MultiPolygon && coordinates?.length) {
            const innerRow: IRow = {
              ...row,
              multiPolygon: coordinates.flat(),
            }
            layout.rowByIdMap.set(row.id, innerRow)
            Array.from(new Set([row.name, ...(row.rowAliases || [])])).forEach(
              (name) => {
                layout.rowBySectionIdRowNameMap.set(
                  `${section.id}_${name}`,
                  innerRow,
                )
              },
            )
          }
        }
      }
    }
  }

  return layout
}

const findMapItemByRow = (
  row: IRowDto,
  sectionNames: string[],
  items: IMapItem[],
): IMapItem[] => {
  return items.filter((item) => {
    if (item.rowId === row.id) {
      return true
    } else if (
      (row.name === item.rowName || row.rowAliases?.includes(item.rowName || "")) &&
      sectionNames.includes(item.sectionName || "")
    ) {
      return true
    }
    return false
  })
}

const findMapItemBySection = (
  section: ISectionDto,
  items: IMapItem[],
): IMapItem[] => {
  return items.filter((item) => {
    if (item.sectionId === section.id) {
      return true
    } else if (
      section.name === item.sectionName ||
      section.sectionAliases?.includes(item.sectionName || "")
    ) {
      return true
    }
    return false
  })
}

export const getMappedMapItem = (
  id: number,
  layout: IMapState["layout"],
  items: IMapItem[],
): IMapItem | undefined => {
  const { rowByIdMap, sectionByIdMap } = layout
  const row = rowByIdMap.get(id)
  const section = sectionByIdMap.get(id)
  if (row) {
    const section = sectionByIdMap.get(row.sectionId)
    const sectionNames = section
      ? [section.name, ...(section.sectionAliases || [])]
      : []
    return findMapItemByRow(row, sectionNames, items).sort(
      (a, b) => (b.sortOrder || 0) - (a.sortOrder || 0),
    )[0]
  } else if (section) {
    return findMapItemBySection(section, items).sort(
      (a, b) => (b.sortOrder || 0) - (a.sortOrder || 0),
    )[0]
  }
  return undefined
}

const getSectionByMapItemIdentifies = (
  mapItemIdentifies: IMapItemIdentifies | undefined,
  layout: IMapState["layout"],
) => {
  if (!mapItemIdentifies) return undefined
  return (
    (mapItemIdentifies.sectionId
      ? layout.sectionByIdMap.get(mapItemIdentifies.sectionId)
      : undefined) ||
    (mapItemIdentifies.sectionName
      ? layout.sectionByNameMap.get(mapItemIdentifies.sectionName)
      : undefined)
  )
}

export const getIdByMapItemIdentifies = (
  mapItemIdentifies: IMapItemIdentifies | undefined,
  layout: IMapState["layout"],
  level: VenueMapLevel,
): number | undefined => {
  if (!mapItemIdentifies) return undefined
  switch (level) {
    case "row": {
      const section = getSectionByMapItemIdentifies(mapItemIdentifies, layout)
      if (!section) return undefined
      const row: IRowDto | undefined =
        (mapItemIdentifies.rowId
          ? layout.rowByIdMap.get(mapItemIdentifies.rowId)
          : undefined) ||
        (mapItemIdentifies.rowName
          ? layout.rowBySectionIdRowNameMap.get(
              `${section.id}_${mapItemIdentifies.rowName}`,
            )
          : undefined)
      return row ? row.id : undefined
    }
    case "section": {
      const section = getSectionByMapItemIdentifies(mapItemIdentifies, layout)
      return section ? section.id : undefined
    }
  }
}

export const getMappedDataById = (
  id: number | undefined,
  layout: IMapState["layout"],
  level: VenueMapLevel,
) => {
  const result = {} as {
    mapItemIdentifies: IMapItemIdentifies | undefined
    mappedRow?: IRowDto
    mappedSection?: ISectionDto
  }
  if (!id) return result
  switch (level) {
    case "row": {
      const row = layout.rowByIdMap.get(id)
      const section = row ? layout.sectionByIdMap.get(row.sectionId) : undefined
      if (row && section) {
        result.mapItemIdentifies = {
          sectionId: section?.id,
          sectionName: section?.name,
          rowId: row.id,
          rowName: row.name,
          aliases: row.rowAliases,
        }
        result.mappedRow = row
        result.mappedSection = section
      }
      break
    }
    case "section": {
      const section = layout.sectionByIdMap.get(id)
      if (section) {
        result.mapItemIdentifies = {
          sectionId: section.id,
          sectionName: section.name,
          rowId: undefined,
          rowName: undefined,
          aliases: section.sectionAliases,
        }
        result.mappedSection = section
      }
      break
    }
  }
  return result
}
