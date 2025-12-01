import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "./constants";

const StyledContent = styled.div`
  height: 100%;
  width: 100%;

  .map-container {
    height: 100%;
    @media only screen and (max-width: ${VIEWPORT_BREAK_POINT - 1}px) {
      height: 60%;
    }
  }
  .content-container {
    height: 40%;
    @media only screen and (min-width: ${VIEWPORT_BREAK_POINT}px) {
      display: none;
    }
  }
`;

export default StyledContent;
