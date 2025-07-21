import { ITicketState } from "../../types/ticketState"
import { ITicket, IWatermark } from "../../types/ticket"
import { DEFAULT_COLOR } from "../../TPSMapApp"

const getSectionWatermarks = (ticket: ITicket, tickets: ITicket[]) => {
  const ticketsFromSameSection = tickets.filter(
    (item) => item.section === ticket.section,
  )
  const sectionWatermarkIds: IWatermark["id"][] = []
  const sectionWatermarks: IWatermark[] = []
  ticketsFromSameSection.forEach((ticket) => {
    if (ticket.watermarks?.length) {
      for (let i = 0; i < ticket.watermarks.length; i++) {
        const watermark = ticket.watermarks[i]
        if (!sectionWatermarkIds.includes(watermark.id)) {
          sectionWatermarkIds.push(watermark.id)
          sectionWatermarks.push(watermark)
        }
      }
    }
  })
  return sectionWatermarks
}

const getColorByWatermarks = (watermarks: ITicket["watermarks"]) => {
  if (!watermarks?.length) return DEFAULT_COLOR
  return watermarks.sort((a, b) => a.sortOrder - b.sortOrder)[0].color
}

export const getTicketState = (tickets?: ITicket[]): ITicketState => {
  const state: ITicketState = {
    ticketsByIdMap: new Map(),
    sectionDataByIdMap: new Map(),
    rowDataByIdMap: new Map(),
    watermarks: [],
    ticketsByWatermarkIdMap: new Map(),
    watermarksByIdMap: new Map(),
    sectionRowIdsByWatermarkIdMap: new Map(),
  }

  if (tickets?.length) {
    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i]
      const sectionWatermarks = getSectionWatermarks(ticket, tickets)
      state.ticketsByIdMap.set(ticket.id, ticket)
      state.sectionDataByIdMap.set(ticket.sectionId, {
        color: getColorByWatermarks(sectionWatermarks),
        sectionId: ticket.sectionId,
        rowId: ticket.rowId,
      })
      state.rowDataByIdMap.set(ticket.rowId, {
        color: getColorByWatermarks(ticket.watermarks),
        sectionId: ticket.sectionId,
        rowId: ticket.rowId,
      })

      if (ticket.watermarks?.length) {
        for (let j = 0; j < ticket.watermarks.length; j++) {
          const watermark = ticket.watermarks[j]

          const preWatermarkTickets = state.ticketsByWatermarkIdMap.get(watermark.id)
          if (preWatermarkTickets) {
            state.ticketsByWatermarkIdMap.set(watermark.id, [
              ...preWatermarkTickets,
              ticket,
            ])
          } else {
            state.ticketsByWatermarkIdMap.set(watermark.id, [ticket])
          }

          if (!state.watermarksByIdMap.has(watermark.id)) {
            state.watermarksByIdMap.set(watermark.id, watermark)
          }
          const sectionRowIdsMap = state.sectionRowIdsByWatermarkIdMap.get(
            watermark.id,
          )
          if (sectionRowIdsMap) {
            state.sectionRowIdsByWatermarkIdMap.set(watermark.id, {
              sectionIds: Array.from(
                new Set(
                  ticket.sectionId
                    ? [...sectionRowIdsMap.sectionIds, ticket.sectionId]
                    : sectionRowIdsMap.sectionIds,
                ),
              ),
              rowIds: Array.from(
                new Set(
                  ticket.rowId
                    ? [...sectionRowIdsMap.rowIds, ticket.rowId]
                    : sectionRowIdsMap.rowIds,
                ),
              ),
            })
          } else {
            state.sectionRowIdsByWatermarkIdMap.set(watermark.id, {
              sectionIds: ticket.sectionId ? [ticket.sectionId] : [],
              rowIds: ticket.rowId ? [ticket.rowId] : [],
            })
          }
        }
      }
    }
  }

  state.watermarks = Array.from(state.watermarksByIdMap.values())

  return state
}
