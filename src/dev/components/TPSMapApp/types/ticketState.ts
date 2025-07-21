import { IRowDto, ISectionDto } from "../../../../components/TPSMap/types/layout"
import { ITicket, IWatermark } from "./ticket"

export interface ITicketState {
  ticketsByIdMap: Map<ITicket["id"], ITicket>
  ticketsByWatermarkIdMap: Map<IWatermark["id"], ITicket[]>
  // TODO: Rename to like active...
  sectionDataByIdMap: Map<
    ITicket["sectionId"],
    { color: string; sectionId: ITicket["sectionId"]; rowId: ITicket["rowId"] }
  >
  rowDataByIdMap: Map<
    ITicket["rowId"],
    { color: string; sectionId: ITicket["sectionId"]; rowId: ITicket["rowId"] }
  >
  watermarks: IWatermark[]
  watermarksByIdMap: Map<IWatermark["id"], IWatermark>
  sectionRowIdsByWatermarkIdMap: Map<
    IWatermark["id"],
    { sectionIds: ISectionDto["id"][]; rowIds: IRowDto["id"][] }
  >
}
