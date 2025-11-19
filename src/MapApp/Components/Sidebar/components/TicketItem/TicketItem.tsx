import React from "react";

import { ITicket } from "../../../../types";
import type { IMapItemIdentifies } from "@onlocation/tps-map";
import StyledContainer from "./StyledContainer";
import { getStringPrice } from "../../../../utils";

interface IProps {
  ticket: ITicket;
  active: boolean;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
}
const TicketItem = ({
  ticket,
  active,
  onClick,
  onHover,
  onDeleteTicket,
}: IProps) => {
  const { watermarks } = ticket;
  return (
    <StyledContainer
      style={
        active
          ? {
              borderColor: "red",
            }
          : undefined
      }
      onMouseEnter={() =>
        onHover({ sectionName: ticket.section, rowName: ticket.row })
      }
      onMouseLeave={() => onHover(undefined)}
      onClick={() =>
        onClick({ sectionName: ticket.section, rowName: ticket.row })
      }
    >
      <div>
        <div>
          Section: <strong>{`${ticket.section}`}</strong>
        </div>
        <div>
          Row: <strong>{`${ticket.row}`}</strong>
        </div>
        <div>
          Price: <strong>{getStringPrice(ticket.price)}</strong>
        </div>
        {watermarks && watermarks.length > 0 && (
          <div>
            Hospitality Options:
            {watermarks
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
                  title={`${watermark.watermarkName} (Sort Order: ${watermark.sortOrder})`}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: watermark.color,
                    }}
                  />
                  <div>{watermark.watermarkName}</div>
                </div>
              ))}
          </div>
        )}
      </div>
      <i
        className="material-icons"
        style={{ cursor: "pointer", fontSize: "20px" }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onDeleteTicket(ticket.id);
        }}
      >
        delete_forever
      </i>
    </StyledContainer>
  );
};

export default TicketItem;
