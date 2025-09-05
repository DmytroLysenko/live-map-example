import React from "react";

import TicketItem from "./components/TicketItem";

import { ITicket, NewTicket } from "../../types/ticket";
import { IOLActionState } from "../../TPSMapApp";
import type { IMapItemIdentifies } from "@onlocation/tps-map";
import Tickets from "./components/Tickets";
import LayoutFilter from "./components/LayoutFilter/LayoutFilter";
import TokenFilter from "./components/TokenFilter";
import Status from "./components/Status";
import NewTicketForm from "./components/NewTicketForm";
import Labeling from "./components/Labeling";

interface IProps {
  tickets: ITicket[];
  selectedTickets: ITicket["id"][];
  actionState: IOLActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  setToken: (token: string | null) => void;
  setLabelingByData: (value: boolean) => void;
  labelingByData: boolean;
  layoutId: string;
  onLayoutIdChange: (id: string) => void;
  onAddTicket: (newTicket: NewTicket) => void;
}

const Sidebar = ({
  tickets,
  onHover,
  onClick,
  setToken,
  actionState,
  selectedTickets,
  layoutId,
  onLayoutIdChange,
  onAddTicket,
  setLabelingByData,
  labelingByData,
}: IProps) => {
  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        overflow: "hidden",
        fontSize: "12px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Labeling onLabelingChange={setLabelingByData} value={labelingByData} />
      <TokenFilter onTokenChange={setToken} />
      <LayoutFilter layoutId={layoutId} onChange={onLayoutIdChange} />
      <Status actionState={actionState} />
      <NewTicketForm onAddTicket={onAddTicket} />
      <Tickets
        tickets={tickets}
        selectedTickets={selectedTickets}
        actionState={actionState}
        onHover={onHover}
        onClick={onClick}
      />
    </div>
  );
};

export default Sidebar;
