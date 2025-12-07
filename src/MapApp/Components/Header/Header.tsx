import React from "react";

import Logo from "../Logo";
import StyledContainer from "./StyledContainer";
import MenuButton from "./components/MenuButton";
import NavMenu from "./components/NavMenu";

interface IProps {
  collapsed: boolean;
  onCollapse: (collapse: boolean) => void;
}

const Header = ({ collapsed, onCollapse }: IProps) => {
  return (
    <StyledContainer>
      <Logo iconColor="#CCA669" />
      <NavMenu />
      <MenuButton collapsed={collapsed} onCollapse={onCollapse} />
    </StyledContainer>
  );
};

export default Header;
