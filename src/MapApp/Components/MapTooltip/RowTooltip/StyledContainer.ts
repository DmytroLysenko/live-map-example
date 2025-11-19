import styled from "styled-components";

const StyledContainer = styled.div`
  overflow: hidden;
  width: 180px;
  .header {
    font-weight: bold;
    padding: 4px;
  }
  .row {
    padding: 4px;
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    border-bottom: 1px solid #c5c5c5;
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    & > .column {
      width: 50%;
      position: relative;
      overflow: hidden;
      &.divider {
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 70%;
          background-color: #c5c5c5;
          transform: translate(-0.5px, 15%);
        }
      }
    }
  }
`;

export default StyledContainer;
