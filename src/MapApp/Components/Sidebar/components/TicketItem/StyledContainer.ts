import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid lightgray;
  padding: 4px;
  border-radius: 4px;
  & > div {
    flex: auto;
    flex-direction: column;
    gap: 2px;
    display: flex;
  }
`;

export default StyledContainer;
