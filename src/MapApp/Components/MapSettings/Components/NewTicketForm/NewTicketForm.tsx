import React, { useState } from "react";

import Label from "../Label";
import Section from "../Section";
import { Button, Flex, Input, InputNumber, Select, Typography } from "antd";

import { IWatermark, NewTicket } from "../../../../types";

interface IProps {
  watermarks: IWatermark[];
  onAddTicket: (ticket: NewTicket) => void;
}
const DEFAULT_TICKET: NewTicket = {
  section: "",
  row: "",
  watermarks: [],
  price: 0,
  quantity: 0,
};

const NewTicketForm = ({ onAddTicket, watermarks }: IProps) => {
  const [ticket, setTicket] = useState<NewTicket>(DEFAULT_TICKET);

  const handleAdd = () => {
    if (ticket.section && ticket.row && ticket.price && ticket.quantity) {
      onAddTicket(ticket);
      setTicket(DEFAULT_TICKET);
    }
  };

  return (
    <Section
      style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      name="New Ticket Form"
    >
      <Label label="New Ticket Form" />
      <Flex vertical gap={6} style={{ marginTop: "10px" }}>
        <Input
          style={{ width: "150px" }}
          size="small"
          prefix="Section:"
          placeholder="Section"
          value={ticket.section}
          onChange={({ target: { value } }) =>
            setTicket((prev) => ({ ...prev, section: value }))
          }
        />
        <Input
          style={{ width: "150px" }}
          size="small"
          prefix="Row:"
          placeholder="Row"
          value={ticket.row}
          onChange={({ target: { value } }) =>
            setTicket((prev) => ({ ...prev, row: value }))
          }
        />
        <InputNumber
          style={{ width: "150px" }}
          size="small"
          placeholder="Price"
          prefix="Price $:"
          controls={false}
          value={ticket.price || null}
          onChange={(value) =>
            setTicket((prev) => ({ ...prev, price: value || 0 }))
          }
        />
        <InputNumber
          style={{ width: "150px" }}
          size="small"
          placeholder="Quantity"
          prefix="Quantity:"
          controls={false}
          value={ticket.quantity || null}
          onChange={(value) =>
            setTicket((prev) => ({ ...prev, quantity: value || 0 }))
          }
        />
        <Select
          styles={{
            popup: { root: { zIndex: 2500 } },
          }}
          placeholder="Packages"
          value={ticket.watermarks.map((w) => w.id)}
          options={watermarks}
          fieldNames={{ label: "watermarkName", value: "id" }}
          mode="multiple"
          size="small"
          optionRender={({ data }) => {
            return (
              <Flex align="center" gap={6}>
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    backgroundColor: data.color,
                  }}
                />
                <Typography.Text>{data.watermarkName}</Typography.Text>
              </Flex>
            );
          }}
          onChange={(watermarkIds) => {
            const selectedWatermarks = watermarks.reduce(
              (result, watermark) => {
                if (watermarkIds.includes(watermark.id)) {
                  result.push(watermark);
                }
                return result;
              },
              [] as IWatermark[]
            );
            setTicket((prev) => ({ ...prev, watermarks: selectedWatermarks }));
          }}
        />
        <Button
          size="small"
          disabled={!ticket.section || !ticket.row || !ticket.price}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Flex>
    </Section>
  );
};

export default NewTicketForm;
