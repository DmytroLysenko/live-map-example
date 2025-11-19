import React from "react";
import { IWatermark } from "../../../../../../types";
import InfoHeader from "../InfoHeader";

interface IProps {
  watermark: IWatermark;
}

const BurlyWood = ({ watermark }: IProps) => {
  return (
    <div style={{ padding: "4px", color: "#212121" }}>
      <div
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}
      >
        <InfoHeader watermark={watermark} />
      </div>
      <div style={{ fontSize: "16px" }}>
        <div>
          Premium midfield experience with excellent viewing angles and
          exclusive amenities.
        </div>
        <div style={{ fontWeight: "bold", marginTop: "4px" }}>
          This includes:
        </div>
        <ul style={{ margin: 0, whiteSpace: "nowrap" }}>
          <li>Club-level seating</li>
          <li>Access to exclusive club lounge</li>
          <li>Premium food and beverage service</li>
          <li>Preferred parking</li>
          <li>Concierge services</li>
        </ul>
      </div>
    </div>
  );
};

export default BurlyWood;
