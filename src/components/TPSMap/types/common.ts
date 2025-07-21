import { IRowDto, ISectionDto } from "./layout"

export type VenueMapLevel = "section" | "row"
export type CallbackResponse = void | Promise<void>

export interface IMapItemIdentifies {
  sectionId?: ISectionDto["id"]
  rowId?: IRowDto["id"] | undefined
  sectionName?: ISectionDto["name"]
  rowName?: IRowDto["name"] | undefined
  aliases?: ISectionDto["sectionAliases"] | IRowDto["rowAliases"]
  sortOrder?: number
}
