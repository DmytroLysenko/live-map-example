import React from "react";

import Label from "../Label";
import Section from "../Section";
import { Flex } from "antd";

interface IProps {
  layoutId: string;
  onChange: (id: string) => void;
}
const LayoutFilter = ({ layoutId, onChange }: IProps) => {
  return (
    <Section>
      <Label label="Layout ID" />
      <Flex vertical gap={6} style={{ marginTop: "8px" }}>
        <select
          value={layoutId}
          onChange={({ target: { value } }) => onChange(value)}
        >
          <option value={1339713}>T-Mobile Arena (WWE)</option>
          <option value={543651}>MSG (NCAAB)</option>
          <option value={34301}>Levi's Stadium (Football)</option>
          <option value={554501}>Sofi (Football)</option>
          <option value={1503087}>Allegiant (Boxing)</option>
          <option value={594301}>Sphere (WOZ)</option>
          <option value={40151}>Metlife (NFL)</option>
          <option value={549301}>Crypto (NBA)</option>
          <option value={550651}>Wrigley Field (Baseball)</option>
          <option value={561451}>AT&T (NCAAF)</option>
          <option value={553151}>Mercedes-Benz (Concert)</option>
          <option value={593701}>Indianapolis Motor Speedway (Racing)</option>
        </select>
        <input
          style={{ marginTop: "6px" }}
          value={layoutId}
          onChange={({ target: { value } }) => onChange(value.trim())}
        />
      </Flex>
    </Section>
  );
};

export default LayoutFilter;
