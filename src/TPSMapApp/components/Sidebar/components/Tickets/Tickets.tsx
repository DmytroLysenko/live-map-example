import React from "react";

import TicketItem from "../TicketItem";

import { IOLActionState } from "../../../../TPSMapApp";
import { ITicket } from "../../../../types/ticket";
import type { IMapItemIdentifies } from "@onlocation/tps-map";
import Section from "../Section";
import Label from "../Label";

interface IProps {
  tickets: ITicket[];
  selectedTickets: ITicket["id"][];
  actionState: IOLActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
}

const Tickets = ({
  tickets,
  selectedTickets,
  actionState,
  onHover,
  onClick,
}: IProps) => {
  return (
    <Section style={{ flex: "auto" }}>
      <Label label="Tickets" />
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
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
    </Section>
  );
};

export default Tickets;
