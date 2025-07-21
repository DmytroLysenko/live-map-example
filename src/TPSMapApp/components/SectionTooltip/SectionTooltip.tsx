import React from "react";
import StyledTooltipContainer from "../StyledTooltipContainer";

interface IProps {
  color: string;
  name: string;
}

const SectionTooltip = ({ color, name }: IProps) => {
  return (
    <StyledTooltipContainer>
      <div className="color" style={{ backgroundColor: color }}></div>
      <div>
        <div>Section: {name}</div>
      </div>
    </StyledTooltipContainer>
  );
};

export default SectionTooltip;
