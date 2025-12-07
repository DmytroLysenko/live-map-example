import { useEffect } from "react";
import { IActionState } from "../types";

export const useFocusEffect = (
  focus: IActionState["focus"],
  resetFocus: () => void
) => {
  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        resetFocus();
      }, 0);
    }
  }, [focus]);
};
