import styled from "styled-components";
import { VIEWPORT_BRAKE_POINT } from "./constants";

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;

  .map-container {
    height: 100%;
    @media only screen and (max-width: ${VIEWPORT_BRAKE_POINT - 1}px) {
      height: 60%;
    }
  }
  .content-container {
    height: 40%;
    overflow: auto;
    @media only screen and (min-width: ${VIEWPORT_BRAKE_POINT}px) {
      display: none;
    }
  }
`;

export default StyledContent;
