import React, { useState } from "react";

import { Layout } from "antd";
import {
  StyledLayout,
  StyledLeftSidebar,
  StyledRightSidebar,
} from "./StyledLayout";
import Header from "../Header";

interface IProps {
  children?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

const AppLayout = ({ children, leftSidebar, rightSidebar }: IProps) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <StyledLayout style={{ height: "100vh", overflow: "hidden" }}>
      <StyledLayout.Header style={{ padding: 0 }}>
        <Header
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        />
      </StyledLayout.Header>
      <Layout>
        {leftSidebar && (
          <StyledLeftSidebar width={"350px"} theme="light">
            {leftSidebar}
          </StyledLeftSidebar>
        )}
        <Layout.Content style={{ height: "100%", overflow: "hidden" }}>
          {children}
        </Layout.Content>
        {rightSidebar && (
          <StyledRightSidebar
            collapsible
            collapsedWidth={0}
            width={"300px"}
            hidden={collapsed}
            collapsed={collapsed}
            theme="light"
          >
            {rightSidebar}
          </StyledRightSidebar>
        )}
      </Layout>
    </StyledLayout>
  );
};

export default AppLayout;
