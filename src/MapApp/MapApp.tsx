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

import { DEFAULT_ACTION_STATE, DEFAULT_MAP_SETTINGS } from "./constants";

import { getCurrentWatermark, isTicketSelected } from "./utils";

import type { IMapItem, IMapProps } from "@onlocation/tps-map";
import { IMapSettings, ItemAction, ITicket, IWatermark } from "./types";
import WheelchairsToggle from "./Components/WheelchairsToggle";

const MAP_SETTINGS_STORAGE_KEY = "mapSettings";

const MapApp = () => {
  const [mapSettings, setSettings] = useState<IMapSettings>(() => {
    try {
      const stored = sessionStorage.getItem(MAP_SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure any new keys get default values
        return { ...DEFAULT_MAP_SETTINGS, ...parsed } as IMapSettings;
      }
    } catch (_) {
      // swallow parsing errors and fall back to defaults
    }
    return DEFAULT_MAP_SETTINGS;
  });
  const [actionState, setActionState] = useState(DEFAULT_ACTION_STATE);

  const {
    token,
    tickets,
    watermarks,
    layoutId,
    wheelchairs,
    labelingByData,
    level,
    defaultItemStyles,
    mapSize,
    flyToState,
  } = mapSettings;

  const handleUpdateSettings = (update: Partial<IMapSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...update } as IMapSettings;
      try {
        sessionStorage.setItem(
          MAP_SETTINGS_STORAGE_KEY,
          JSON.stringify(next)
        );
      } catch (_) {
        // Ignore write errors
      }
      return next;
    });
  };

  const handleDeleteTicket = (id: ITicket["id"]) => {
    handleUpdateSettings({ tickets: tickets.filter((item) => item.id !== id) });
  };

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
    handleUpdateSettings({
      tickets: tickets.map((ticket) => {
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
      }),
    });
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
          setToken={(token) => handleUpdateSettings({ token })}
          setLabelingByData={(value) => {
            handleUpdateSettings({ labelingByData: value });
          }}
          labelingByData={labelingByData}
          layoutId={layoutId}
          onLayoutIdChange={(id) => {
            handleUpdateSettings({ layoutId: id });
          }}
          onAddTicket={(newTicket) => {
            const biggestTicketId = tickets.reduce(
              (result, ticket) => (result > ticket.id ? result : ticket.id),
              0
            );
            handleUpdateSettings({
              tickets: [{ ...newTicket, id: biggestTicketId + 1 }, ...tickets],
            });
          }}
          wheelchairs={wheelchairs}
          setWheelchairs={(update) => {
            handleUpdateSettings({
              wheelchairs: { ...wheelchairs, ...update },
            });
          }}
          defaultItemStyles={defaultItemStyles}
          onActiveStylesChange={(update) => {
            handleUpdateSettings({
              defaultItemStyles: { ...defaultItemStyles, ...update },
            });
          }}
          mapSize={mapSize}
          onSizeChange={(update) => {
            handleUpdateSettings({ mapSize: { ...mapSize, ...update } });
          }}
          flyToOptions={flyToState}
          onFlyToChange={(update) => {
            setActionState(DEFAULT_ACTION_STATE);
            handleUpdateSettings({ flyToState: { ...flyToState, ...update } });
          }}
          watermarks={watermarks}
          onWatermarkUpdate={(update) => {
            handleUpdateSettings({
              watermarks: watermarks.map((w) =>
                w.id === update.id ? { ...w, ...update } : w
              ),
            });
          }}
          onWatermarkDelete={(id) => {
            handleUpdateSettings({
              watermarks: watermarks.filter((w) => w.id !== id),
            });
          }}
          onWatermarkAdd={(newWatermark) => {
            const biggestId = watermarks.reduce(
              (id, w) => (w.id > id ? w.id : id),
              0
            );
            handleUpdateSettings({
              watermarks: [
                ...watermarks,
                { id: biggestId + 1, ...newWatermark },
              ].sort((a, b) => a.sortOrder - b.sortOrder),
            });
          }}
        />
      }
    >
      <StyledContent>
        <div className="map-container">
          {token ? (
            <TPSMap
              onLevelChange={(level) => {
                handleUpdateSettings({ level });
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
                      setWheelchairs={(update) => {
                        handleUpdateSettings({
                          wheelchairs: { ...wheelchairs, ...update },
                        });
                      }}
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
