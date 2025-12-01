import React from "react";

interface IProps {
  label: string;
}

const Label = ({ label }: IProps) => {
  return (
    <div
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        lineHeight: 1.5,
      }}
    >
      {label}
    </div>
  );
};

export default Label;
