import React, { useMemo, useState } from "react";

import TPSMap from "@onlocation/tps-map";

import RowTooltip from "./components/RowTooltip";
import SectionTooltip from "./components/SectionTooltip";
import Sidebar from "./components/Sidebar";

import {
  DEFAULT_ACTION_STATE,
  DEFAULT_FLY_TO_STATE,
  DEFAULT_ITEM_STYLES_STATE,
  DEFAULT_MAP_SIZE_STATE,
  DEFAULT_TICKETS,
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
} from "./constants";

import type { IMapItem } from "@onlocation/tps-map";
import { ItemAction, ITicket, IWatermark, IWheelchairsState } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getCurrentWatermark, isTicketSelected } from "./utils";
import { Flex } from "antd";
import { OLLogoIcon } from "./components/Icons";

const TPSMapApp = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>(DEFAULT_TICKETS);

  // settings
  const [layoutId, setLayoutId] = useState<string>("1339713");
  const [wheelchairs, setWheelchairs] = useState<IWheelchairsState>({
    show: true,
    basedOnRows: false,
  });
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
    return Array.from(watermarksMap.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    const { selectedWatermarks } = actionState;
    const selectedWatermarkIds = selectedWatermarks.map((item) => item.id);
    return tickets.filter((item) => {
      if (
        selectedWatermarkIds.length &&
        (!item.watermarks ||
          !item.watermarks.some((w) => selectedWatermarkIds.includes(w.id)))
      ) {
        return false;
      }
      if (
        actionState.selected.length &&
        !isTicketSelected(actionState.selected, item)
      ) {
        return false;
      }
      return true;
    });
  }, [tickets, actionState.selectedWatermarks, actionState.selected]);

  const mapItems = useMemo(() => {
    const ticketsMapBySectionName = tickets.reduce((result, ticket) => {
      const tickets = [...(result.get(ticket.section) || [])];
      tickets.push(ticket);
      result.set(ticket.section, tickets);
      return result;
    }, new Map<ITicket["section"], ITicket[]>());

    return tickets.map((ticket) => {
      const { selectedWatermarks } = actionState;
      const watermark = getCurrentWatermark(
        ticket.watermarks,
        selectedWatermarks
      );
      if (ticket.section === "1") {
        console.log(watermark);
        console.log(ticket);
      }
      return {
        sectionName: ticket.section,
        rowName: ticket.row,
        inactiveStyles: watermark
          ? {
              fillColor: watermark.color,
            }
          : undefined,
        activeStyles: watermark
          ? {
              fillColor: watermark.color,
            }
          : undefined,
        rowTooltip: <RowTooltip ticket={ticket} />,
        sectionTooltip: (
          <SectionTooltip
            sectionName={ticket.section}
            tickets={ticketsMapBySectionName.get(ticket.section)}
          />
        ),
      } as IMapItem;
    });
  }, [
    tickets,
    actionState.selectedWatermarks,
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
      selectedWatermarks: [],
    }));
  };
  const handleDeleteTicket = (id: ITicket["id"]) => {
    setTickets((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelect = (items: ItemAction[]) => {
    console.log(items.length, tickets.length);
    setActionState((prev) => ({
      ...prev,
      selected: items,
      selectedWatermark: undefined,
    }));
  };

  const handleSelectWatermark = (watermarks: IWatermark[]) => {
    setActionState((prev) => ({ ...prev, selectedWatermarks: watermarks }));
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
        height: "100%",
        fontFamily: "Inter, san-serif",
        color: "#020202",
      }}
    >
      <div style={{ height: `${HEADER_HEIGHT}px` }}>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          overflow: "hidden",
        }}
      >
        <div style={{ width: SIDEBAR_WIDTH, height: "100%" }}>
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
              setTickets((prev) => [
                { ...newTicket, id: prev.length + 1 },
                ...prev,
              ])
            }
            wheelchairs={wheelchairs}
            setWheelchairs={(update) =>
              setWheelchairs((prev) => ({ ...prev, ...update }))
            }
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
        </div>
        <div
          style={{
            flex: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: "auto", width: "100%" }}>
            {token ? (
              <TPSMap
                onLevelChange={setLevel}
                venueLayoutId={
                  isNaN(Number(layoutId)) ? undefined : Number(layoutId)
                }
                extraContent={{
                  "bottom-left": {
                    component: (
                      <Footer
                        watermarks={watermarks}
                        selectedWatermarks={actionState.selectedWatermarks}
                        onWatermarkChange={(selectedWatermarks) =>
                          setActionState((prev) => ({
                            ...prev,
                            selectedWatermarks,
                          }))
                        }
                      />
                    ),
                  },
                  "bottom-right": {
                    component: (
                      <Flex
                        align="center"
                        style={{
                          fontSize: "12px",
                          margin: "22px",
                          fontWeight: "bold",
                        }}
                        gap={10}
                      >
                        Only with
                        <OLLogoIcon />
                      </Flex>
                    ),
                  },
                }}
                token={token}
                wheelchairs={wheelchairs.show}
                wheelchairsByRows={wheelchairs.basedOnRows}
                items={mapItems}
                width={mapSize?.width ? `${mapSize.width}px` : undefined}
                height={mapSize?.height ? `${mapSize.height}px` : undefined}
                // containerStyles={{ border: "1px solid lightgray", borderRadius: 8 }}
                hoveredItem={actionState.hover || undefined}
                focusedItem={actionState.focus || undefined}
                selectedItems={actionState.selected || undefined}
                labelingByData={labelingByData}
                useFlyOn={useFlyOn as any}
                useShadeDown={["select"]}
                onItemHover={(item) => {
                  handleHover(item);
                }}
                // onItemClick={(item) => {
                //   handleClick(item);
                // }}
                onItemsSelect={(item, items) => {
                  console.log("map selection: ", item, items);
                  handleSelect(items);
                }}
                onMapHome={() => {
                  setActionState(DEFAULT_ACTION_STATE);
                }}
                defaultItemStyles={defaultItemStyles}
              />
            ) : null}
          </div>
          {/* <div style={{ height: `${FOOTER_HEIGHT}px` }}>
            <Footer
              selectedWatermarks={actionState.selectedWatermarks}
              onWatermarkChange={(selectedWatermarks) =>
                setActionState((prev) => ({ ...prev, selectedWatermarks }))
              }
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TPSMapApp;
