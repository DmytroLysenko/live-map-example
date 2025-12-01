import styled from "styled-components";

import { VIEWPORT_BREAK_POINT } from "../../../../constants";

const StyledContainer = styled.div`
  height: 100%;
  gap: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  min-width: 140px;

  font-size: 14px;

  @media only screen and (min-width: ${VIEWPORT_BREAK_POINT}px) {
    font-size: 20px;
  }

  & svg {
    height: 20px;
    width: auto;

    @media only screen and (min-width: ${VIEWPORT_BREAK_POINT}px) {
      height: 40px;
    }
  }
`;

export default StyledContainer;
