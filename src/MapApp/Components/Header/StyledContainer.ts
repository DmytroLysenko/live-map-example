import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "../../constants";

const StyledContainer = styled.div`
  background-color: black;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  & > div.central {
    flex: auto;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 1;
    font-weight: bold;
    @media only screen and (min-width: ${VIEWPORT_BREAK_POINT}px) {
      font-size: 18px;
    }
  }
`;

export default StyledContainer;
