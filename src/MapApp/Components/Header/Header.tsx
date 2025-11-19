import React from "react";

import Logo from "./components/Logo";
import StyledContainer from "./StyledContainer";
import MenuButton from "./components/MenuButton";

interface IProps {
  collapsed: boolean;
  onCollapse: (collapse: boolean) => void;
}

const Header = ({ collapsed, onCollapse }: IProps) => {
  return (
    <StyledContainer>
      <Logo />
      <div className="central" style={{ color: "white" }}>
        Interactive Venue Map Widget
      </div>
      <MenuButton collapsed={collapsed} onCollapse={onCollapse} />
    </StyledContainer>
  );
};

export default Header;
