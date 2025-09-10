import React, { useState } from "react";
import Label from "../Label";

interface IProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  name?: string;
}
const Section = ({ children, style = {}, name }: IProps) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      style={{
        padding: "8px",
        borderBottom: "1px solid lightgray",
        borderRight: "1px solid lightgray",
        ...style,
      }}
    >
      {!name && children}
      {name && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: collapsed ? "center" : "flex-start",
          }}
        >
          {!collapsed ? (
            <div style={{ flex: "auto" }}>{children}</div>
          ) : (
            <Label label={name} />
          )}
          <div
            style={{
              width: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              cursor: "pointer",
            }}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <i className="material-icons">
              {collapsed ? "keyboard_arrow_down" : "keyboard_arrow_up"}
            </i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
