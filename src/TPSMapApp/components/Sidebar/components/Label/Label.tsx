import React from "react";

interface IProps {
  label: string;
}

const Label = ({ label }: IProps) => {
  return (
    <div style={{ fontSize: "14px", margin: "0 0 5px 0", fontWeight: "bold" }}>
      {label}
    </div>
  );
};

export default Label;
