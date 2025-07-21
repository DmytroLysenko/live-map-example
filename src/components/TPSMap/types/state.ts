import { VenueMapLevel } from "./common"
import { IRow, ISection } from "./layout"
import { IMapProps } from "./map"

export interface IMapState {
  layout: ILayoutMapState
  settings: IMapSettingsState
}

export interface ILayoutMapState {
  loading: boolean
  venueLayoutId: IMapProps["venueLayoutId"]
  sectionByIdMap: Map<ISection["id"], ISection>
  rowByIdMap: Map<IRow["id"], IRow>
  sectionByNameMap: Map<string, ISection>
  rowBySectionIdRowNameMap: Map<string, IRow>
}

export interface IMapSettingsState {
  level: VenueMapLevel
}
