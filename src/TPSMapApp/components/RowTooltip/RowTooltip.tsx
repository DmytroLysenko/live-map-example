import React from "react"
import StyledTooltipContainer from "../StyledTooltipContainer"

interface IProps {
  color: string
  name: string
}

const RowTooltip = ({ color, name }: IProps) => {
  return (
    <StyledTooltipContainer>
      <div className="color" style={{ backgroundColor: color }}></div>
      <div>Row: {name}</div>
    </StyledTooltipContainer>
  )
}

export default RowTooltip
