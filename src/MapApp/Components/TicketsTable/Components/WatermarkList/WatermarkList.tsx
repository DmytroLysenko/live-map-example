import React from "react";
import { IWatermark } from "../../../../types";
import { Flex } from "antd";

interface IProps {
  watermarks: IWatermark[] | undefined;
}

const WatermarkList = ({ watermarks }: IProps) => {
  if (!watermarks?.length) return null;
  return (
    <Flex vertical gap={4} style={{ color: "gray", fontSize: "10px" }}>
      {watermarks.map((w) => (
        <Flex key={w.id} align="center" gap={4}>
          <div
            style={{
              borderRadius: "50%",
              height: "10px",
              width: "10px",
              backgroundColor: w.color,
            }}
          />
          <span>{w.watermarkName}</span>
        </Flex>
      ))}
    </Flex>
  );
};

export default WatermarkList;
