import { getCurrentWatermark, getStringPrice } from "../../utils";
import { ITicket } from "../../types";
import { Flex, type TableColumnsType } from "antd";

export const useTicketColumns = ({
  onDeleteTicket,
}: {
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
}) => {
  const columns: TableColumnsType<ITicket> = [
    {
      width: 4,
      render: (_, ticket) => {
        const watermark = getCurrentWatermark(ticket.watermarks, []);
        return (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: watermark?.color || "lightgray",
            }}
          />
        );
      },
    },
    {
      title: "Section",
      dataIndex: "section",
      width: 35,
      sorter: (a, b) =>
        a.section.localeCompare(b.section, undefined, { numeric: true }),
    },
    {
      title: "Row",
      dataIndex: "row",
      width: 25,
      sorter: (a, b) =>
        a.row.localeCompare(b.row, undefined, { numeric: true }),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 30,
      sorter: (a, b) =>
        `${a.price}`.localeCompare(`${b.price}`, undefined, { numeric: true }),
      render: (price) => <strong>{getStringPrice(price)}</strong>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: 35,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      width: 10,
      align: "center",
      render: (_, ticket) => (
        <Flex align="center" justify="center">
          <i
            className="material-icons"
            style={{ cursor: "pointer", fontSize: "20px", color: "gray" }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDeleteTicket(ticket.id);
            }}
          >
            delete_forever
          </i>
        </Flex>
      ),
    },
  ];
  return columns;
};
