import React, { useMemo } from "react";
import StyledTooltipContainer from "../StyledTooltipContainer";
import { ITicket, IWatermark } from "../../types";
import { getStringPrice } from "../../utils";

interface IProps {
  color: string;
  sectionName: string;
  tickets?: ITicket[];
}

const SectionTooltip = ({ color, sectionName, tickets }: IProps) => {
  const { minPrice, maxPrice } = useMemo(() => {
    const result: {
      minPrice?: number;
      maxPrice?: number;
    } = {
      minPrice: undefined,
      maxPrice: undefined,
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
    });
    return result;
  }, [tickets]);
  return (
    <StyledTooltipContainer>
      <div className="color" style={{ backgroundColor: color }} />
      <div>
        <div>
          Section:
          <strong> {sectionName}</strong>
        </div>
        <div>
          Price Range:
          <strong>
            {" "}
            {`${typeof minPrice !== "undefined" ? getStringPrice(minPrice) : "*"} - ${typeof maxPrice !== "undefined" ? getStringPrice(maxPrice) : "*"}`}
          </strong>
        </div>
      </div>
    </StyledTooltipContainer>
  );
};

export default SectionTooltip;
