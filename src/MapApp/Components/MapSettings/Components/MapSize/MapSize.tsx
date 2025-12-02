import React from "react";

import Section from "../Section";
import Label from "../Label";
import { IMapSizeState } from "../../../../types";
import StyledContainer from "./StyledContainer";
import { Flex, InputNumber } from "antd";

interface IProps {
  mapSize: IMapSizeState;
  onSizeChange: (update: Partial<IMapSizeState>) => void;
}

const MapSize = ({ mapSize, onSizeChange }: IProps) => {
  return (
    <Section name="Map Size">
      <Flex vertical gap={6}>
        <Flex align="center" gap={8}>
          <Label label="Map Size" />
          {(mapSize.width || mapSize.height) && (
            <i
              className="material-icons"
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onSizeChange({ width: undefined, height: undefined });
              }}
            >
              refresh
            </i>
          )}
        </Flex>
        <StyledContainer>
          <Flex align="center" gap={6}>
            <InputNumber
              size="small"
              controls={false}
              type="number"
              min={200}
              step={1}
              value={mapSize?.width}
              onChange={(value) => onSizeChange({ width: value || undefined })}
            />
            <span>Width</span>
          </Flex>
          <Flex align="center" gap={6}>
            <InputNumber
              size="small"
              controls={false}
              type="number"
              min={200}
              step={1}
              value={mapSize?.height}
              onChange={(value) => onSizeChange({ height: value || undefined })}
            />
            <span>Height</span>
          </Flex>
        </StyledContainer>
      </Flex>
    </Section>
  );
};

export default MapSize;
