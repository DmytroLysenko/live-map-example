import styled from "styled-components";
import { VIEWPORT_BRAKE_POINT } from "../../../../constants";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${VIEWPORT_BRAKE_POINT}px) {
    display: none;
  }
`;

export default StyledContainer;
