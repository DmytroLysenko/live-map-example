import { getWatermarkByOrder, getStringPrice } from "../../utils";
import { ITicket } from "../../types";
import { Flex, Tooltip, type TableColumnsType } from "antd";
import WatermarkList from "./Components/WatermarkList";

export const useTicketColumns = ({
  onDeleteTicket,
  detailed,
  onResetSelection,
  isSelected,
}: {
  onDeleteTicket: (ticketId: ITicket["id"]) => void;
  detailed: boolean;
  onResetSelection: () => void;
  isSelected: boolean;
}) => {
  const columns: TableColumnsType<ITicket> = [
    {
      width: 4,
      render: (_, ticket) => {
        const watermark = getWatermarkByOrder(ticket.watermarks);
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
      render: (value, ticket) =>
        detailed ? (
          <Flex vertical gap={4}>
            <strong>{value}</strong>
            <WatermarkList watermarks={ticket.watermarks} />
          </Flex>
        ) : (
          value
        ),
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
      title: () =>
        isSelected ? (
          <Tooltip placement="left" title="Reset selection">
            <i
              className="material-icons"
              style={{ cursor: "pointer", fontSize: "20px", color: "red" }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onResetSelection();
              }}
            >
              refresh
            </i>
          </Tooltip>
        ) : null,
      width: 20,
      align: "center",
      render: (_, ticket) => (
        <Flex align="center" justify="center">
          <i
            className="material-icons"
            style={{ cursor: "pointer", fontSize: "20px", color: "red" }}
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
