import { IMapState } from "../types/state"

const DEFAULT_MAP_LAYOUT_STATE: IMapState["layout"] = {
  loading: false,
  venueLayoutId: undefined,
  sectionByIdMap: new Map(),
  rowByIdMap: new Map(),
  sectionByNameMap: new Map(),
  rowBySectionIdRowNameMap: new Map(),
}

const DEFAULT_MAP_SETTINGS_STATE: IMapState["settings"] = {
  level: "section",
}

export const DEFAULT_MAP_STATE: IMapState = {
  layout: DEFAULT_MAP_LAYOUT_STATE,
  settings: DEFAULT_MAP_SETTINGS_STATE,
}
