import React from "react";

import StyledContainer from "./StyledContainer";
import { OLLogoIcon } from "../../../Icons";
import { Typography } from "antd";

const Logo = () => {
  return (
    <StyledContainer>
      <OLLogoIcon />
      <Typography.Text
        style={{ color: "white", margin: 0, fontSize: "inherit" }}
      >
        ON LOCATION
      </Typography.Text>
    </StyledContainer>
  );
};

export default Logo;
