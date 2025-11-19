import { IMapItemIdentifies } from "@onlocation/tps-map";

interface IFlyToItemState {
  value: boolean;
  fitToCenter: boolean;
  onlyExternal: boolean;
  zoomLevel?: number;
}
export interface IFlyToState {
  hover: IFlyToItemState;
  focus: IFlyToItemState;
  select: IFlyToItemState;
}

export interface IActionState {
  hover: ItemAction | undefined;
  focus: ItemAction | undefined;
  selected: ItemAction[];
  selectedWatermarks: IWatermark[];
}

export type ItemAction = IMapItemIdentifies & { id?: number };

export interface ITicket {
  sectionId?: number;
  rowId?: number;
  id: number;
  price: number;
  section: string;
  row: string;
  watermarks?: IWatermark[];
}

export interface IWatermark {
  color: string;
  id: number;
  watermarkName: string;
  sortOrder: number;
}

export type NewTicket = Pick<
  Required<ITicket>,
  "row" | "section" | "watermarks" | "price"
>;

export interface IMapSizeState {
  height?: number;
  width?: number;
}

export enum WatermarkColors {
  BlueViolet = "#8A2BE2",
  SkyBlue = "#87CEEB",
  Chartreuse = "#7FFF00",
  DarkOrange = "#FF8C00",
}

export interface IWheelchairsState {
  show: boolean;
  basedOnRows: boolean;
}
