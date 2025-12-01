import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "../../constants";

const StyledSidebar = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  overflow-y: auto;

  font-size: 12px;

  .tickets-section {
    @media only screen and (max-width: ${VIEWPORT_BREAK_POINT}px) {
      display: none !important;
    }
  }
`;

export default StyledSidebar;
