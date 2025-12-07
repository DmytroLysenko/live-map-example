import { useMemo } from "react";
import { ITicket, IWatermark } from "../types";
import { getRowKey, isWatermarkIncludes } from "../utils";

interface ITicketRowData {
  tickets: ITicket[];
  watermarks: IWatermark[];
}

export const useRows = (allTickets: ITicket[]) => {
  const rows = useMemo(
    () =>
      allTickets.reduce((result, ticket) => {
        const ticketRowKey = getRowKey(ticket);
        const { tickets = [], watermarks = [] } =
          result.get(ticketRowKey) || {};
        tickets.push(ticket);
        if (ticket.watermarks?.length) {
          ticket.watermarks.forEach((w) => {
            !isWatermarkIncludes(watermarks, w) && watermarks.push(w);
          });
        }
        result.set(ticketRowKey, { tickets, watermarks });
        return result;
      }, new Map<string, ITicketRowData>()),
    [allTickets]
  );
  return rows;
};
