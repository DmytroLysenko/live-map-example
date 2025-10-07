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
      }}
    >
      {label}
    </div>
  );
};

export default Label;
