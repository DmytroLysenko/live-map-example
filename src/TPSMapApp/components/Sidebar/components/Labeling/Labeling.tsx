import React from "react";
import Label from "../Label";
import Section from "../Section";

interface IProps {
  value: boolean;
  onLabelingChange: (value: boolean) => void;
}

const Labeling = ({ onLabelingChange, value }: IProps) => {
  return (
    <Section style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <input
        type="checkbox"
        checked={value}
        onChange={({ target: { checked } }) => onLabelingChange(checked)}
      />
      <Label label="Labeling by data" />
    </Section>
  );
};

export default Labeling;
