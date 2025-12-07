import { IMapItem } from "@onlocation/tps-map";
import { ItemAction, ITicket, IWatermark } from "./types";

export const getStringPrice = (price: number, minimumFractionDigits?: number) =>
  `$${price.toLocaleString("en-US", { minimumFractionDigits: minimumFractionDigits || 0 })}`;

export const isTicketSelected = (selected: ItemAction[], ticket: ITicket) => {
  return selected.some((item) => {
    if (item.sectionName !== ticket.section) {
      return false;
    }
    if (item.rowName && item.rowName !== ticket.row) {
      return false;
    }
    return true;
  });
};

export const getWatermarkByOrder = (list?: IWatermark[]) => {
  if (!list?.length) return undefined;
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder)[0];
};

export const getWatermarkByOrderAndSelected = (
  watermarks: IWatermark[],
  selectedWatermarks: IWatermark[]
) => {
  if (!watermarks?.length) {
    return undefined;
  }
  if (!selectedWatermarks.length) {
    return getWatermarkByOrder(watermarks);
  } else {
    const selectedWatermarkIds = selectedWatermarks.map((item) => item.id);
    const filteredWatermarks = watermarks.filter((item) =>
      selectedWatermarkIds.includes(item.id)
    );
    if (!filteredWatermarks.length) {
      return getWatermarkByOrder(watermarks);
    } else {
      return getWatermarkByOrder(filteredWatermarks);
    }
  }
};

interface IGetStylesProps {
  fillColor: string | undefined;
  isSelectMode: boolean;
}

export const getStylesProps = ({
  fillColor = "#FEC787",
  isSelectMode,
}: IGetStylesProps): Pick<
  IMapItem,
  "activeStyles" | "inactiveStyles" | "noninteractive"
> => {
  return {
    activeStyles: {
      fillColor,
      fillOpacity: 1,
    },
    inactiveStyles: {
      fillColor,
      fillOpacity: isSelectMode ? 0.5 : 1,
    },
    noninteractive: {
      fillColor,
      fillOpacity: 0.3,
    },
  };
};

export const isItemIncludesItem = (item?: ItemAction, target?: ItemAction) => {
  if (
    !item?.sectionName ||
    !target?.sectionName ||
    item.sectionName !== target.sectionName
  )
    return false;
  if (item.rowName) {
    return item.rowName === target.rowName;
  } else {
    return true;
  }
};

export const isItemActionsIncludes = (
  list: ItemAction[],
  target: ItemAction,
  targetIsSection: boolean
) =>
  list.some((item) =>
    targetIsSection
      ? isItemIncludesItem(target, item)
      : isItemIncludesItem(item, target)
  );

const ROW_KEY_SEPARATOR = "_";
export const getRowKey = (ticket: ITicket) =>
  `${ticket.section}${ROW_KEY_SEPARATOR}${ticket.row}`;
export const getSectionAndRowByRowKey = (rowKey: string) => {
  const [sectionName, rowName] = rowKey.split(ROW_KEY_SEPARATOR);
  if (sectionName && rowName) {
    return { sectionName, rowName };
  } else {
    return undefined;
  }
};

export const isWatermarkIncludes = (
  watermarks: IWatermark[],
  watermark: IWatermark
) => watermarks.some((item) => item.id === watermark.id);
