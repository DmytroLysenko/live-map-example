import React from "react";
import { IWatermark } from "../../../../../../types";
import InfoHeader from "../InfoHeader";

interface IProps {
  watermark: IWatermark;
}

const BlueViolet = ({ watermark }: IProps) => {
  return (
    <div style={{ padding: "4px", color: "#212121" }}>
      <div
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}
      >
        <InfoHeader watermark={watermark} />
      </div>
      <div style={{ fontSize: "16px" }}>
        <div>
          Blue Violet is our most exclusive game day perk. This brings you
          closer to the action.
        </div>
        <div style={{ fontWeight: "bold", marginTop: "4px" }}>
          This includes:
        </div>
        <ul style={{ margin: 0, whiteSpace: "nowrap" }}>
          <li>Premium field-level seating</li>
          <li>Exclusive pre-game field access</li>
          <li>Meet & greet with players</li>
          <li>Premium catering and open bar</li>
          <li>VIP parking pass</li>
          <li>Commemorative gift package</li>
        </ul>
      </div>
    </div>
  );
};

export default BlueViolet;
