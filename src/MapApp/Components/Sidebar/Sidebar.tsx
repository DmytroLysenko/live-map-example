import React from "react";

import { ITicket, IActionState } from "../../types";
import StyledSidebar from "./StyledSidebar";
import TicketsMobile from "../TicketsTable";

import type { IMapItemIdentifies } from "@onlocation/tps-map";

interface IProps {
  tickets: ITicket[];
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
  onResetSelection: () => void;
  isSelected: boolean;
}

const Sidebar = ({
  tickets,
  onHover,
  onClick,
  onDeleteTicket,
  onResetSelection,
  isSelected,
}: IProps) => {
  return (
    <StyledSidebar>
      <TicketsMobile
        detailed
        tickets={tickets}
        onHover={onHover}
        onClick={onClick}
        onDeleteTicket={onDeleteTicket}
        onResetSelection={onResetSelection}
        isSelected={isSelected}
      />
    </StyledSidebar>
  );
};

export default Sidebar;
