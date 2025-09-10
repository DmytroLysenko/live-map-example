import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  & label {
    display: flex;
    gap: 6px;
    width: 100%;
    align-items: center;
  }
`;

export default StyledContainer;
