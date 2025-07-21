import type { JSX } from "react";
import type { IMapItem as IVenueMapItem } from "@onlocation/venue-map";
import { IMapItemIdentifies } from "./common";

export interface IMapItem
  extends IMapItemIdentifies,
    Omit<IVenueMapItem, "id" | "multiPolygon"> {
  rowTooltip?: JSX.Element;
  sectionTooltip?: JSX.Element;
}
