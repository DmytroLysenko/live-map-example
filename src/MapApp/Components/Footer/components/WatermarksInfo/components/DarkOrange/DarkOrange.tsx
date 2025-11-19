import React from "react";
import { IWatermark } from "../../../../../../types";
import InfoHeader from "../InfoHeader";

interface IProps {
  watermark: IWatermark;
}

const DarkOrange = ({ watermark }: IProps) => {
  return (
    <div style={{ padding: "4px", color: "#212121" }}>
      <div
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}
      >
        <InfoHeader watermark={watermark} />
      </div>
      <div style={{ fontSize: "16px" }}>
        <div>
          Superior viewing experience with added comfort and convenience.
        </div>
        <div style={{ fontWeight: "bold", marginTop: "4px" }}>
          This includes:
        </div>
        <ul style={{ margin: 0, whiteSpace: "nowrap" }}>
          <li>Enhanced seating options</li>
          <li>Priority concession lines</li>
          <li>Weather protection coverage</li>
          <li>Dedicated customer service</li>
        </ul>
      </div>
    </div>
  );
};

export default DarkOrange;
