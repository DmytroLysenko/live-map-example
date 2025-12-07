import { useMemo } from "react";
import { ITicket, IWatermark } from "../types";
import { getRowKey, isWatermarkIncludes } from "../utils";

export interface ITicketSectionData {
  tickets: ITicket[];
  watermarks: IWatermark[];
  rowNames: ITicket["row"][];
}

export const useSections = (allTickets: ITicket[]) => {
  const rows = useMemo(
    () =>
      allTickets.reduce((result, ticket) => {
        const {
          tickets = [],
          watermarks = [],
          rowNames = [],
        } = result.get(ticket.section) || {};
        tickets.push(ticket);
        if (ticket.watermarks?.length) {
          ticket.watermarks.forEach((w) => {
            !isWatermarkIncludes(watermarks, w) && watermarks.push(w);
          });
        }
        const ticketRowName = ticket.row;
        if (!rowNames.includes(ticketRowName)) {
          rowNames.push(ticketRowName);
        }
        result.set(ticket.section, { tickets, watermarks, rowNames });
        return result;
      }, new Map<ITicket["section"], ITicketSectionData>()),
    [allTickets]
  );
  return rows;
};
