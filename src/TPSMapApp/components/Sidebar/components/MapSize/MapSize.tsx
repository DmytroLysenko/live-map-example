import React from "react";

import Section from "../Section";
import Label from "../Label";
import { IMapSizeState } from "../../../../types";
import StyledContainer from "./StyledContainer";

interface IProps {
  mapSize: IMapSizeState;
  onSizeChange: (update: Partial<IMapSizeState>) => void;
}

const MapSize = ({ mapSize, onSizeChange }: IProps) => {
  return (
    <Section name="Map Size">
      <Label label="Map Size" />
      <StyledContainer>
        <label>
          <input
            type="number"
            min={200}
            value={mapSize?.width}
            onChange={({ target: { value } }) =>
              onSizeChange({ width: +value })
            }
          />
          Width
        </label>
        <label>
          <input
            type="number"
            min={200}
            value={mapSize?.height}
            onChange={({ target: { value } }) =>
              onSizeChange({ height: +value })
            }
          />
          Height
        </label>
      </StyledContainer>
    </Section>
  );
};

export default MapSize;
