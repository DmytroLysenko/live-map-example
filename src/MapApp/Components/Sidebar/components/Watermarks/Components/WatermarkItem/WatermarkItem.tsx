import React, { useEffect, useState } from "react";
import {
  IWatermark,
  WatermarkUpdate,
  NewWatermark,
} from "../../../../../../types";
import StyledContainer from "./StyledContainer";
import { ColorPicker, Input, InputNumber } from "antd";

interface IProps {
  watermark: IWatermark | NewWatermark;
  onUpdate?: (update: WatermarkUpdate) => void;
  onDelete?: (watermarkId: IWatermark["id"]) => void;
  onAdd?: (watermark: NewWatermark) => void;
}

const WatermarkItem = ({ watermark, onDelete, onUpdate, onAdd }: IProps) => {
  const [data, setData] = useState(watermark);

  useEffect(() => {
    if ("id" in watermark) {
      setData(watermark);
    }
  }, [watermark]);

  return (
    <StyledContainer>
      <ColorPicker
        defaultValue={""}
        format="hex"
        value={data.color}
        onChange={(value) =>
          setData((prev) => ({ ...prev, color: `#${value.toHex()}` }))
        }
        style={{ width: "15%" }}
        styles={{
          popup: { zIndex: 2500 },
          popupOverlayInner: { zIndex: 2500 },
        }}
        onOpenChange={(open) => {
          if (
            !open &&
            "id" in watermark &&
            data.color &&
            typeof onUpdate === "function"
          ) {
            onUpdate({ id: watermark.id, color: data.color });
          }
        }}
      />
      <Input
        placeholder="Name"
        value={data.watermarkName}
        onChange={({ target: { value } }) =>
          setData((prev) => ({ ...prev, watermarkName: value }))
        }
        style={{ width: "50%" }}
        onBlur={() => {
          if (
            "id" in watermark &&
            data.watermarkName.trim() &&
            typeof onUpdate === "function"
          ) {
            onUpdate({ id: watermark.id, watermarkName: data.watermarkName });
          }
        }}
      />
      <InputNumber
        controls={false}
        min={1}
        value={data.sortOrder}
        style={{ width: "30%" }}
        onChange={(value) =>
          setData((prev) => ({ ...prev, sortOrder: value || 1 }))
        }
        onBlur={() => {
          if ("id" in watermark && typeof onUpdate === "function") {
            onUpdate({ id: watermark.id, sortOrder: data.sortOrder });
          }
        }}
      />
      <i
        className="material-icons"
        style={{
          cursor: "pointer",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "10%",
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if ("id" in data) {
            typeof onDelete === "function" && onDelete(data.id);
          } else if (
            typeof onAdd === "function" &&
            data.color &&
            data.sortOrder &&
            data.watermarkName.trim()
          ) {
            onAdd(data);
            setData(watermark);
          }
        }}
      >
        {"id" in data ? "delete_forever" : "add"}
      </i>
    </StyledContainer>
  );
};

export default WatermarkItem;
