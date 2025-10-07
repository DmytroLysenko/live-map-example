import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 22px;
  margin-bottom: 22px;
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
`;

export default StyledContainer;
