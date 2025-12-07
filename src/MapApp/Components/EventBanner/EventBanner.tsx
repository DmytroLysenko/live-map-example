import React from "react";
import StyledContainer from "./StyledContainer";
import { Typography } from "antd";

const EventBanner = () => {
  return (
    <StyledContainer>
      <div className="event-info">
        <Typography.Text ellipsis>
          User Engagement Seatics Tickets | April 3, 2026 10:34 AM Mortgage
          Matchup Center - PHOENIX, AZ
        </Typography.Text>
      </div>
      <div className="more-info"></div>
    </StyledContainer>
  );
};

export default EventBanner;
