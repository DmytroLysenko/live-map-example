export const VIEWPORT_BRAKE_POINT = 900;

import { IMapProps } from "@onlocation/tps-map";
import {
  IFlyToState,
  IActionState,
  IMapSizeState,
  ITicket,
  IWatermark,
  WatermarkColors,
} from "./types";

const WATERMARK_1: IWatermark = {
  id: 1,
  sortOrder: 1,
  watermarkName: "BlueViolet",
  color: WatermarkColors.BlueViolet,
};
const WATERMARK_2: IWatermark = {
  id: 2,
  sortOrder: 2,
  watermarkName: "SkyBlue",
  color: WatermarkColors.SkyBlue,
};
const WATERMARK_3: IWatermark = {
  id: 3,
  sortOrder: 3,
  watermarkName: "Chartreuse",
  color: WatermarkColors.Chartreuse,
};
const WATERMARK_4: IWatermark = {
  id: 4,
  sortOrder: 4,
  watermarkName: "DarkOrange",
  color: WatermarkColors.DarkOrange,
};

export const WATERMARKS: IWatermark[] = [
  WATERMARK_1,
  WATERMARK_2,
  WATERMARK_3,
  WATERMARK_4,
];

export const WATERMARKS_MAP_BY_STRING_ID = WATERMARKS.reduce((result, item) => {
  result.set(`${item.id}`, item);
  return result;
}, new Map<string, IWatermark>());

export const DEFAULT_TICKETS: ITicket[] = [
  {
    id: 1,
    section: "1",
    row: "E",
    price: 80,
    watermarks: [WATERMARK_1],
  },
  { id: 3, section: "10", row: "E", price: 100 },
  {
    id: 4,
    section: "11",
    row: "D",
    price: 120,
  },
  {
    id: 5,
    section: "15",
    row: "R",
    price: 160,
    watermarks: [WATERMARK_2],
  },
  {
    id: 6,
    section: "16",
    row: "R",
    price: 160,
    watermarks: [WATERMARK_2],
  },
  {
    id: 7,
    section: "5",
    row: "R",
    price: 140,
    watermarks: [WATERMARK_4],
  },
  {
    id: 8,
    section: "6",
    row: "R",
    price: 180,
    watermarks: [WATERMARK_4],
  },
  {
    id: 9,
    section: "20",
    row: "R",
    price: 160,
    watermarks: [WATERMARK_3],
  },
];

export const DEFAULT_ACTION_STATE: IActionState = {
  hover: undefined,
  focus: undefined,
  selected: [],
  selectedWatermarks: [],
};

export const DEFAULT_FLY_TO_STATE: IFlyToState = {
  hover: {
    value: false,
    fitToCenter: false,
    onlyExternal: false,
    zoomLevel: 3,
  },
  focus: { value: true, fitToCenter: false, onlyExternal: false, zoomLevel: 4 },
  select: {
    value: false,
    fitToCenter: false,
    onlyExternal: false,
    zoomLevel: 1,
  },
};

export const DEFAULT_MAP_SIZE_STATE: IMapSizeState = {};
export const DEFAULT_ITEM_STYLES_STATE: IMapProps["defaultItemStyles"] = {
  interactive: {
    active: {
      fillColor: "#FEC787",
      fillOpacity: 1,
      color: "black",
      opacity: 1,
      weight: 2,
    },
    inactive: {
      fillColor: "#BFE5BB",
      fillOpacity: 1,
      color: "#C9C9C9",
      opacity: 1,
      weight: 1,
    },
  },
  noninteractive: {
    fillColor: "#E7E7E7",
    fillOpacity: 1,
    color: "#C9C9C9",
    opacity: 1,
    weight: 1,
  },
};

export const sections: any = [];

export const DEFAULT_COLOR = "#BFE5BB";
export const HEADER_HEIGHT = 50;
export const FOOTER_HEIGHT = 120;
export const SIDEBAR_WIDTH = 400;
