import { ItemAction, ITicket, IWatermark } from "./types";

export const getStringPrice = (price: number, minimumFractionDigits?: number) =>
  `$${price.toLocaleString("en-US", { minimumFractionDigits: minimumFractionDigits || 0 })}`;

export const isTicketSelected = (selected: ItemAction[], ticket: ITicket) => {
  return selected.some((item) => {
    if (item.sectionName !== ticket.section) {
      return false;
    }
    if (item.rowName && item.rowName !== ticket.row) {
      return false;
    }
    return true;
  });
};

export const getCurrentWatermark = (
  ticketWatermarks: ITicket["watermarks"],
  selected: IWatermark[]
) => {
  if (!ticketWatermarks?.length) {
    return undefined;
  }
  if (!selected.length) {
    return [...ticketWatermarks].sort((a, b) => a.sortOrder - b.sortOrder)[0];
  } else {
    const selectedWatermarkIds = selected.map((item) => item.id);
    return ticketWatermarks
      .filter((item) => selectedWatermarkIds.includes(item.id))
      .sort((a, b) => a.sortOrder - b.sortOrder)[0];
  }
};
