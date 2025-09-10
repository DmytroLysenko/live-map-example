import React from "react";
import StyledTooltipContainer from "../StyledTooltipContainer";
import { ITicket } from "../../types";
import { getStringPrice } from "../../utils";

interface IProps {
  sectionName: string;
  price: number;
  rowName: string;
  watermarks?: ITicket["watermarks"];
}

const RowTooltip = ({ rowName, sectionName, watermarks, price }: IProps) => {
  return (
    <StyledTooltipContainer>
      <div>
        <div>
          Section:
          <strong> {sectionName}</strong>
        </div>
        <div>
          Row:
          <strong> {rowName}</strong>
        </div>
        <div>
          Price:
          <strong> {getStringPrice(price)}</strong>
        </div>
        {watermarks?.length && (
          <div>
            Watermarks:
            {watermarks.map((item) => (
              <div
                key={item.id}
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <div
                  className="color"
                  style={{ backgroundColor: item.color }}
                />
                {item.watermarkName}
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledTooltipContainer>
  );
};

export default RowTooltip;
