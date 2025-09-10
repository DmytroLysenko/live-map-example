import React from "react";
import Label from "../Label";
import Section from "../Section";

interface IProps {
  value: boolean;
  setWheelchairs: (value: boolean) => void;
}

const Wheelchairs = ({ setWheelchairs, value }: IProps) => {
  return (
    <Section style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <input
        type="checkbox"
        checked={value}
        onChange={({ target: { checked } }) => setWheelchairs(checked)}
      />
      <Label label="Wheelchairs" />
    </Section>
  );
};

export default Wheelchairs;
