import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "../../constants";

const StyledContainer = styled.div`
  & > div {
    margin-left: 22px;
    margin-bottom: 22px;
  }
  & > div.tags-view {
    @media only screen and (max-width: ${VIEWPORT_BREAK_POINT - 1}px) {
      display: none;
    }
    display: flex;
    flex-direction: column;
    gap: 4px;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:nth-of-type(1) {
        font-size: 14px;
        font-weight: bold;
      }
      &:nth-last-of-type(1) {
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
      }
    }
  }
  & > div.select-view {
    display: flex;
    align-items: center;
    gap: 10px;
    @media only screen and (min-width: ${VIEWPORT_BREAK_POINT}px) {
      display: none;
    }
  }
`;

export default StyledContainer;
