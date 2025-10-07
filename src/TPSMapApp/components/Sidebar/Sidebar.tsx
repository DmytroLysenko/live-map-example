import React from "react";

import Tickets from "./components/Tickets";
import LayoutFilter from "./components/LayoutFilter/LayoutFilter";
import TokenFilter from "./components/TokenFilter";
import Status from "./components/Status";
import NewTicketForm from "./components/NewTicketForm";
import Labeling from "./components/Labeling";
import Wheelchairs from "./components/Wheelchairs";
import DefaultItemStyles from "./components/DefaultItemStyles";
import FlyToOptions from "./components/FlyToOptions";

import {
  NewTicket,
  ITicket,
  IFlyToState,
  IActionState,
  IMapSizeState,
  IWheelchairsState,
} from "../../types";
import type { IMapItemIdentifies, IMapProps } from "@onlocation/tps-map";
import MapSize from "./components/MapSize";
import Section from "./components/Section";

interface IProps {
  tickets: ITicket[];
  actionState: IActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
  setToken: (token: string | null) => void;
  setLabelingByData: (value: boolean) => void;
  labelingByData: boolean;
  layoutId: string;
  onLayoutIdChange: (id: string) => void;
  onAddTicket: (newTicket: NewTicket) => void;
  wheelchairs: IWheelchairsState;
  setWheelchairs: (update: Partial<IWheelchairsState>) => void;
  defaultItemStyles: IMapProps["defaultItemStyles"];
  onActiveStylesChange: (
    update: Partial<Required<IMapProps>["defaultItemStyles"]>
  ) => void;
  mapSize: IMapSizeState;
  onSizeChange: (update: Partial<IMapSizeState>) => void;
  flyToOptions: IFlyToState;
  onFlyToChange: (update: Partial<IFlyToState>) => void;
}

const Sidebar = ({
  tickets,
  onHover,
  onClick,
  onDeleteTicket,
  setToken,
  actionState,
  layoutId,
  onLayoutIdChange,
  onAddTicket,
  setLabelingByData,
  labelingByData,
  wheelchairs,
  setWheelchairs,
  defaultItemStyles,
  onActiveStylesChange,
  mapSize,
  onSizeChange,
  flyToOptions,
  onFlyToChange,
}: IProps) => {
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        fontSize: "12px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Section
        style={{
          backgroundColor: "#c5c5c5",
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        This Side Pane is not part of the Widget.
      </Section>
      <TokenFilter onTokenChange={setToken} />
      <LayoutFilter layoutId={layoutId} onChange={onLayoutIdChange} />
      <NewTicketForm onAddTicket={onAddTicket} />
      <Tickets
        tickets={tickets}
        actionState={actionState}
        onHover={onHover}
        onClick={onClick}
        onDeleteTicket={onDeleteTicket}
      />
      {/* <Status actionState={actionState} /> */}
      <MapSize mapSize={mapSize} onSizeChange={onSizeChange} />
      <DefaultItemStyles
        styles={defaultItemStyles}
        onActiveStylesChange={onActiveStylesChange}
      />
      <FlyToOptions flyToOptions={flyToOptions} onChange={onFlyToChange} />
      <Wheelchairs setWheelchairs={setWheelchairs} value={wheelchairs} />
      <Labeling onLabelingChange={setLabelingByData} value={labelingByData} />
    </div>
  );
};

export default Sidebar;
