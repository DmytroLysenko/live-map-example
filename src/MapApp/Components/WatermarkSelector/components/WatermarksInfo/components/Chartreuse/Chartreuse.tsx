import React from "react";
import { IWatermark } from "../../../../../../types";
import InfoHeader from "../InfoHeader";

interface IProps {
  watermark: IWatermark;
}

const Chartreuse = ({ watermark }: IProps) => {
  return (
    <div style={{ padding: "4px", color: "#212121" }}>
      <div
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}
      >
        <InfoHeader watermark={watermark} />
      </div>
      <div style={{ fontSize: "16px" }}>
        <div>
          Enhanced gameday experience with upgraded amenities and services.
        </div>
        <div style={{ fontWeight: "bold", marginTop: "4px" }}>
          This includes:
        </div>
        <ul style={{ margin: 0, whiteSpace: "nowrap" }}>
          <li>Premium seating with extra legroom</li>
          <li>In-seat food and beverage service</li>
          <li>Access to premium restrooms</li>
          <li>Expedited entry gates</li>
        </ul>
      </div>
    </div>
  );
};

export default Chartreuse;
