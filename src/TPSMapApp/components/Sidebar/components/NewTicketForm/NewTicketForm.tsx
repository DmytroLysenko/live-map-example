import React, { useState } from "react";
import { ITicket, NewTicket } from "../../../../types/ticket";
import Label from "../Label";
import Section from "../Section";

interface IProps {
  onAddTicket: (ticket: Omit<ITicket, "id">) => void;
}
const DEFAULT_TICKET: NewTicket = { section: "", row: "" };

const NewTicketForm = ({ onAddTicket }: IProps) => {
  const [ticket, setTicket] = useState<NewTicket>(DEFAULT_TICKET);

  const handleAdd = () => {
    if (ticket.section && ticket.row) {
      onAddTicket(ticket);
      setTicket(DEFAULT_TICKET);
    }
  };

  return (
    <Section style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Label label="New Ticket Form" />
      <div>
        Section:
        <div>
          <input
            value={ticket.section}
            onChange={({ target: { value } }) =>
              setTicket((prev) => ({ ...prev, section: value }))
            }
          />
        </div>
      </div>
      <div>
        Row:
        <div>
          <input
            value={ticket.row}
            onChange={({ target: { value } }) =>
              setTicket((prev) => ({ ...prev, row: value }))
            }
          />
        </div>
      </div>
      <div>
        <button onClick={handleAdd}>Add</button>
      </div>
    </Section>
  );
};

export default NewTicketForm;
