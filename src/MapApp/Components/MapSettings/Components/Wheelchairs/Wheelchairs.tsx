import React from "react";
import Label from "../Label";
import Section from "../Section";
import { IWheelchairsState } from "../../../../types";
import { Flex } from "antd";

interface IProps {
  value: IWheelchairsState;
  setWheelchairs: (update: Partial<IWheelchairsState>) => void;
}

const Wheelchairs = ({ setWheelchairs, value }: IProps) => {
  return (
    <Section name="Wheelchairs">
      <Label label="Wheelchairs" />
      <Flex align="center" gap={10}>
        <input
          type="checkbox"
          checked={value.basedOnRows}
          onChange={({ target: { checked } }) =>
            setWheelchairs({ basedOnRows: checked })
          }
        />
        <Label label="Based on rows" />
      </Flex>
    </Section>
  );
};

export default Wheelchairs;
