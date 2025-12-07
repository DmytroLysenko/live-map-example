import React from "react";

import StyledContainer from "./StyledContainer";
import { Checkbox, Tag, Tooltip, Select, Flex } from "antd";
import { InfoIcon } from "../Icons";
import {
  BlueViolet,
  BurlyWood,
  Chartreuse,
  DarkOrange,
} from "./components/WatermarksInfo";

import { IWatermark } from "../../types";

interface IProps {
  watermarks: IWatermark[];
  selectedWatermarks: IWatermark[];
  onWatermarkChange: (watermarks: IWatermark[]) => void;
}

const WatermarkSelector = ({
  watermarks,
  selectedWatermarks,
  onWatermarkChange,
}: IProps) => {
  const getInfo = (watermark?: IWatermark) => {
    if (!watermark) {
      return (
        <Flex vertical style={{ color: "#212121" }}>
          {watermarks
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => (
              <span key={item.id}>
                {item.sortOrder} | <strong>{item.watermarkName}</strong>
              </span>
            ))}
        </Flex>
      );
    }
    if (watermark.id === 1) {
      return <BlueViolet watermark={watermark} />;
    }
    if (watermark.id === 2) {
      return <BurlyWood watermark={watermark} />;
    }
    if (watermark.id === 3) {
      return <Chartreuse watermark={watermark} />;
    }
    if (watermark.id === 4) {
      return <DarkOrange watermark={watermark} />;
    }
    return undefined;
  };

  return (
    <StyledContainer>
      <div className="tags-view">
        <div>
          <span>Packages</span>
        </div>
        <div className="tags">
          {watermarks.map((item) => (
            <Tag
              key={item.id}
              style={{
                color: "inherit",
                border: "1px solid #212121",
                borderRadius: "8px",
                lineHeight: "44px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                backgroundColor: item.color,
              }}
            >
              <Checkbox
                checked={selectedWatermarks.some((w) => w.id === item.id)}
                onChange={({ target: { checked } }) => {
                  if (!checked) {
                    onWatermarkChange(
                      selectedWatermarks.filter((w) => w.id !== item.id)
                    );
                  } else {
                    onWatermarkChange([...selectedWatermarks, item]);
                  }
                }}
              />
              {item.watermarkName}
              <Tooltip
                trigger={["hover", "click"]}
                color="white"
                styles={{
                  root: {
                    maxWidth: "400px",
                    zIndex: 2000,
                  },
                }}
                title={getInfo(item)}
              >
                <InfoIcon style={{ width: 14, height: 14 }} />
              </Tooltip>
            </Tag>
          ))}
        </div>
      </div>
      <div className="select-view">
        <Select
          placeholder="Packages"
          style={{ width: "200px" }}
          mode="multiple"
          maxTagCount={1}
          showSearch={false}
          value={selectedWatermarks.map((w) => w.id)}
          options={watermarks.map((watermark) => ({
            value: watermark.id,
            label: watermark.watermarkName,
            item: watermark,
          }))}
          onChange={(value) => {
            onWatermarkChange(
              watermarks.filter((w) => value.includes(w.id)) as IWatermark[]
            );
          }}
        />
        <Tooltip
          trigger={["click"]}
          color="white"
          styles={{
            root: {
              maxWidth: "400px",
              zIndex: 2000,
            },
          }}
          title={getInfo()}
        >
          <InfoIcon style={{ width: 20, height: 20 }} />
        </Tooltip>
      </div>
    </StyledContainer>
  );
};

export default WatermarkSelector;
