import React, { useMemo } from "react";

import StyledContainer from "./StyledContainer";
import { Flex } from "antd";

import { getStringPrice } from "../../../utils";

import { ITicket } from "../../../types";

interface IProps {
  ticket: ITicket;
}

const RowTooltip = ({ ticket }: IProps) => {
  return (
    <StyledContainer>
      <div className="body">
        <div className="row">
          <div className="column">
            Sec: <strong>{ticket.section}</strong>
          </div>
          <div className="column">
            Row: <strong>{ticket.row}</strong>
          </div>
        </div>
        <div className="row">
          <div className="column">
            Price: <strong>{getStringPrice(ticket.price)}</strong>
          </div>
          <div className="column"></div>
        </div>
        {!!ticket.watermarks?.length && (
          <div className="row">
            <div>
              <strong>Hospitality Options:</strong>
              {ticket.watermarks?.map((w) => (
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
