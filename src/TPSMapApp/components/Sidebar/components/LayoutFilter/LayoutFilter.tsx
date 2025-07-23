import React from "react";

import Label from "../Label";
import Section from "../Section";

interface IProps {
  layoutId: string;
  onChange: (id: string) => void;
}
const LayoutFilter = ({ layoutId, onChange }: IProps) => {
  return (
    <Section>
      <Label label="Layout ID" />
      <input
        value={layoutId}
        onChange={({ target: { value } }) => onChange(value.trim())}
      />
    </Section>
  );
};

export default LayoutFilter;
