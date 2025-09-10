import React from "react";

import Section from "../Section";
import Label from "../Label";
import StyledContainer from "./StyledContainer";

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
      <Label label="Styles" />
      <StyledContainer>
        <div>
          <span>Non-interactive</span>
          <label>
            <input
              type="color"
              value={styles?.noninteractive?.fillColor}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  noninteractive: {
                    ...(styles?.noninteractive || {}),
                    fillColor: value,
                  },
                })
              }
            />
            Fill Color
          </label>
          <label>
            <input
              type="color"
              value={styles?.noninteractive?.color}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  noninteractive: {
                    ...(styles?.noninteractive || {}),
                    color: value,
                  },
                })
              }
            />
            Border Color
          </label>
          <label>
            <input
              type="number"
              value={styles?.noninteractive?.weight}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  noninteractive: {
                    ...(styles?.noninteractive || {}),
                    weight: value,
                  },
                })
              }
            />
            Border Weight
          </label>
        </div>
        <div>
          <span>Interactive (inactive)</span>
          <label>
            <input
              type="color"
              value={styles?.interactive?.inactive?.fillColor}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  interactive: {
                    ...styles?.interactive,
                    inactive: {
                      ...(styles?.interactive?.inactive || {}),
                      fillColor: value,
                    },
                  },
                })
              }
            />
            Fill Color
          </label>
          <label>
            <input
              type="color"
              value={styles?.interactive?.inactive?.color}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  interactive: {
                    ...styles?.interactive,
                    inactive: {
                      ...(styles?.interactive?.inactive || {}),
                      color: value,
                    },
                  },
                })
              }
            />
            Border Color
          </label>
          <label>
            <input
              type="number"
              value={styles?.interactive?.inactive?.weight}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  interactive: {
                    ...styles?.interactive,
                    inactive: {
                      ...(styles?.interactive?.inactive || {}),
                      weight: value,
                    },
                  },
                })
              }
            />
            Border Weight
          </label>
        </div>
        <div>
          <span>Interactive (active)</span>
          <label>
            <input
              type="color"
              value={styles?.interactive?.active?.fillColor}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  interactive: {
                    ...styles?.interactive,
                    active: {
                      ...(styles?.interactive?.active || {}),
                      fillColor: value,
                    },
                  },
                })
              }
            />
            Fill Color
          </label>
          <label>
            <input
              type="color"
              value={styles?.interactive?.active?.color}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  interactive: {
                    ...styles?.interactive,
                    active: {
                      ...(styles?.interactive?.active || {}),
                      color: value,
                    },
                  },
                })
              }
            />
            Border Color
          </label>
          <label>
            <input
              type="number"
              value={styles?.interactive?.active?.weight}
              onChange={({ target: { value } }) =>
                onActiveStylesChange({
                  interactive: {
                    ...styles?.interactive,
                    active: {
                      ...(styles?.interactive?.active || {}),
                      weight: value,
                    },
                  },
                })
              }
            />
            Border Weight
          </label>
        </div>
      </StyledContainer>
    </Section>
  );
};

export default DefaultItemStyles;
