import React, { useEffect, useMemo, useState } from "react";

import TPSMap from "@onlocation/tps-map";
import { Flex } from "antd";
import { OLLogoIcon } from "./Components/Icons";
import Layout from "./Components/Layout";
import { RowTooltip, SectionTooltip } from "./Components/MapTooltip";
import Footer from "./Components/Footer";
import StyledContent from "./StyledContent";
import TicketsTable from "./Components/TicketsTable";
import MapSettings from "./Components/MapSettings";
import Sidebar from "./Components/Sidebar";

import {
  DEFAULT_ACTION_STATE,
  DEFAULT_FLY_TO_STATE,
  DEFAULT_ITEM_STYLES_STATE,
  DEFAULT_MAP_SIZE_STATE,
  DEFAULT_TICKETS,
  WATERMARKS,
} from "./constants";

import { getCurrentWatermark, isTicketSelected } from "./utils";

import type { IMapItem, IMapProps } from "@onlocation/tps-map";
import { ItemAction, ITicket, IWatermark, IWheelchairsState } from "./types";
import WheelchairsToggle from "./Components/WheelchairsToggle";

const MapApp = () => {
  const [token, setToken] = useState<string | null>(
    "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJxY3VlLWF1dGhlbnRpY2F0aW9uIiwiYXVkIjoicWN1ZS1hdXRoZW50aWNhdGlvbiIsIm5iZiI6MTc0NzExMjQ5OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDg3IiwiYXV0aGVudGljYXRpb25JZCI6LTIsImV4cCI6NDg3MTI1MDc0NiwidXNlck5hbWUiOiJvbGUtbWFwLWNvbXBvbmVudCIsImlhdCI6MTc0NzExMjQ5OCwianRpIjoiOThjNWViOGMtZGExMS00YzM4LWE4MmMtYzE4MGUyMzgzNDU5In0.lwKhyOGTe7RUd6v9cYH97hLrco3jJJyLIrLrEfNiHmHrtfoDUU6mqhoIqDmG73rp368AWEDNkhlXQbqebsZnpaCgXfvsXDPeCQ1NtyBoWYJEap67zLBoTHRsTsgOVRfTGjOpLsx9pjG3hJ7WdnGfbVNyzcnDCyuDVesbK1CP058hZ_4poJ1GE-4JL-U0VGY-2qd5U3yYuwmsMJU8l2Yzcx9kuF8YZodpbAB9AvvwtWK-rap5N58Bze6AIFLp3rzvvW9YW20qYoiJBkE3YEB698W3HmhlJMM3ScKd9Lcoeoxb5b9c5eIDl5wdOOLJ7CDwsVme8Pf1DMgAAir7wMoDZA"
  );
  const [tickets, setTickets] = useState<ITicket[]>(DEFAULT_TICKETS);
  const [watermarks, setWatermarks] = useState<IWatermark[]>(WATERMARKS);

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
      const sectionWatermarks = (
        ticketsMapBySectionName.get(ticket.section) || []
      ).reduce((result, ticket) => {
        if (ticket.watermarks?.length) {
          ticket.watermarks.forEach((w) => {
            const isNew = !result.some((item) => item.id === w.id);
            isNew && result.push(w);
          });
        }
        return result;
      }, [] as IWatermark[]);
      const watermark = getCurrentWatermark(
        level === "row" ? ticket.watermarks : sectionWatermarks,
        selectedWatermarks
      );
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
    level,
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
    setActionState((prev) => ({
      ...prev,
      selected: items,
      selectedWatermark: undefined,
    }));
  };

  const useFlyOn = useMemo(() => {
    const result: Required<IMapProps>["useFlyOn"] = [];
    if (flyToState.hover.value) {
      result.push({
        type: "hover",
        fitToCenter: flyToState.hover.fitToCenter,
        onlyExternal: flyToState.hover.onlyExternal,
        zoomLevel: flyToState.hover.zoomLevel,
      });
    }
    if (flyToState.focus.value) {
      result.push({
        type: "focus",
        fitToCenter: flyToState.focus.fitToCenter,
        onlyExternal: flyToState.focus.onlyExternal,
        zoomLevel: flyToState.focus.zoomLevel,
      });
    }
    if (flyToState.select.value) {
      result.push({
        type: "select",
        fitToCenter: flyToState.select.fitToCenter,
        onlyExternal: flyToState.select.onlyExternal,
        zoomLevel: flyToState.select.zoomLevel,
      });
    }
    return result.length ? result : undefined;
  }, [flyToState]);

  useEffect(() => {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.watermarks?.length) {
          const newWatermarks = ticket.watermarks.reduce(
            (result, watermark) => {
              const targetWatermark = watermarks.find(
                (w) => w.id === watermark.id
              );
              if (targetWatermark) result.push(targetWatermark);
              return result;
            },
            [] as IWatermark[]
          );
          return { ...ticket, watermarks: newWatermarks };
        }
        return ticket;
      })
    );
  }, [watermarks]);

  return (
    <Layout
      leftSidebar={
        <Sidebar
          tickets={filteredTickets}
          actionState={actionState}
          onHover={handleHover}
          onClick={handleClick}
          onDeleteTicket={handleDeleteTicket}
        />
      }
      rightSidebar={
        <MapSettings
          setToken={(token) => setToken(token)}
          setLabelingByData={(value) => setLabelingByData(value)}
          labelingByData={labelingByData}
          layoutId={layoutId}
          onLayoutIdChange={(id) => setLayoutId(id)}
          onAddTicket={(newTicket) => {
            const biggestTicketId = tickets.reduce(
              (result, ticket) => (result > ticket.id ? result : ticket.id),
              0
            );
            setTickets((prev) => [
              { ...newTicket, id: biggestTicketId + 1 },
              ...prev,
            ]);
          }}
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
          watermarks={watermarks}
          onWatermarkUpdate={(update) =>
            setWatermarks((prev) =>
              prev.map((w) => (w.id === update.id ? { ...w, ...update } : w))
            )
          }
          onWatermarkDelete={(id) => {
            setWatermarks((prev) => prev.filter((w) => w.id !== id));
          }}
          onWatermarkAdd={(newWatermark) => {
            const biggestId = watermarks.reduce(
              (id, w) => (w.id > id ? w.id : id),
              0
            );
            setWatermarks((prev) =>
              [...prev, { id: biggestId + 1, ...newWatermark }].sort(
                (a, b) => a.sortOrder - b.sortOrder
              )
            );
          }}
        />
      }
    >
      <StyledContent>
        <div className="map-container">
          {token ? (
            <TPSMap
              onLevelChange={(level) => {
                setLevel(level);
              }}
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
                        fontSize: "14px",
                        margin: "22px",
                        fontWeight: "bold",
                      }}
                      gap={6}
                    >
                      Only on
                      <OLLogoIcon style={{ width: 16, height: 16 }} />
                    </Flex>
                  ),
                },
                "top-right": {
                  component: (
                    <WheelchairsToggle
                      wheelchairs={wheelchairs}
                      setWheelchairs={(update) =>
                        setWheelchairs((prev) => ({ ...prev, ...update }))
                      }
                    />
                  ),
                  wrapperStyles: { margin: "22px 22px 0 0" },
                },
              }}
              defaultExtraContentOptions={{
                zoom: { wrapperStyle: { marginLeft: "22px" } },
              }}
              token={token}
              wheelchairs={wheelchairs.show}
              wheelchairsByRows={wheelchairs.basedOnRows}
              items={mapItems}
              width={mapSize?.width ? `${mapSize.width}px` : undefined}
              height={mapSize?.height ? `${mapSize.height}px` : undefined}
              hoveredItem={actionState.hover || undefined}
              focusedItem={actionState.focus || undefined}
              selectedItems={actionState.selected || undefined}
              labelingSettings={
                !labelingByData ? { backgroundLabeling: true } : undefined
              }
              useFlyOn={useFlyOn}
              useShadeDown={["select"]}
              onItemHover={(item) => {
                handleHover(item);
              }}
              onItemsSelect={(item, items) => {
                handleSelect(items);
              }}
              onMapHome={() => {
                setActionState(DEFAULT_ACTION_STATE);
              }}
              defaultItemStyles={defaultItemStyles}
            />
          ) : null}
        </div>
        <div className="content-container">
          <TicketsTable
            tickets={filteredTickets}
            actionState={actionState}
            onHover={handleHover}
            onClick={handleClick}
            onDeleteTicket={handleDeleteTicket}
            detailed={false}
          />
        </div>
      </StyledContent>
    </Layout>
  );
};

export default MapApp;
