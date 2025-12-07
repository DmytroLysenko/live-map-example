import { useMemo } from "react";
import { IFlyToState } from "../types";
import { IMapProps } from "@onlocation/tps-map";

export const useInnerFlyOn = (flyToState: IFlyToState) => {
  return useMemo(() => {
    const result: Required<IMapProps>["useFlyOn"] = [];
    if (flyToState.hover.value) {
      result.push({
        type: "hover",
        fitToCenter: flyToState.hover.fitToCenter,
        onlyExternal: flyToState.hover.onlyExternal,
        zoomLevel: flyToState.hover.zoomLevel,
      });
    }
    if (flyToState.focus.value) {
      result.push({
        type: "focus",
        fitToCenter: flyToState.focus.fitToCenter,
        onlyExternal: flyToState.focus.onlyExternal,
        zoomLevel: flyToState.focus.zoomLevel,
      });
    }
    if (flyToState.select.value) {
      result.push({
        type: "select",
        fitToCenter: flyToState.select.fitToCenter,
        onlyExternal: flyToState.select.onlyExternal,
        zoomLevel: flyToState.select.zoomLevel,
      });
    }
    return (result.length ? result : undefined) as any;
  }, [flyToState]);
};
