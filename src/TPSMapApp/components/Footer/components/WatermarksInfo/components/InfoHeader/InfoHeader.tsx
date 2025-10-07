import { Flex } from "antd";
import React from "react";
import { IWatermark } from "../../../../../../types";
interface IProps {
  watermark: IWatermark;
}

const InfoHeader = ({ watermark }: IProps) => {
  return (
    <Flex
      align="center"
      gap={10}
    >
      <div
        style={{
          height: "12px",
          width: "12px",
          borderRadius: "50%",
          backgroundColor: watermark.color,
        }}
      />
      <span>{watermark.watermarkName}</span>
    </Flex>
  );
};

export default InfoHeader;
