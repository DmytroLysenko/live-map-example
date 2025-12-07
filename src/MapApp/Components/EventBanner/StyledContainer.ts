import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "../../constants";

const MAIN_COLOR = "#b9a151";

const StyledContainer = styled.div`
  background-color: white;
  border-top: 2px solid ${MAIN_COLOR};
  border-bottom: 2px solid ${MAIN_COLOR};
  height: 30px;

  display: flex;
  align-items: center;

  .event-info {
    padding: 0 20px;
    width: 60%;

    @media only screen and (max-width: ${VIEWPORT_BREAK_POINT - 1}px) {
      width: 100%;
    }
  }
  .more-info {
    height: 100%;
    width: 40%;
    background-color: ${MAIN_COLOR};

    @media only screen and (max-width: ${VIEWPORT_BREAK_POINT - 1}px) {
      display: none;
    }
  }
`;

export default StyledContainer;
