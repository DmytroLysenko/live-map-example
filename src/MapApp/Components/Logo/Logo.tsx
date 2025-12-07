import React from "react";
import { Flex, Typography } from "antd";
import { OLLogoIcon } from "../Icons";
import StyledContainer from "./StyledContainer";

interface IProps {
  iconColor: string;
}

const Logo = ({ iconColor }: IProps) => {
  return (
    <StyledContainer>
      <OLLogoIcon style={{ color: iconColor }} />
      <Typography.Text
        style={{ color: "white", margin: 0, fontSize: "inherit" }}
      >
        ON LOCATION
      </Typography.Text>
    </StyledContainer>
  );
};

export default Logo;
