import React, { useMemo } from "react";

import StyledContainer from "./StyledContainer";
import { Flex } from "antd";

import { getStringPrice } from "../../../utils";

import { ITicket, IWatermark } from "../../../types";

interface IProps {
  tickets: ITicket[];
}

const RowTooltip = ({ tickets }: IProps) => {
  const sectionName = tickets[0].section;
  const rowName = tickets[0].row;
  const minPrice = Math.min(...tickets.map((t) => t.price));
  const watermarks: IWatermark[] = tickets.reduce((result, ticket) => {
    if (!ticket.watermarks?.length) {
      return result;
    } else {
      ticket.watermarks.forEach((w) => {
        !result.some((item) => item.id === w.id) && result.push(w);
      });
    }
    return result;
  }, [] as IWatermark[]);

  return (
    <StyledContainer>
      <div className="body">
        <div className="row">
          <div className="column">
            Sec: <strong>{sectionName}</strong>
          </div>
          <div className="column">
            Row: <strong>{rowName}</strong>
          </div>
        </div>
        <div className="row">
          <div className="column">
            Price: <strong>{getStringPrice(minPrice)}</strong>
          </div>
          <div className="column"></div>
        </div>
        {!!watermarks.length && (
          <div className="row">
            <div>
              <strong>Hospitality Options:</strong>
              {watermarks.map((w) => (
                <Flex key={w.id} align="center" gap={4}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: w.color,
                    }}
                  />
                  {w.watermarkName}
                </Flex>
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledContainer>
  );
};

export default RowTooltip;
