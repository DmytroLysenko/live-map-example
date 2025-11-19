import { Layout } from "antd";
import styled from "styled-components";
import { VIEWPORT_BRAKE_POINT } from "../../constants";

const StyledLayout = styled(Layout)`
  color: #020202;
`;

const StyledLeftSidebar = styled(Layout.Sider)`
  border-right: 2px solid #c5c5c5;
  background-color: white;
  color: inherit;
  @media only screen and (max-width: ${VIEWPORT_BRAKE_POINT - 1}px) {
    display: none;
  }
`;

const StyledRightSidebar = styled(Layout.Sider)`
  border-left: 2px solid #c5c5c5;
  position: absolute;
  top: 64px;
  right: 0;
  z-index: 1200;
  height: calc(100% - 64px);
  width: 100%;
  overflow: hidden;
  background-color: white;
  color: inherit;
  @media only screen and (min-width: ${VIEWPORT_BRAKE_POINT}px) {
    display: none;
  }
`;

export { StyledLayout, StyledLeftSidebar, StyledRightSidebar };
