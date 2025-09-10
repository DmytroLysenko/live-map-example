import React from "react";

import Section from "../Section";
import Label from "../Label";
import StyledContainer from "./StyledContainer";

import { IFlyToState } from "../../../../types";

interface IProps {
  flyToOptions: IFlyToState;
  onChange: (update: Partial<IFlyToState>) => void;
}

const FlyToOptions = ({ flyToOptions, onChange }: IProps) => {
  return (
    <Section name="Fly To Options">
      <Label label="Fly To Options" />
      <StyledContainer>
        <div>
          <span>Hover</span>
          <label>
            <input
              type="checkbox"
              checked={flyToOptions.hover.value}
              onChange={({ target: { checked } }) =>
                onChange({ hover: { ...flyToOptions.hover, value: checked } })
              }
            />
            {flyToOptions.hover.value ? "ON" : "OFF"}
          </label>
          {flyToOptions.hover.value && (
            <label>
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
          )}
        </div>
        <div>
          <span>Focus</span>
          <label>
            <input
              type="checkbox"
              checked={flyToOptions.focus.value}
              onChange={({ target: { checked } }) =>
                onChange({ focus: { ...flyToOptions.focus, value: checked } })
              }
            />
            {flyToOptions.focus.value ? "ON" : "OFF"}
          </label>
          {flyToOptions.focus.value && (
            <label>
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
          )}
        </div>
        {/* <div>
          <span>Select</span>
          <label>
            <input
              type="checkbox"
              checked={flyToOptions.select.value}
              onChange={({ target: { checked } }) =>
                onChange({ select: { ...flyToOptions.select, value: checked } })
              }
            />
            {flyToOptions.select.value ? "ON" : "OFF"}
          </label>
        </div> */}
      </StyledContainer>
    </Section>
  );
};

export default FlyToOptions;
