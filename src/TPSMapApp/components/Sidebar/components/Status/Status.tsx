import React from "react";

import Label from "../Label";
import Section from "../Section";

import { IActionState } from "../../../../types";

interface IProps {
  actionState: IActionState;
}

const Status = ({ actionState }: IProps) => {
  return (
    <Section>
      <Label label="Status" />
      <div>
        <strong>Hover:</strong>
        <div>Section: {`${actionState.hover?.sectionName}`}</div>
        <div>Row: {`${actionState.hover?.rowName}`}</div>
      </div>
      <div style={{ marginTop: "4px" }}>
        <strong>Focus:</strong>
        <div>Section: {`${actionState.focus?.sectionName}`}</div>
        <div>Row: {`${actionState.focus?.rowName}`}</div>
      </div>
    </Section>
  );
};

export default Status;
