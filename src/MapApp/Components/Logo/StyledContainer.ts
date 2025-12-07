import { Flex } from "antd";
import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "../../constants";

const StyledContainer = styled(Flex)`
  align-items: center;
  gap: 8px;

  font-size: 14px;

  & svg {
    height: 20px;
    width: auto;
  }
  @media only screen and (min-width: ${VIEWPORT_BREAK_POINT}px) {
    font-size: 18px;
    & svg {
      height: 30px;
    }
  }
`;

export default StyledContainer;
