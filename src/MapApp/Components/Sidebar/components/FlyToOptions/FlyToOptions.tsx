import React from "react";

import Section from "../Section";
import Label from "../Label";

import { IFlyToState } from "../../../../types";
import { Flex, InputNumber } from "antd";

interface IProps {
  flyToOptions: IFlyToState;
  onChange: (update: Partial<IFlyToState>) => void;
}

const FlyToOptions = ({ flyToOptions, onChange }: IProps) => {
  return (
    <Section name="Fly To Options">
      <Flex vertical gap={6}>
        <Label label="Fly To Options" />
        <Flex
          vertical
          gap={6}
          style={{
            borderRadius: "4px",
            border: "1px dashed lightgray",
            padding: "4px",
          }}
        >
          <strong>Hover</strong>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.hover.value}
              onChange={({ target: { checked } }) =>
                onChange({ hover: { ...flyToOptions.hover, value: checked } })
              }
            />
            Active
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.hover.fitToCenter}
              onChange={({ target: { checked } }) =>
                onChange({
                  hover: { ...flyToOptions.hover, fitToCenter: checked },
                })
              }
            />
            Fit to map center
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.hover.onlyExternal}
              onChange={({ target: { checked } }) =>
                onChange({
                  hover: { ...flyToOptions.hover, onlyExternal: checked },
                })
              }
            />
            Only External
          </label>
          <Flex align="center" gap={4}>
            <InputNumber
              style={{ width: "50px" }}
              size="small"
              controls={false}
              max={4}
              min={0}
              step={0.1}
              value={flyToOptions.hover.zoomLevel}
              onChange={(value) => {
                onChange({
                  hover: {
                    ...flyToOptions.hover,
                    zoomLevel: value || undefined,
                  },
                });
              }}
            />
            <span>Zoom Level</span>
          </Flex>
        </Flex>
        <Flex
          vertical
          gap={6}
          style={{
            borderRadius: "4px",
            border: "1px dashed lightgray",
            padding: "4px",
          }}
        >
          <strong>Focus</strong>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.focus.value}
              onChange={({ target: { checked } }) =>
                onChange({ focus: { ...flyToOptions.focus, value: checked } })
              }
            />
            Active
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.focus.fitToCenter}
              onChange={({ target: { checked } }) =>
                onChange({
                  focus: { ...flyToOptions.focus, fitToCenter: checked },
                })
              }
            />
            Fit to map center
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.focus.onlyExternal}
              onChange={({ target: { checked } }) =>
                onChange({
                  focus: { ...flyToOptions.focus, onlyExternal: checked },
                })
              }
            />
            Only External
          </label>
          <Flex align="center" gap={4}>
            <InputNumber
              style={{ width: "50px" }}
              size="small"
              controls={false}
              max={4}
              min={0}
              step={0.1}
              value={flyToOptions.focus.zoomLevel}
              onChange={(value) => {
                onChange({
                  focus: {
                    ...flyToOptions.focus,
                    zoomLevel: value || undefined,
                  },
                });
              }}
            />
            <span>Zoom Level</span>
          </Flex>
        </Flex>
        <Flex
          vertical
          gap={6}
          style={{
            borderRadius: "4px",
            border: "1px dashed lightgray",
            padding: "4px",
          }}
        >
          <strong>Select</strong>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.select.value}
              onChange={({ target: { checked } }) =>
                onChange({ select: { ...flyToOptions.select, value: checked } })
              }
            />
            Active
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.select.fitToCenter}
              onChange={({ target: { checked } }) =>
                onChange({
                  select: { ...flyToOptions.select, fitToCenter: checked },
                })
              }
            />
            Fit to map center
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={flyToOptions.select.onlyExternal}
              onChange={({ target: { checked } }) =>
                onChange({
                  select: { ...flyToOptions.select, onlyExternal: checked },
                })
              }
            />
            Only External
          </label>
          <Flex align="center" gap={4}>
            <InputNumber
              style={{ width: "50px" }}
              size="small"
              controls={false}
              max={4}
              min={0}
              step={0.1}
              value={flyToOptions.select.zoomLevel}
              onChange={(value) => {
                onChange({
                  select: {
                    ...flyToOptions.select,
                    zoomLevel: value || undefined,
                  },
                });
              }}
            />
            <span>Zoom Level</span>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
};

export default FlyToOptions;
