export const VIEWPORT_BREAK_POINT = 900;

import { IMapProps } from "@onlocation/tps-map";
import {
  IFlyToState,
  IActionState,
  IMapSizeState,
  ITicket,
  IWatermark,
  WatermarkColors,
  IMapSettings,
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

export const DEFAULT_TICKETS: ITicket[] = [
  {
    id: 1,
    section: "1",
    row: "E",
    price: 80,
    watermarks: [WATERMARK_1],
    quantity: 3,
  },
  { id: 3, section: "10", row: "E", price: 100, quantity: 3 },
  {
    id: 4,
    section: "11",
    row: "D",
    price: 120,
    quantity: 3,
  },
  {
    id: 5,
    section: "15",
    row: "R",
    price: 160,
    watermarks: [WATERMARK_2],
    quantity: 3,
  },
  {
    id: 6,
    section: "16",
    row: "R",
    price: 160,
    watermarks: [WATERMARK_2],
    quantity: 3,
  },
  {
    id: 7,
    section: "5",
    row: "R",
    price: 140,
    watermarks: [WATERMARK_4],
    quantity: 3,
  },
  {
    id: 8,
    section: "6",
    row: "R",
    price: 180,
    watermarks: [WATERMARK_4],
    quantity: 3,
  },
  {
    id: 9,
    section: "20",
    row: "R",
    price: 160,
    watermarks: [WATERMARK_3],
    quantity: 3,
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

export const DEFAULT_MAP_SETTINGS: IMapSettings = {
  token:
    "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJxY3VlLWF1dGhlbnRpY2F0aW9uIiwiYXVkIjoicWN1ZS1hdXRoZW50aWNhdGlvbiIsIm5iZiI6MTc0NzExMjQ5OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDg3IiwiYXV0aGVudGljYXRpb25JZCI6LTIsImV4cCI6NDg3MTI1MDc0NiwidXNlck5hbWUiOiJvbGUtbWFwLWNvbXBvbmVudCIsImlhdCI6MTc0NzExMjQ5OCwianRpIjoiOThjNWViOGMtZGExMS00YzM4LWE4MmMtYzE4MGUyMzgzNDU5In0.lwKhyOGTe7RUd6v9cYH97hLrco3jJJyLIrLrEfNiHmHrtfoDUU6mqhoIqDmG73rp368AWEDNkhlXQbqebsZnpaCgXfvsXDPeCQ1NtyBoWYJEap67zLBoTHRsTsgOVRfTGjOpLsx9pjG3hJ7WdnGfbVNyzcnDCyuDVesbK1CP058hZ_4poJ1GE-4JL-U0VGY-2qd5U3yYuwmsMJU8l2Yzcx9kuF8YZodpbAB9AvvwtWK-rap5N58Bze6AIFLp3rzvvW9YW20qYoiJBkE3YEB698W3HmhlJMM3ScKd9Lcoeoxb5b9c5eIDl5wdOOLJ7CDwsVme8Pf1DMgAAir7wMoDZA",
  tickets: DEFAULT_TICKETS,
  watermarks: WATERMARKS,
  layoutId: "1339713",
  wheelchairs: { show: true, basedOnRows: false },
  labelingByData: true,
  level: "section",
  defaultItemStyles: DEFAULT_ITEM_STYLES_STATE,
  mapSize: DEFAULT_MAP_SIZE_STATE,
  flyToState: DEFAULT_FLY_TO_STATE,
};
