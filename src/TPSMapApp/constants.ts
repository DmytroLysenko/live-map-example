import { IMapProps } from "@onlocation/tps-map";
import {
  IFlyToState,
  IActionState,
  IMapSizeState,
  ITicket,
  IWatermark,
  WatermarkColors,
} from "./types";

export const WATERMARKS: IWatermark[] = Object.entries(WatermarkColors).map(
  ([key, value], idx) => {
    return {
      id: idx + 1,
      sortOrder: idx + 1,
      watermarkName: key,
      color: value,
    };
  }
);

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
    watermarks: WATERMARKS.length ? [WATERMARKS[0]] : undefined,
  },
  {
    id: 2,
    section: "1",
    row: "F",
    price: 100,
    watermarks:
      WATERMARKS.length > 3
        ? [WATERMARKS[2], WATERMARKS[WATERMARKS.length - 1]]
        : undefined,
  },
  { id: 3, section: "10", row: "E", price: 100 },
  {
    id: 4,
    section: "11",
    row: "D",
    price: 120,
    watermarks:
      WATERMARKS.length > 2
        ? [WATERMARKS[0], WATERMARKS[WATERMARKS.length - 1]]
        : undefined,
  },
  {
    id: 5,
    section: "15",
    row: "R",
    price: 160,
    watermarks: WATERMARKS.length > 2 ? [WATERMARKS[1]] : undefined,
  },
  {
    id: 6,
    section: "16",
    row: "R",
    price: 160,
    watermarks: WATERMARKS.length > 2 ? [WATERMARKS[1]] : undefined,
  },
  {
    id: 7,
    section: "5",
    row: "R",
    price: 140,
  },
  {
    id: 8,
    section: "6",
    row: "R",
    price: 180,
  },
];

export const DEFAULT_ACTION_STATE: IActionState = {
  hover: undefined,
  focus: undefined,
  selected: [],
  selectedWatermark: undefined,
};

export const DEFAULT_FLY_TO_STATE: IFlyToState = {
  hover: { value: false, fitToCenter: false },
  focus: { value: true, fitToCenter: false },
  select: { value: false, fitToCenter: true },
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
