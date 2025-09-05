import React from "react";
import Label from "../Label";
import Section from "../Section";

interface IProps {
  value: boolean;
  onLabelingChange: (value: boolean) => void;
}

const Labeling = ({ onLabelingChange, value }: IProps) => {
  return (
    <Section>
      <Label label="Labeling by data" />
      <input
        type="checkbox"
        checked={value}
        onChange={({ target: { checked } }) => onLabelingChange(checked)}
      />
    </Section>
  );
};

export default Labeling;
