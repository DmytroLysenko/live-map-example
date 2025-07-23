import React from "react";

interface IProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
const Section = ({ children, style = {} }: IProps) => {
  return (
    <div
      style={{
        padding: "8px",
        borderBottom: "1px solid lightgray",
        borderRight: "1px solid lightgray",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Section;
