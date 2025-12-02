import React from "react";

import { Button } from "antd";
import { MenuIcon, MenuOpenIcon } from "../../../Icons";
import StyledContainer from "./StyledContainer";

interface IProps {
  collapsed: boolean;
  onCollapse: (collapse: boolean) => void;
}

const MenuButton = ({ collapsed, onCollapse }: IProps) => {
  return (
    <StyledContainer>
      <Button
        type="text"
        style={{ color: "white" }}
        onClick={() => onCollapse(!collapsed)}
        icon={
          <i
            className="material-icons"
            style={{ cursor: "pointer", fontSize: "20px", color: "red" }}
          >
            settings
          </i>
        }
      />
    </StyledContainer>
  );
};

export default MenuButton;
