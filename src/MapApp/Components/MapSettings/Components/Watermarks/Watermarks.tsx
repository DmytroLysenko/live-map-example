import React from "react";

import { Divider, Flex } from "antd";
import Section from "../Section";
import Label from "../Label";
import WatermarkItem from "./Components/WatermarkItem";

import { IWatermark, NewWatermark, WatermarkUpdate } from "../../../../types";

interface IProps {
  watermarks: IWatermark[];
  onWatermarkUpdate: (update: WatermarkUpdate) => void;
  onWatermarkDelete: (watermarkId: IWatermark["id"]) => void;
  onWatermarkAdd: (watermark: NewWatermark) => void;
}

const Watermarks = ({
  watermarks,
  onWatermarkUpdate,
  onWatermarkDelete,
  onWatermarkAdd,
}: IProps) => {
  return (
    <Section name="Packages">
      <Label label="Packages" />
      <Flex vertical gap={4}>
        <Flex gap={4} style={{ margin: "4px 0" }}>
          <strong style={{ width: "15%" }}>Color</strong>
          <Divider type="vertical" style={{ margin: 2 }} />
          <strong style={{ width: "50%" }}>Name</strong>
          <Divider type="vertical" style={{ margin: 2 }} />
          <strong style={{ width: "30%" }}>Order</strong>
          <Divider type="vertical" style={{ margin: 2 }} />
          <strong style={{ width: "10%" }} />
        </Flex>
        {watermarks.length > 0 && (
          <>
            {watermarks
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((w) => (
                <WatermarkItem
                  key={w.id}
                  watermark={w}
                  onUpdate={onWatermarkUpdate}
                  onDelete={onWatermarkDelete}
                />
              ))}
          </>
        )}
        <strong style={{ fontSize: "14px" }}>New Package</strong>
        <WatermarkItem
          watermark={{
            color: "#212121",
            watermarkName: "",
            sortOrder: 1,
          }}
          onAdd={onWatermarkAdd}
        />
      </Flex>
    </Section>
  );
};

export default Watermarks;
