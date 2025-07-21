import styled from "styled-components"

const StyledTooltipContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  min-width: 100px;

  .color {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }
`

export default StyledTooltipContainer
