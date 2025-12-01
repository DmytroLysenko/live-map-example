import React from "react";

import StyledContainer from "./StyledSidebar";
import Section from "./Components/Section";
import TokenFilter from "./Components/TokenFilter";
import LayoutFilter from "./Components/LayoutFilter";
import NewTicketForm from "./Components/NewTicketForm";
import Watermarks from "./Components/Watermarks";
import MapSize from "./Components/MapSize";
import DefaultItemStyles from "./Components/DefaultItemStyles";
import FlyToOptions from "./Components/FlyToOptions";
import Wheelchairs from "./Components/Wheelchairs";
import Labeling from "./Components/Labeling";

import {
  IFlyToState,
  IMapSizeState,
  IWatermark,
  IWheelchairsState,
  NewTicket,
  NewWatermark,
  WatermarkUpdate,
} from "../../types";
import { IMapProps } from "@onlocation/tps-map";

interface IProps {
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
  watermarks: IWatermark[];
  onWatermarkUpdate: (update: WatermarkUpdate) => void;
  onWatermarkDelete: (watermarkId: IWatermark["id"]) => void;
  onWatermarkAdd: (watermark: NewWatermark) => void;
}

const MapSettings = ({
  setToken,
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
  watermarks,
  onWatermarkUpdate,
  onWatermarkDelete,
  onWatermarkAdd,
}: IProps) => {
  return (
    <StyledContainer>
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
      <NewTicketForm onAddTicket={onAddTicket} watermarks={watermarks} />
      <Watermarks
        watermarks={watermarks}
        onWatermarkUpdate={onWatermarkUpdate}
        onWatermarkDelete={onWatermarkDelete}
        onWatermarkAdd={onWatermarkAdd}
      />
      <MapSize mapSize={mapSize} onSizeChange={onSizeChange} />
      <DefaultItemStyles
        styles={defaultItemStyles}
        onActiveStylesChange={onActiveStylesChange}
      />
      <FlyToOptions flyToOptions={flyToOptions} onChange={onFlyToChange} />
      <Wheelchairs setWheelchairs={setWheelchairs} value={wheelchairs} />
      <Labeling onLabelingChange={setLabelingByData} value={labelingByData} />
    </StyledContainer>
  );
};

export default MapSettings;
