import { CallbackResponse, IMapItemIdentifies, VenueMapLevel } from "./common"
import type {
  IVenueMapProps,
  DefaultExtraContentOptions as VenueMapDefaultExtraContentOptions,
} from "@onlocation/venue-map"
import { IMapItem } from "./mapItem"

export type MapPoint = [number, number]
export type MultiPolygon = Array<Array<MapPoint>>

export interface IMapProps
  extends Omit<
    IVenueMapProps,
    | "items"
    | "background"
    | "hoverId"
    | "focusId"
    | "selectIds"
    | "onItemHover"
    | "onItemClick"
    | "onItemsSelect"
    | "defaultExtraContentOptions"
  > {
  /** Should be memorized */
  items?: IMapItem[]
  venueLayoutId?: number
  level?: VenueMapLevel
  token: string

  hoveredItem?: IMapItemIdentifies
  focusedItem?: IMapItemIdentifies
  selectedItems?: IMapItemIdentifies[]
  onItemHover?: (item?: IMapItemIdentifies) => CallbackResponse
  onItemClick?: (item: IMapItemIdentifies) => CallbackResponse
  onItemsSelect?: (
    item: IMapItemIdentifies,
    items: IMapItemIdentifies[],
  ) => CallbackResponse
  onLevelChange?: (level: VenueMapLevel) => CallbackResponse

  defaultExtraContentOptions?: false | DefaultExtraContentOptions
}

type DefaultExtraContentOptions = VenueMapDefaultExtraContentOptions & {
  level?: false
  levelWrapperClassName?: string
}
