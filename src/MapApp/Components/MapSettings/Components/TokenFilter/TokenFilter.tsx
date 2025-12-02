import React from "react";
import Label from "../Label";
import Section from "../Section";
import { Flex } from "antd";

interface IProps {
  onTokenChange: (token: string) => void;
}

const TokenFilter = ({ onTokenChange }: IProps) => {
  return (
    <Section style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Flex vertical gap={6}>
        <Label label="Token" />
        <input
          type="password"
          onChange={({ target: { value } }) => onTokenChange(value.trim())}
        />
      </Flex>
    </Section>
  );
};

export default TokenFilter;
