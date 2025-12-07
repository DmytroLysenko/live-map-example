import { useEffect } from "react";
import { IActionState, IMapSettings, ITicket } from "../types";
import { ITicketSectionData } from "./useSections";

export const useSelectEffect = (
  level: IMapSettings["level"],
  selected: IActionState["selected"],
  onSetSelected: (selected: IActionState["selected"]) => void,
  sections: Map<ITicket["section"], ITicketSectionData>,
  isSelectMode: boolean
) => {
  useEffect(() => {
    setTimeout(() => {
      if (!isSelectMode) return;
      switch (level) {
        case "row": {
          onSetSelected(
            selected.reduce(
              (result, item) => {
                if (!item.sectionName) return result;
                if (item.rowName) {
                  result.push(item);
                } else {
                  const { rowNames = [] } =
                    sections.get(item.sectionName) || {};
                  rowNames.forEach((rowName) => {
                    result.push({ sectionName: item.sectionName, rowName });
                  });
                }
                return result;
              },
              [] as IActionState["selected"]
            )
          );
          break;
        }
        case "section": {
          onSetSelected(
            selected.reduce(
              (result, item) => {
                const isSectionExists = result.some(
                  (i) => i.sectionName === item.sectionName
                );
                if (isSectionExists) {
                  return result;
                } else {
                  result.push({
                    ...item,
                    rowName: undefined,
                    rowId: undefined,
                    rowAliases: undefined,
                  });
                  return result;
                }
              },
              [] as IActionState["selected"]
            )
          );
          break;
        }
      }
    }, 100);
  }, [level, isSelectMode]);
};
