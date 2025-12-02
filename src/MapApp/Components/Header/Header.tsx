import React from "react";

import Logo from "./components/Logo";
import { Flex, Menu } from "antd";
import StyledContainer from "./StyledContainer";
import MenuButton from "./components/MenuButton";
import NavMenu from "./components/NavMenu";
import UnderHeader from "./components/UnderHeader";

interface IProps {
  collapsed: boolean;
  onCollapse: (collapse: boolean) => void;
}

const Header = ({ collapsed, onCollapse }: IProps) => {
  return (
    <StyledContainer>
      <Logo />
      <NavMenu />
      <MenuButton collapsed={collapsed} onCollapse={onCollapse} />
    </StyledContainer>
  );
};

export default Header;
