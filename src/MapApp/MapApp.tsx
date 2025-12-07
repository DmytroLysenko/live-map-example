import React, { useEffect, useMemo, useState } from "react";

import TPSMap from "@onlocation/tps-map";
import { Flex } from "antd";
import { OLLogoIcon } from "./Components/Icons";
import Layout from "./Components/Layout";
import { RowTooltip, SectionTooltip } from "./Components/MapTooltip";
import WatermarkSelector from "./Components/WatermarkSelector";
import StyledContent from "./StyledContent";
import TicketsTable from "./Components/TicketsTable";
import MapSettings from "./Components/MapSettings";
import Sidebar from "./Components/Sidebar";

import {
  DEFAULT_ACTION_STATE,
  DEFAULT_MAP_SETTINGS,
  MAP_SETTINGS_STORAGE_KEY,
} from "./constants";
import {
  getSectionAndRowByRowKey,
  getStylesProps,
  getWatermarkByOrderAndSelected,
} from "./utils";

import { useRows } from "./hooks/useRows";
import { useFocusEffect } from "./hooks/useFocusEffest";
import { useSections } from "./hooks/useSections";
import { useInnerFlyOn } from "./hooks/useInnerFlyOn";

import type { IMapItem } from "@onlocation/tps-map";
import { IMapSettings, ItemAction, ITicket, IWatermark } from "./types";
import WheelchairsToggle from "./Components/WheelchairsToggle";

import "leaflet/dist/leaflet.css";
import "leaflet.pattern";
import { useFilteredTickets } from "./hooks/useFilteredTickets";
import { useSelectEffect } from "./hooks/useSelectEffect";

const MapApp = () => {
  const [mapSettings, setSettings] = useState<IMapSettings>(() => {
    try {
      const stored = sessionStorage.getItem(MAP_SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure any new keys get default values
        return {
          ...DEFAULT_MAP_SETTINGS,
          ...parsed,
          level: DEFAULT_MAP_SETTINGS.level,
        } as IMapSettings;
      }
    } catch (_) {
      // swallow parsing errors and fall back to defaults
    }
    return DEFAULT_MAP_SETTINGS;
  });
  const [actionState, setActionState] = useState(DEFAULT_ACTION_STATE);

  const { selectedWatermarks, selected, focus, hover } = actionState;
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

  const isSelectMode = !!selected.length;
  const rows = useRows(tickets);
  const sections = useSections(tickets);
  const innerFlyOn = useInnerFlyOn(flyToState);
  const filteredTickets = useFilteredTickets({
    tickets,
    selectedWatermarks,
    selectedItems: selected,
  });
  // reset focus - only for the fly effect
  useFocusEffect(actionState.focus, () =>
    setActionState((prev) => ({ ...prev, focus: undefined }))
  );
  // auto-switching the selection according to the level
  useSelectEffect(
    level,
    selected,
    (update) => setActionState((prev) => ({ ...prev, selected: update })),
    sections,
    isSelectMode
  );

  const handleUpdateSettings = (update: Partial<IMapSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...update } as IMapSettings;
      try {
        sessionStorage.setItem(MAP_SETTINGS_STORAGE_KEY, JSON.stringify(next));
      } catch (_) {
        // Ignore write errors
      }
      return next;
    });
  };

  const onResetSelection = () =>
    setActionState((prev) => ({
      ...prev,
      selected: DEFAULT_ACTION_STATE.selected,
    }));

  const mapItems = useMemo(() => {
    const mapItems: IMapItem[] = [];
    rows.forEach((rowData, rowKey) => {
      const { tickets: rowTickets, watermarks: rowWatermarks } = rowData;
      const { rowName, sectionName } = getSectionAndRowByRowKey(rowKey) || {};

      if (rowName && sectionName) {
        const {
          tickets: sectionTickets = [],
          watermarks: sectionWatermarks = [],
        } = sections.get(sectionName) || {};

        const watermarks = level === "row" ? rowWatermarks : sectionWatermarks;
        const watermark = getWatermarkByOrderAndSelected(
          watermarks,
          selectedWatermarks
        );

        const isWatermarkSelected =
          !!selectedWatermarks.length &&
          !!selectedWatermarks.find((i) => i.id === watermark?.id);

        const interactive = selectedWatermarks.length
          ? isWatermarkSelected
          : true;
        const stylesProps = getStylesProps({
          fillColor: watermark?.color,
          isSelectMode,
        });
        mapItems.push({
          sectionName: sectionName,
          rowName: level === "row" ? rowName : undefined,
          ...stylesProps,
          interactive: interactive,
          rowTooltip: <RowTooltip tickets={rowTickets} />,
          sectionTooltip: (
            <SectionTooltip
              sectionName={sectionName}
              tickets={sectionTickets}
            />
          ),
        });
      }
    });
    return mapItems;
  }, [rows, sections, level, selectedWatermarks, isSelectMode]);

  const handleHover = (item: ItemAction | undefined) => {
    setActionState((prev) => ({ ...prev, hover: item }));
  };

  const handleDeleteTicket = (id: ITicket["id"]) => {
    handleUpdateSettings({ tickets: tickets.filter((item) => item.id !== id) });
  };

  const handleClick = (item: ItemAction) => {
    setActionState((prev) => ({
      ...prev,
      focus:
        JSON.stringify(item) === JSON.stringify(prev.focus) ? undefined : item,
    }));
  };

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
          onHover={handleHover}
          onClick={handleClick}
          onDeleteTicket={handleDeleteTicket}
          onResetSelection={onResetSelection}
          isSelected={!!actionState.selected.length}
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
              level={level}
              onLevelChange={(level) => {
                handleUpdateSettings({ level });
              }}
              venueLayoutId={
                isNaN(Number(layoutId)) ? undefined : Number(layoutId)
              }
              mapStyles={{ backgroundColor: "white" }}
              extraContent={{
                "bottom-left": {
                  component: (
                    <WatermarkSelector
                      watermarks={watermarks}
                      selectedWatermarks={actionState.selectedWatermarks}
                      onWatermarkChange={(selectedWatermarks) =>
                        setActionState({
                          ...DEFAULT_ACTION_STATE,
                          selectedWatermarks,
                        })
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
                      <OLLogoIcon
                        style={{ width: 16, height: 16, color: "#CCA669" }}
                      />
                    </Flex>
                  ),
                },
              }}
              defaultExtraContentOptions={{
                zoom: { wrapperStyle: { marginLeft: "22px" } },
                level: {
                  extraContent: {
                    right: (
                      <WheelchairsToggle
                        wheelchairs={wheelchairs}
                        setWheelchairs={(update) => {
                          handleUpdateSettings({
                            wheelchairs: { ...wheelchairs, ...update },
                          });
                        }}
                      />
                    ),
                  },
                },
              }}
              token={token}
              wheelchairs={wheelchairs.show}
              wheelchairsByRows={wheelchairs.basedOnRows}
              items={mapItems}
              width={mapSize?.width ? `${mapSize.width}px` : undefined}
              height={mapSize?.height ? `${mapSize.height}px` : undefined}
              useFlyOn={innerFlyOn}
              labelingSettings={
                !labelingByData ? { backgroundLabeling: true } : undefined
              }
              mapOptions={{ preferCanvas: true }}
              disableSelect={false}
              hoveredItem={actionState.hover || undefined}
              focusedItem={actionState.focus || undefined}
              selectedItems={actionState.selected || undefined}
              onItemHover={(item) => {
                handleHover(item);
              }}
              disablePopups={true}
              onItemsSelect={(_, items) => {
                setActionState((prev) => ({ ...prev, selected: items }));
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
            onHover={handleHover}
            onClick={handleClick}
            onDeleteTicket={handleDeleteTicket}
            detailed={false}
            onResetSelection={onResetSelection}
            isSelected={!!actionState.selected.length}
          />
        </div>
      </StyledContent>
    </Layout>
  );
};

export default MapApp;
