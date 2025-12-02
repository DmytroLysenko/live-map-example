import React from "react";

import Section from "../Section";
import Label from "../Label";
import StyledContainer from "./StyledContainer";
import { ColorPicker, Flex, InputNumber } from "antd";

import { IMapProps } from "@onlocation/tps-map";

interface IProps {
  styles: IMapProps["defaultItemStyles"];
  onActiveStylesChange: (
    update: Partial<Required<IMapProps>["defaultItemStyles"]>
  ) => void;
}

const DefaultItemStyles = ({ styles, onActiveStylesChange }: IProps) => {
  return (
    <Section name="Styles">
      <Flex vertical gap={6}>
        <Label label="Styles" />
        <StyledContainer>
          <div style={{ border: "1px dashed lightgray", padding: "2px" }}>
            <strong>Non-interactive</strong>
            <Flex align="center" gap={10}>
              <ColorPicker
                size="small"
                defaultValue={"#000000"}
                format="hex"
                value={styles?.noninteractive?.fillColor}
                onChange={(value) => {
                  onActiveStylesChange({
                    noninteractive: {
                      ...(styles?.noninteractive || {}),
                      fillColor: `#${value.toHex()}`,
                    },
                  });
                }}
                styles={{
                  popup: { zIndex: 2500 },
                }}
              />
              <span>Fill Color</span>
            </Flex>
            <Flex align="center" gap={10}>
              <ColorPicker
                size="small"
                defaultValue={"#000000"}
                format="hex"
                value={styles?.noninteractive?.color}
                onChange={(value) => {
                  onActiveStylesChange({
                    noninteractive: {
                      ...(styles?.noninteractive || {}),
                      color: `#${value.toHex()}`,
                    },
                  });
                }}
                styles={{
                  popup: { zIndex: 2500 },
                }}
              />
              <span>Border Color</span>
            </Flex>
            <Flex align="center" gap={10}>
              <InputNumber
                style={{ width: "50px" }}
                size="small"
                controls={false}
                value={styles?.noninteractive?.weight || null}
                onChange={(value) => {
                  onActiveStylesChange({
                    noninteractive: {
                      ...(styles?.noninteractive || {}),
                      weight: value,
                    },
                  });
                }}
              />
              <span>Border Weight</span>
            </Flex>
          </div>
          <div style={{ border: "1px dashed lightgray", padding: "2px" }}>
            <strong>Interactive (inactive)</strong>
            <Flex align="center" gap={10}>
              <ColorPicker
                size="small"
                defaultValue={"#000000"}
                format="hex"
                value={styles?.interactive?.inactive?.fillColor}
                onChange={(value) => {
                  onActiveStylesChange({
                    interactive: {
                      inactive: {
                        ...(styles?.interactive?.inactive || {}),
                        fillColor: `#${value.toHex()}`,
                      },
                    },
                  });
                }}
                styles={{
                  popup: { zIndex: 2500 },
                }}
              />
              <span>Fill Color</span>
            </Flex>
            <Flex align="center" gap={10}>
              <ColorPicker
                size="small"
                defaultValue={"#000000"}
                format="hex"
                value={styles?.interactive?.inactive?.color}
                onChange={(value) => {
                  onActiveStylesChange({
                    interactive: {
                      ...(styles?.interactive || {}),
                      inactive: {
                        ...(styles?.interactive?.inactive || {}),
                        color: `#${value.toHex()}`,
                      },
                    },
                  });
                }}
                styles={{
                  popup: { zIndex: 2500 },
                }}
              />
              <span>Border Color</span>
            </Flex>
            <Flex align="center" gap={10}>
              <InputNumber
                style={{ width: "50px" }}
                size="small"
                controls={false}
                value={styles?.interactive?.inactive?.weight || null}
                onChange={(value) => {
                  onActiveStylesChange({
                    interactive: {
                      ...(styles?.interactive || {}),
                      inactive: {
                        ...(styles?.interactive?.inactive || {}),
                        weight: value || undefined,
                      },
                    },
                  });
                }}
              />
              <span>Border Weight</span>
            </Flex>
          </div>
          <div style={{ border: "1px dashed lightgray", padding: "2px" }}>
            <strong>Interactive (active)</strong>
            <Flex align="center" gap={10}>
              <ColorPicker
                size="small"
                defaultValue={"#000000"}
                format="hex"
                value={styles?.interactive?.active?.fillColor}
                onChange={(value) => {
                  onActiveStylesChange({
                    interactive: {
                      ...(styles?.interactive || {}),
                      active: {
                        ...(styles?.interactive?.active || {}),
                        fillColor: `#${value.toHex()}`,
                      },
                    },
                  });
                }}
                styles={{
                  popup: { zIndex: 2500 },
                }}
              />
              <span>Fill Color</span>
            </Flex>
            <Flex align="center" gap={10}>
              <ColorPicker
                size="small"
                defaultValue={"#000000"}
                format="hex"
                value={styles?.interactive?.active?.color}
                onChange={(value) => {
                  onActiveStylesChange({
                    interactive: {
                      ...(styles?.interactive || {}),
                      active: {
                        ...(styles?.interactive?.active || {}),
                        color: `#${value.toHex()}`,
                      },
                    },
                  });
                }}
                styles={{
                  popup: { zIndex: 2500 },
                }}
              />
              <span>Border Color</span>
            </Flex>
            <Flex align="center" gap={10}>
              <InputNumber
                style={{ width: "50px" }}
                size="small"
                controls={false}
                value={styles?.interactive?.active?.weight || null}
                onChange={(value) => {
                  onActiveStylesChange({
                    interactive: {
                      ...(styles?.interactive || {}),
                      active: {
                        ...(styles?.interactive?.active || {}),
                        weight: value || undefined,
                      },
                    },
                  });
                }}
              />
              <span>Border Weight</span>
            </Flex>
          </div>
        </StyledContainer>
      </Flex>
    </Section>
  );
};

export default DefaultItemStyles;
