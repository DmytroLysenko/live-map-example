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
    <Section style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Flex align="center" gap={10}>
        <input
          type="checkbox"
          checked={value.show}
          onChange={({ target: { checked } }) =>
            setWheelchairs({ show: checked })
          }
        />
        <Label label="Wheelchairs" />
      </Flex>
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
