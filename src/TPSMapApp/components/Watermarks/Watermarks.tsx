import React from "react";

import StyledWatermarksContainer from "./StyledWatermarksContainer";

import { IWatermark } from "../../types";
import { WATERMARKS_MAP_BY_STRING_ID } from "../../constants";

interface IProps {
  selectedId: IWatermark["id"] | undefined;
  watermarks: IWatermark[];
  onSelect: (stringId: IWatermark | undefined) => void;
}

const Watermarks = ({ selectedId, watermarks, onSelect }: IProps) => {
  return (
    <StyledWatermarksContainer>
      <select
        id="watermark-select"
        value={typeof selectedId === undefined ? "none" : `${selectedId}`}
        onChange={({ target: { value } }) => {
          const watermark =
            value === "none"
              ? undefined
              : WATERMARKS_MAP_BY_STRING_ID.get(value);
          onSelect(watermark);
        }}
      >
        <option value={"none"}>None</option>
        {watermarks
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item) => (
            <option key={`${item.id}`} value={item.id}>
              {item.watermarkName}
            </option>
          ))}
      </select>
    </StyledWatermarksContainer>
  );
};

export default Watermarks;
