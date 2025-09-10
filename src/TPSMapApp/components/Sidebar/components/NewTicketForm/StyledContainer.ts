import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    & > label {
      display: flex;
      gap: 6px;
      width: 100%;
      align-items: center;
    }
  }
`;

export default StyledContainer;
