import { atom } from "jotai";
import { ILayoutState } from "./types";

const DEFAULT_LAYOUT_STATE: ILayoutState = {};

export const layoutState = atom(DEFAULT_LAYOUT_STATE);
