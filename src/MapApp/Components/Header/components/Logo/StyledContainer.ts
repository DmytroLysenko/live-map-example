import styled from "styled-components";

import { VIEWPORT_BRAKE_POINT } from "../../../../constants";

const StyledContainer = styled.div`
  height: 100%;
  gap: 10px;
  justify-content: center;
  display: flex;
  align-items: center;

  & svg {
    height: 20px;
    width: auto;

    @media only screen and (min-width: ${VIEWPORT_BRAKE_POINT}px) {
      height: 40px;
    }
  }
`;

export default StyledContainer;
