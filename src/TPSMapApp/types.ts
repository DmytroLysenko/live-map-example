import { IMapItemIdentifies } from "@onlocation/tps-map";

interface IFlyToItemState {
  value: boolean;
  fitToCenter: boolean;
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
  selectedWatermark: IWatermark | undefined;
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
  BurlyWood = "#DEB887",
  Chartreuse = "#7FFF00",
  DarkOrange = "#FF8C00",
}
