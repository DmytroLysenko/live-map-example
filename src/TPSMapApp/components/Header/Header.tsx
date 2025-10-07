import React from "react";
import Logo from "./components/Logo";
import StyledContainer from "./StyledContainer";

const Header = () => {
  return (
    <StyledContainer>
      <Logo />
      <div style={{ color: "white" }}>Interactive Venue Map Widget</div>
    </StyledContainer>
  );
};

export default Header;
