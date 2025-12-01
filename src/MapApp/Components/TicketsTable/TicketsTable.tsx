import React from "react";

import { Table } from "antd";
import { IActionState, ITicket } from "../../types";

import { useTicketColumns } from "./useTicketColumns";

import { IMapItemIdentifies } from "@onlocation/tps-map";
import TicketsMobileWrapper from "./TicketsStyledWrapper";

interface IProps {
  tickets: ITicket[];
  actionState: IActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
  detailed: boolean;
}

const TicketsTable = ({
  tickets,
  onClick,
  onHover,
  onDeleteTicket,
  detailed,
}: IProps) => {
  const columns = useTicketColumns({ onDeleteTicket });

  return (
    <TicketsMobileWrapper>
      <Table
        size="small"
        columns={columns}
        dataSource={tickets}
        pagination={false}
        scroll={detailed ? undefined : { y: 38 * 8 }}
        showSorterTooltip={false}
        onRow={(ticket) => {
          return {
            onClick: () => {
              onClick({ sectionName: ticket.section, rowName: ticket.row });
            },
            onMouseEnter: () => {
              onHover({ sectionName: ticket.section, rowName: ticket.row });
            },
          };
        }}
      />
    </TicketsMobileWrapper>
  );
};

export default TicketsTable;
