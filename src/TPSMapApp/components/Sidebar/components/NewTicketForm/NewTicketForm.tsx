import React, { useState } from "react";

import Label from "../Label";
import Section from "../Section";

import { IWatermark, NewTicket } from "../../../../types";
import StyledContainer from "./StyledContainer";
import { WATERMARKS, WATERMARKS_MAP_BY_STRING_ID } from "../../../../constants";

interface IProps {
  onAddTicket: (ticket: NewTicket) => void;
}
const DEFAULT_TICKET: NewTicket = {
  section: "",
  row: "",
  watermarks: [],
  price: 0,
};

const NewTicketForm = ({ onAddTicket }: IProps) => {
  const [ticket, setTicket] = useState<NewTicket>(DEFAULT_TICKET);

  const handleAdd = () => {
    if (ticket.section && ticket.row && ticket.price) {
      onAddTicket(ticket);
      setTicket(DEFAULT_TICKET);
    }
  };
  const handleChange = (
    event: Event | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = event.target as HTMLSelectElement;
    const selectedOptions: string[] = Array.from(target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    const watermarks = selectedOptions.reduce((result, stringId) => {
      const watermark = WATERMARKS_MAP_BY_STRING_ID.get(stringId);
      if (watermark) {
        result.push(watermark);
      }
      return result;
    }, [] as IWatermark[]);
    setTicket((prev) => ({ ...prev, watermarks }));
  };

  return (
    <Section
      style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      name="New Ticket Form"
    >
      <Label label="New Ticket Form" />
      <StyledContainer>
        <div>
          <label>
            <input
              value={ticket.section}
              onChange={({ target: { value } }) =>
                setTicket((prev) => ({ ...prev, section: value }))
              }
            />
            Section
          </label>
        </div>
        <div>
          <label>
            <input
              value={ticket.row}
              onChange={({ target: { value } }) =>
                setTicket((prev) => ({ ...prev, row: value }))
              }
            />
            Row
          </label>
        </div>
        <div>
          <label>
            <input
              type="number"
              min={0}
              value={ticket.price}
              onChange={({ target: { value } }) =>
                setTicket((prev) => ({ ...prev, price: +value }))
              }
            />
            Price
          </label>
        </div>
        <div>
          <label>
            <select
              id="watermarks_newTicketForm"
              multiple
              style={{ width: "55%" }}
              onChange={handleChange}
            >
              {WATERMARKS.map((item) => (
                <option
                  key={item.id}
                  selected={ticket.watermarks.some((w) => w.id === item.id)}
                  title={`${item.watermarkName} (Sort Order: ${item.sortOrder})`}
                  value={item.id}
                >
                  {item.watermarkName}
                </option>
              ))}
            </select>
            Hospitality Options
          </label>
        </div>
        <div>
          <button
            disabled={!ticket.section || !ticket.row || !ticket.price}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </StyledContainer>
    </Section>
  );
};

export default NewTicketForm;
