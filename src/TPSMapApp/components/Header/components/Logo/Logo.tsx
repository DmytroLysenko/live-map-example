import React from "react";

import StyledContainer from "./StyledContainer";
import { Divider } from "antd";
import { OLLogoIcon, TIPLogoIcon } from "../../../Icons";

const Logo = () => {
  return (
    <StyledContainer>
      <TIPLogoIcon />
      <Divider
        type="vertical"
        style={{ backgroundColor: "#FFFFFF80", height: "32px", margin: 0 }}
      />
      <OLLogoIcon />
    </StyledContainer>
  );
};

export default Logo;
