import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: black;
  height: 100%;
  display: flex;
  align-items: center;
  & > div {
    &:nth-last-of-type(1) {
      flex: auto;
      text-align: center;
      color: white;
      font-size: 18px;
      line-height: 1;
      font-weight: bold;
    }
  }
`;

export default StyledContainer;
