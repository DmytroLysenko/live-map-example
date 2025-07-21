import React from "react";

import TicketItem from "./components/TicketItem";

import { ITicket } from "../../types/ticket";
import { IOLActionState } from "../../TPSMapApp";
import type { IMapItemIdentifies } from "@onlocation/tps-map";

interface IProps {
  tickets: ITicket[];
  selectedTickets: ITicket["id"][];
  actionState: IOLActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  setToken: (token: string | null) => void;
}

const Sidebar = ({
  tickets,
  onHover,
  onClick,
  setToken,
  actionState,
  selectedTickets,
}: IProps) => {
  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        borderRight: "3px dashed gray",
        overflow: "auto",
        fontSize: "12px",
      }}
    >
      <div>
        <h4 style={{ fontSize: "16px", margin: "10px" }}>Token</h4>
        <input
          type="password"
          onChange={({ target: { value } }) => setToken(value || null)}
        />
      </div>
      <h4 style={{ fontSize: "16px", margin: "10px" }}>Tickets</h4>
      <div>
        <strong>Hover:</strong>
        <div>Section: {`${actionState.hover?.sectionName}`}</div>
        <div>Row: {`${actionState.hover?.rowName}`}</div>
      </div>
      <div>
        <strong>Focus:</strong>
        <div>Section: {`${actionState.focus?.sectionName}`}</div>
        <div>Row: {`${actionState.focus?.rowName}`}</div>
      </div>
      {tickets
        .filter((ticket) => {
          if (selectedTickets.length) {
            return selectedTickets.includes(ticket.id);
          }
          return true;
        })
        .map((ticket) => {
          let active = false;
          const currentFocus = actionState.focus || actionState.hover;
          if (currentFocus) {
            if (
              !currentFocus.rowName &&
              ticket.section === currentFocus.sectionName
            ) {
              active = true;
            } else if (
              currentFocus.rowName === ticket.row &&
              currentFocus.sectionName === ticket.section
            ) {
              active = true;
            }
          }

          return (
            <TicketItem
              active={active}
              key={ticket.id}
              ticket={ticket}
              onClick={onClick}
              onHover={onHover}
            />
          );
        })}
    </div>
  );
};

export default Sidebar;
