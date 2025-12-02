import React from "react";

import TicketItem from "../TicketItem";

import { ITicket, IActionState } from "../../../../types";
import type { IMapItemIdentifies } from "@onlocation/tps-map";
import StyledContainer from "./StyledContainer";

interface IProps {
  tickets: ITicket[];
  actionState: IActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
}

const Tickets = ({
  tickets,
  actionState,
  onHover,
  onClick,
  onDeleteTicket,
}: IProps) => {
  return (
    <StyledContainer>
      {tickets.map((ticket) => {
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
            onDeleteTicket={onDeleteTicket}
          />
        );
      })}
    </StyledContainer>
  );
};

export default Tickets;
