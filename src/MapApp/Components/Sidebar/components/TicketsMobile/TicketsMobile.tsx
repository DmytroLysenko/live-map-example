import React from "react";

import { Table } from "antd";
import { IActionState, ITicket } from "../../../../types";

import { useTicketColumns } from "./useTicketColumns";

import { IMapItemIdentifies } from "@onlocation/tps-map";
import TicketsMobileWrapper from "./TicketsStyledWrapper";

interface IProps {
  tickets: ITicket[];
  actionState: IActionState;
  onHover: (id: IMapItemIdentifies | undefined) => void;
  onClick: (id: IMapItemIdentifies) => void;
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
}

const TicketsMobile = ({
  tickets,
  onClick,
  onHover,
  onDeleteTicket,
}: IProps) => {
  const columns = useTicketColumns({ onDeleteTicket });

  return (
    <TicketsMobileWrapper>
      <Table
        size="small"
        columns={columns}
        dataSource={tickets}
        pagination={false}
        scroll={{ y: 55 * 5 }}
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

export default TicketsMobile;
