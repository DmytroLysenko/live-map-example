import React, { useMemo } from "react";

import StyledContainer from "./StyledContainer";
import { Flex, Typography } from "antd";

import { getStringPrice } from "../../utils";

import { ITicket, IWatermark } from "../../types";

interface IProps {
  sectionName: string;
  tickets?: ITicket[];
}

const SectionTooltip = ({ sectionName, tickets }: IProps) => {
  const { minPrice, maxPrice, watermarks } = useMemo(() => {
    const result: {
      minPrice?: number;
      maxPrice?: number;
      watermarks: IWatermark[];
    } = {
      minPrice: undefined,
      maxPrice: undefined,
      watermarks: [],
    };
    if (!tickets?.length) return result;
    tickets.forEach((ticket) => {
      const { minPrice, maxPrice } = result;
      if (typeof minPrice === "undefined" || ticket.price < minPrice) {
        result.minPrice = ticket.price;
      }
      if (typeof maxPrice === "undefined" || ticket.price > maxPrice) {
        result.maxPrice = ticket.price;
      }
      if (ticket.watermarks) {
        ticket.watermarks.forEach((w) => {
          if (!result.watermarks.some((item) => item.id === w.id)) {
            result.watermarks.push(w);
          }
        });
      }
    });
    return result;
  }, [tickets]);
  return (
    <StyledContainer>
      <div className="body">
        <div className="row">
          <div className="column">
            Sec: <strong>{sectionName}</strong>
          </div>
        </div>
        <div className="row">
          <div className="column divider">
            Qty: <strong>{tickets?.length}</strong>
          </div>
          <div className="column">
            from:{" "}
            <strong>
              {`${typeof minPrice !== "undefined" ? getStringPrice(minPrice) : "*"}`}
            </strong>
          </div>
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

export default SectionTooltip;
