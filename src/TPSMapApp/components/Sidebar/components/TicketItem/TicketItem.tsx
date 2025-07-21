import React from "react";

import { ITicket } from "../../../../types/ticket";
import type { IMapItemIdentifies } from "@onlocation/tps-map";

interface IProps {
  ticket: ITicket;
  active: boolean;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
}
const TicketItem = ({ ticket, active, onClick, onHover }: IProps) => {
  const { watermarks } = ticket;
  return (
    <div
      style={{
        margin: "10px 0",
        border: "2px solid transparent",
        borderColor: active ? "red" : "transparent",
        overflow: "auto",
      }}
      onMouseEnter={() =>
        onHover({ sectionName: ticket.section, rowName: ticket.row })
      }
      onMouseLeave={() => onHover(undefined)}
      onClick={() =>
        onClick({ sectionName: ticket.section, rowName: ticket.row })
      }
    >
      <strong>Ticket ID: {ticket.id}</strong>
      <div>Section: {`${ticket.section}`}</div>
      <div>Row: {`${ticket.row}`}</div>
      <div>Section ID: {`${ticket.sectionId}`}</div>
      <div>Row ID: {`${ticket.rowId}`}</div>
      {watermarks &&
        watermarks.length > 0 &&
        watermarks
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((watermark) => (
            <div
              key={watermark.id}
              style={{
                marginLeft: 10,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: watermark.color,
                }}
              />
              <div>
                {watermark.watermarkName} ({watermark.sortOrder})
              </div>
            </div>
          ))}
    </div>
  );
};

export default TicketItem;
