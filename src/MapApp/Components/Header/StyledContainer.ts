import styled from "styled-components";
import { VIEWPORT_BREAK_POINT } from "../../constants";

const StyledContainer = styled.div`
  flex: auto;
  margin: 10px 40px;
  background-color: rgba(38, 38, 38, 0.85);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  overflow: hidden;

  @media only screen and (max-width: ${VIEWPORT_BREAK_POINT - 1}px) {
    margin: 8px 10px;
  }
`;

export default StyledContainer;
