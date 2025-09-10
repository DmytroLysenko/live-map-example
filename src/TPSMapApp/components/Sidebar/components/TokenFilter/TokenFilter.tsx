import React from "react";
import Label from "../Label";
import Section from "../Section";

interface IProps {
  onTokenChange: (token: string) => void;
}

const TokenFilter = ({ onTokenChange }: IProps) => {
  return (
    <Section style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <input
        type="password"
        onChange={({ target: { value } }) => onTokenChange(value.trim())}
      />
      <Label label="Token" />
    </Section>
  );
};

export default TokenFilter;
