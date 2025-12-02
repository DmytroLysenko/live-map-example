import React from "react";

import { ITicket, IActionState } from "../../types";
import StyledSidebar from "./StyledSidebar";
import TicketsMobile from "../TicketsTable";

import type { IMapItemIdentifies } from "@onlocation/tps-map";

interface IProps {
  tickets: ITicket[];
  actionState: IActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
}

const Sidebar = ({
  tickets,
  actionState,
  onHover,
  onClick,
  onDeleteTicket,
}: IProps) => {
  return (
    <StyledSidebar>
      <TicketsMobile
        detailed
        tickets={tickets}
        actionState={actionState}
        onHover={onHover}
        onClick={onClick}
        onDeleteTicket={onDeleteTicket}
      />
    </StyledSidebar>
  );
};

export default Sidebar;
