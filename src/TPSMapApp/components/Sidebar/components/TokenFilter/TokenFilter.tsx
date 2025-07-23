import React from "react";
import Label from "../Label";
import Section from "../Section";

interface IProps {
  onTokenChange: (token: string) => void;
}

const TokenFilter = ({ onTokenChange }: IProps) => {
  return (
    <Section>
      <Label label="Token" />
      <input
        type="password"
        onChange={({ target: { value } }) => onTokenChange(value.trim())}
      />
    </Section>
  );
};

export default TokenFilter;
