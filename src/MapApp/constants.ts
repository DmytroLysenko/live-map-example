export const VIEWPORT_BREAK_POINT = 900;
export const MAP_SETTINGS_STORAGE_KEY = "mapSettings";

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
    "eyJhbGciOiJSUzI1NiJ9.eyJwYXJ0bmVySWQiOjM0LCJ0eXBlIjoicGFydG5lci1hcGkta2V5IiwicGFydG5lck5hbWUiOiJUUFNNYXBQYWNrYWdlIiwiaWF0IjoxNzY3NjkzNzY4LCJleHAiOjMzNDQ0OTM3Njh9.ji4dbYOVZZRAWGBj7-aHYEvxEIf7MZskTB9ka7pMvbTGWZqHNJj10fU4zJF5bkDd50rSOAQuZaIaMJ7Lw1WbgMqzqFLYPQ6aQVZhNp3DgiHdje_LiQWlDEdTkghI0nwSoJqMJQzJaNnkz3r4NjuCaLmOv4u0-SZ6pn8KGag3vUhxSnVx5bSE6MC9PIHxRI8a702ySPiiSNwRtzVaxGnHAU6ok8bAUNXIOOq83U3SKB1VnuouHUvuIefb3Z6mwCruqOpDoXIrDsfQX_9TUWz9xezs9uZtZqYkyfgN4m92Qs8CKMDCqAErqk_IfGoOwxHLl4Q3zdJRSyFcRQV9kr0wPA",
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
