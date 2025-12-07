import { useMemo } from "react";
import { ItemAction, ITicket, IWatermark } from "../types";
import { isTicketSelected } from "../utils";

interface IProps {
  tickets: ITicket[];
  selectedWatermarks: IWatermark[];
  selectedItems: ItemAction[];
}

export const useFilteredTickets = ({
  tickets,
  selectedWatermarks,
  selectedItems,
}: IProps) => {
  return useMemo(() => {
    const selectedWatermarkIds = selectedWatermarks.map((item) => item.id);
    return tickets.filter((item) => {
      if (
        selectedWatermarkIds.length &&
        (!item.watermarks ||
          !item.watermarks.some((w) => selectedWatermarkIds.includes(w.id)))
      ) {
        return false;
      }
      if (selectedItems.length && !isTicketSelected(selectedItems, item)) {
        return false;
      }
      return true;
    });
  }, [tickets, selectedWatermarks, selectedItems]);
};
