import React, { useEffect, useMemo, useState } from "react";

import TPSMap from "@onlocation/tps-map";

import StyledMapWrapper from "./StyledMapWrapper";
import RowTooltip from "./components/RowTooltip";
import SectionTooltip from "./components/SectionTooltip";
import Sidebar from "./components/Sidebar";
import Watermarks from "./components/Watermarks";

import {
  DEFAULT_ACTION_STATE,
  DEFAULT_COLOR,
  DEFAULT_FLY_TO_STATE,
  DEFAULT_ITEM_STYLES_STATE,
  DEFAULT_MAP_SIZE_STATE,
  DEFAULT_TICKETS,
} from "./constants";

import type { IMapItem } from "@onlocation/tps-map";
import { ItemAction, ITicket, IWatermark } from "./types";

const TPSMapApp = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>(DEFAULT_TICKETS);

  // settings
  const [layoutId, setLayoutId] = useState<string>("1339713");
  const [wheelchairs, setWheelchairs] = useState(true);
  const [labelingByData, setLabelingByData] = useState(true);
  const [level, setLevel] = useState<"row" | "section">("section");
  const [defaultItemStyles, setDefaultItemStyles] = useState(
    DEFAULT_ITEM_STYLES_STATE
  );
  const [mapSize, setMapSize] = useState(DEFAULT_MAP_SIZE_STATE);
  const [flyToState, setFlyToState] = useState(DEFAULT_FLY_TO_STATE);
  const [actionState, setActionState] = useState(DEFAULT_ACTION_STATE);

  const watermarks = useMemo(() => {
    const watermarksMap = tickets.reduce((result, item) => {
      if (item.watermarks?.length) {
        item.watermarks.forEach((w) => {
          result.set(w.id, w);
        });
      }
      return result;
    }, new Map<IWatermark["id"], IWatermark>());
    return Array.from(watermarksMap.values());
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    const { selectedWatermark } = actionState;
    if (!selectedWatermark) return tickets;
    return tickets.filter(
      (item) =>
        item.watermarks &&
        item.watermarks.some((w) => w.id === selectedWatermark.id)
    );
  }, [tickets, actionState.selectedWatermark]);

  const mapItems = useMemo(() => {
    const ticketsMapBySectionName = tickets.reduce((result, ticket) => {
      const tickets = [...(result.get(ticket.section) || [])];
      tickets.push(ticket);
      result.set(ticket.section, tickets);
      return result;
    }, new Map<ITicket["section"], ITicket[]>());

    return tickets.map((ticket) => {
      const { selectedWatermark } = actionState;
      const { watermarks } = ticket;
      const ticketSelectedWatermark =
        selectedWatermark && watermarks
          ? watermarks.find((w) => w.id === selectedWatermark.id)
          : undefined;
      const mainTicketWatermark = watermarks?.length
        ? [...watermarks].sort((a, b) => a.sortOrder - b.sortOrder)[0]
        : undefined;
      const finalWatermark = ticketSelectedWatermark || mainTicketWatermark;
      return {
        sectionName: ticket.section,
        rowName: ticket.row,
        inactiveStyles: finalWatermark
          ? {
              fillColor: finalWatermark.color,
            }
          : undefined,
        rowTooltip: (
          <RowTooltip
            sectionName={ticket.section}
            rowName={ticket.row}
            watermarks={ticket.watermarks}
            price={ticket.price}
          />
        ),
        sectionTooltip: (
          <SectionTooltip
            color={finalWatermark?.color || DEFAULT_COLOR}
            sectionName={ticket.section}
            tickets={ticketsMapBySectionName.get(ticket.section)}
          />
        ),
      } as IMapItem;
    });
  }, [
    tickets,
    actionState.selectedWatermark,
    defaultItemStyles?.interactive?.inactive?.fillColor,
  ]);

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
      selectedWatermark: undefined,
    }));
  };
  const handleDeleteTicket = (id: ITicket["id"]) => {
    setTickets((prev) => prev.filter((item) => item.id !== id));
  };

  // const handleSelect = (items: ItemAction[]) => {
  //   console.log(items.length, tickets.length);
  //   setActionState((prev) => ({
  //     ...prev,
  //     selected: items,
  //     selectedWatermark: undefined,
  //   }));
  // };

  const handleSelectWatermark = (watermark: IWatermark | undefined) => {
    setActionState((prev) => ({ ...prev, selectedWatermark: watermark }));
  };

  const useFlyOn = useMemo(() => {
    const result = [];
    if (flyToState.hover.value) {
      result.push({ type: "hover", fitToCenter: flyToState.hover.fitToCenter });
    }
    if (flyToState.focus.value) {
      result.push({ type: "focus", fitToCenter: flyToState.focus.fitToCenter });
    }
    if (flyToState.select.value) {
      result.push({
        type: "select",
        fitToCenter: flyToState.select.fitToCenter,
      });
    }
    return result;
  }, [flyToState]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        fontFamily: "Inter, san-serif",
        color: "#020202",
      }}
    >
      <Sidebar
        tickets={filteredTickets}
        actionState={actionState}
        onHover={handleHover}
        onClick={handleClick}
        onDeleteTicket={handleDeleteTicket}
        setToken={(token) => setToken(token)}
        setLabelingByData={(value) => setLabelingByData(value)}
        labelingByData={labelingByData}
        layoutId={layoutId}
        onLayoutIdChange={(id) => setLayoutId(id)}
        onAddTicket={(newTicket) =>
          setTickets((prev) => [{ ...newTicket, id: prev.length + 1 }, ...prev])
        }
        wheelchairs={wheelchairs}
        setWheelchairs={(value) => setWheelchairs(value)}
        defaultItemStyles={defaultItemStyles}
        onActiveStylesChange={(update) =>
          setDefaultItemStyles((prev) =>
            !prev ? update : { ...prev, ...update }
          )
        }
        mapSize={mapSize}
        onSizeChange={(update) =>
          setMapSize((prev) => ({ ...prev, ...update }))
        }
        flyToOptions={flyToState}
        onFlyToChange={(update) => {
          setActionState(DEFAULT_ACTION_STATE);
          setFlyToState((prev) => ({ ...prev, ...update }));
        }}
      />
      <StyledMapWrapper
        style={{
          flex: "auto",
          height: "calc(100% - 40px)",
          padding: "20px",
        }}
      >
        {token ? (
          <TPSMap
            onLevelChange={setLevel}
            venueLayoutId={
              isNaN(Number(layoutId)) ? undefined : Number(layoutId)
            }
            token={token}
            wheelchairs={wheelchairs}
            items={mapItems}
            width={mapSize?.width ? `${mapSize.width}px` : undefined}
            height={mapSize?.height ? `${mapSize.height}px` : undefined}
            containerStyles={{ border: "1px solid lightgray", borderRadius: 8 }}
            hoveredItem={actionState.hover || undefined}
            focusedItem={actionState.focus || undefined}
            selectedItems={actionState.selected || undefined}
            labelingByData={labelingByData}
            // mapOptions={{ dragging: false }}
            useFlyOn={useFlyOn as any}
            extraContent={{
              "top-left": watermarks.length
                ? {
                    component: (
                      <Watermarks
                        selectedId={actionState.selectedWatermark?.id}
                        watermarks={watermarks}
                        onSelect={handleSelectWatermark}
                      />
                    ),
                  }
                : undefined,
            }}
            useShadeDown={["select"]}
            useMapSelect
            onItemHover={(item) => {
              handleHover(item);
            }}
            onItemClick={(item) => {
              handleClick(item);
            }}
            // onItemsSelect={(item, items) => {
            //   console.log("map selection: ", item, items);
            //   handleSelect(items);
            // }}
            onMapHome={() => {
              setActionState(DEFAULT_ACTION_STATE);
            }}
            defaultItemStyles={defaultItemStyles}
          />
        ) : null}
      </StyledMapWrapper>
    </div>
  );
};

export default TPSMapApp;
