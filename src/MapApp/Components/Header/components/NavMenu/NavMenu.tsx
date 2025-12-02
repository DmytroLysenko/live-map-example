import React from "react";
import { Menu, type MenuProps } from "antd";
import StyledContainer from "./StyledContainer";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Olympic Games",
    key: "Olympic Games",
  },
  {
    label: "NFL",
    key: "NFL",
  },
  {
    label: "NCAA",
    key: "NCAA",
  },
  {
    label: "College Sports",
    key: "College Sports",
  },
  {
    label: "Golf",
    key: "Golf",
  },
  {
    label: "UFC",
    key: "UFC",
  },
  {
    label: "MLB",
    key: "MLB",
  },
];

const NavMenu = () => {
  return (
    <StyledContainer>
      <Menu
        theme="dark"
        style={{
          flex: "auto",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "inherit",
        }}
        selectable={false}
        mode="horizontal"
        items={items}
      />
    </StyledContainer>
  );
};

export default NavMenu;
