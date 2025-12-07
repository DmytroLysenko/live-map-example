import React from "react";

import { Table } from "antd";
import { IActionState, ITicket } from "../../types";

import { useTicketColumns } from "./useTicketColumns";

import { IMapItemIdentifies } from "@onlocation/tps-map";
import TicketsMobileWrapper from "./TicketsStyledWrapper";

interface IProps {
  tickets: ITicket[];
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
  detailed: boolean;
  onResetSelection: () => void;
  isSelected: boolean;
}

const TicketsTable = ({
  tickets,
  onClick,
  onHover,
  onDeleteTicket,
  detailed,
  onResetSelection,
  isSelected,
}: IProps) => {
  const columns = useTicketColumns({
    onDeleteTicket,
    detailed,
    onResetSelection,
    isSelected,
  });

  return (
    <TicketsMobileWrapper>
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={tickets}
        pagination={false}
        scroll={detailed ? undefined : { y: 38 * 7 }}
        showSorterTooltip={false}
        onRow={(ticket) => {
          return {
            onClick: () => {
              onClick({ sectionName: ticket.section, rowName: ticket.row });
            },
            onMouseEnter: () => {
              onHover({ sectionName: ticket.section, rowName: ticket.row });
            },
            onMouseLeave: () => {
              onHover(undefined);
            },
          };
        }}
      />
    </TicketsMobileWrapper>
  );
};

export default TicketsTable;
