import React, { SyntheticEvent, useEffect, useState } from "react";

import StyledWatermarksContainer from "./StyledWatermarksContainer";

import { getTicketState } from "./utils";

import { ITicket, IWatermark } from "../../types/ticket";

interface IProps {
  tickets: ITicket[];
  onSelect: (watermark: IWatermark) => void;
}

const Watermarks = ({ tickets, onSelect }: IProps) => {
  const [{ watermarks }, setState] = useState(getTicketState(tickets));

  const disableClickPropagation = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleWatermarkClick = (e: SyntheticEvent, watermark: IWatermark) => {
    disableClickPropagation(e);
    onSelect(watermark);
  };

  useEffect(() => {
    setState(getTicketState(tickets));
  }, [tickets]);

  if (!watermarks.length) return <></>;
  return (
    <StyledWatermarksContainer>
      {watermarks.map((watermark) => (
        <button
          key={watermark.id}
          style={{
            backgroundColor: watermark.color,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          onDoubleClick={disableClickPropagation}
          onDoubleClickCapture={disableClickPropagation}
          onClick={(e) => handleWatermarkClick(e, watermark)}
        >
          {watermark.watermarkName} ({watermark.sortOrder})
        </button>
      ))}
    </StyledWatermarksContainer>
  );
};

export default Watermarks;
