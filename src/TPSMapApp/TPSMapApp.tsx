import React, { useEffect, useMemo, useState } from "react";

import TPSMap from "@onlocation/tps-map";

import StyledMapWrapper from "./StyledMapWrapper";
import RowTooltip from "./components/RowTooltip";
import SectionTooltip from "./components/SectionTooltip";
import Sidebar from "./components/Sidebar";
import Watermarks from "./components/Watermarks";

import { DEFAULT_COLOR } from "./constants";
import { getTicketState } from "./components/Watermarks/utils";

import { ITicket, IWatermark } from "./types/ticket";
import type { IMapItem, IMapItemIdentifies } from "@onlocation/tps-map";

type ItemAction = IMapItemIdentifies & { id?: number };

export interface IOLActionState {
  hover: ItemAction | undefined;
  focus: ItemAction | undefined;
  selected: ItemAction[];
  selectedWatermark: IWatermark | undefined;
}

const TPSMapApp = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [ticketState, setTicketState] = useState(getTicketState(tickets));
  const [actionState, setActionState] = useState<IOLActionState>({
    hover: undefined,
    focus: undefined,
    selected: [],
    selectedWatermark: undefined,
  });
  const [level, setLevel] = useState<"row" | "section">("section");
  const [token, setToken] = useState<string | null>(null);
  const [layoutId, setLayoutId] = useState<string>("560501");

  const selectedTicketIds = useMemo(() => {
    if (actionState.selectedWatermark) {
      return (
        ticketState
          .ticketsByWatermarkIdMap!.get(actionState.selectedWatermark.id)
          ?.map((item) => item.id) || []
      );
    }
    return tickets
      .filter((ticket) => {
        return actionState.selected.some((item) => {
          if (item.rowName) {
            return (
              ticket.row === item.rowName && ticket.section === item.sectionName
            );
          } else {
            return ticket.section === item.sectionName;
          }
        });
      })
      .map((ticket) => ticket.id);
  }, [actionState.selected, actionState.selectedWatermark]);

  const mapItems = useMemo(
    () =>
      tickets.map((ticket, idx) => {
        const selectedWatermark =
          actionState.selectedWatermark && ticket.watermarks?.length
            ? ticket.watermarks.find(
                (item) => item.id === actionState.selectedWatermark?.id
              )
            : undefined;

        const watermark =
          selectedWatermark ||
          (ticket.watermarks?.length
            ? ticket.watermarks.sort(
                (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
              )[0]
            : undefined);
        const color = watermark?.color || DEFAULT_COLOR;
        return {
          sectionName: ticket.section,
          rowName: ticket.row,
          inactiveStyles: {
            fillColor: selectedWatermark?.color,
          },
          // fillPattern: "hatched",
          sortOrder: selectedWatermark?.sortOrder || undefined,
          rowTooltip: <RowTooltip color={color} name={ticket.row} />,
          sectionTooltip: (
            <SectionTooltip color={color} name={ticket.section} />
          ),
        } as IMapItem;
      }),
    [tickets, actionState.selectedWatermark]
  );

  const handleHover = (item: ItemAction | undefined) => {
    if (!actionState?.focus) {
      setActionState((prev) => ({ ...prev, hover: item }));
    }
  };

  const handleClick = (item: ItemAction) => {
    setActionState((prev) => ({
      ...prev,
      focus:
        JSON.stringify(item) === JSON.stringify(prev.focus) ? undefined : item,
      hover: undefined,
    }));
  };

  const handleSelect = (items: ItemAction[]) => {
    console.log(items.length, tickets.length);
    setActionState((prev) => ({
      ...prev,
      selected: items,
      selectedWatermark: undefined,
    }));
  };

  const handleSelectWatermark = (watermark: IWatermark) => {
    setActionState((prev) => ({
      ...prev,
      selected:
        prev.selectedWatermark?.id === watermark.id
          ? ([] as ItemAction[])
          : ticketState.ticketsByWatermarkIdMap
              .get(watermark.id)
              ?.map((item) => ({
                ...item,
                sectionName: item.section,
                rowName: item.row,
              })) || ([] as ItemAction[]),
      selectedWatermark:
        prev.selectedWatermark?.id === watermark.id ? undefined : watermark,
    }));
  };

  useEffect(() => {
    setTicketState(getTicketState(tickets));
  }, [tickets]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Sidebar
        tickets={tickets}
        selectedTickets={selectedTicketIds}
        actionState={actionState}
        onHover={handleHover}
        onClick={handleClick}
        setToken={(token) => setToken(token)}
        layoutId={layoutId}
        onLayoutIdChange={(id) => setLayoutId(id)}
        onAddTicket={(newTicket) =>
          setTickets((prev) => [{ ...newTicket, id: prev.length + 1 }, ...prev])
        }
      />
      <StyledMapWrapper style={{ flex: "auto", height: "100%" }}>
        {token ? (
          <TPSMap
            level={level}
            onLevelChange={setLevel}
            venueLayoutId={
              isNaN(Number(layoutId)) ? undefined : Number(layoutId)
            }
            token={token}
            items={mapItems}
            hoveredItem={actionState.hover || undefined}
            focusedItem={actionState.focus || undefined}
            selectedItems={actionState.selected || undefined}
            // mapOptions={{ dragging: false }}
            defaultExtraContentOptions={{
              levelWrapperClassName: "level-wrapper",
            }}
            extraContent={{
              "bottom-left": {
                component: (
                  <Watermarks
                    tickets={tickets}
                    onSelect={handleSelectWatermark}
                  />
                ),
              },
            }}
            useShadeDown={["select"]}
            useMapSelect
            onItemHover={(item) => {
              handleHover(item);
            }}
            onItemClick={(item) => {
              handleClick(item);
            }}
            onItemsSelect={(item, items) => {
              console.log("map selection: ", item, items);
              handleSelect(items);
            }}
            // onMapHome={() => {
            //   console.log("map reset view")
            // }}
            // onZoomChange={(zoom) => console.log("zoom change: ", zoom)}
            defaultItemStyles={{
              interactive: {
                inactive: {
                  fillColor: "#CABF93",
                  fillOpacity: 1,
                },
                active: {
                  fillColor: "#CABF93",
                  fillOpacity: 1,
                  color: "black",
                  opacity: 1,
                  weight: 2,
                },
              },
              noninteractive: {
                // fillColor: "lightgray",
                // fillColor: "white",
              },
            }}
          />
        ) : null}
      </StyledMapWrapper>
    </div>
  );
};

export default TPSMapApp;
