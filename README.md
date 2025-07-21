# TPS Map Component

TPS Map Component is a React-based extension of the `@onlocation/venue-map` component that simplifies integration with dynamic venue data. This wrapper abstracts the data-fetching logic and automatically loads sections and rows based on a provided venueLayoutId.

Dependencies:

- <strong>React 19</strong>

## Installation

```
npm i @onlocation/tps-map@2.0.0
```

## API

### Map

| Property                   | Description                                                                   | Type                                                                                                                                                                                                                            | Default |
| -------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| venueLayoutId              | Venue Layout ID, defines the backgrounds                                      | `number`                                                                                                                                                                                                                        |
| token\*                    | Required. Token for receiving sections/rows of the specified `venueLayoutId`. | `string`                                                                                                                                                                                                                        | `100%`  |
| level                      | Map Level View                                                                | `row \| section`                                                                                                                                                                                                                |
| items                      | Map Items                                                                     | `MapItem[]`                                                                                                                                                                                                                     | []      |
| height                     | Map height                                                                    | `string \| number`                                                                                                                                                                                                              | `100%`  |
| width                      | Map weight                                                                    | `string \| number`                                                                                                                                                                                                              | `100%`  |
| mapStyles                  | Map CSS styles                                                                | `CSSProperties`                                                                                                                                                                                                                 | {}      |
| containerStyles            | Map Container CSS styles                                                      | `CSSProperties`                                                                                                                                                                                                                 | {}      |
| disablePopups              | If `true` all popups will be disabled                                         | `boolean`                                                                                                                                                                                                                       |         |
| disableTooltips            | If `true` all tooltips will be disabled                                       | `boolean`                                                                                                                                                                                                                       |         |
| bubblingMouseEvents        | If `true`, then all events on the object will be stopped in propagation       | `boolean`                                                                                                                                                                                                                       |         |
| extraContent               | Extra content settings                                                        | `{[key: `top-left \| top-center \| top-right \| middle-left \| middle-center \| middle-right \| bottom-left \| bottom-center \| bottom-right`]?: {component: JSX.Element; wrapperStyles?: CSSProperties; className?: string }}` |
| defaultExtraContentOptions | Default elements settings                                                     | `false \| {zoom?: false; zoomWrapperClassName?: string; level?: false; levelWrapperClassName?: string}`                                                                                                                         |
| markers                    | Map Markers                                                                   | `IMapMarker[]`                                                                                                                                                                                                                  | []      |
| useFlyOn                   | Force the map to fly on                                                       | `["hover" \| "focus" \| "select"]`                                                                                                                                                                                              |
| hoveredItem                | If present the map will make the Item as hovered                              | `IMapItemIdentifies`                                                                                                                                                                                                            |
| focusedItem                | If present the map will make the Item as focused (highest priority)           | `IMapItemIdentifies`                                                                                                                                                                                                            |
| selectedItems              | If present the map will make the Item as selected                             | `IMapItemIdentifies[]`                                                                                                                                                                                                          |
| useMapSelect               | If `true` the map will make a selection instead of focusing                   | `boolean`                                                                                                                                                                                                                       |
| onItemHover                | Map Item hover handler                                                        | `(itemId: IMapItemIdentifies \| undefined) => void \| Promise<void>`                                                                                                                                                            |
| onItemClick                | Map Item click handler                                                        | `(itemId: IMapItemIdentifies) => void \| Promise<void>`                                                                                                                                                                         |
| onItemSelect               | Map Item select handler                                                       | `(itemId: IMapItemIdentifies, itemIds: IMapItemIdentifies[]) => void \| Promise<void>`                                                                                                                                          |
| onZoomChange               | Map Zoom change handler                                                       | `(zoom: number) => void \| Promise<void>`                                                                                                                                                                                       |
| onMapClick                 | Map click handler                                                             | `(point: [number, number]) => void \| Promise<void>`                                                                                                                                                                            |
| onLevelChange              | Map Level change handler                                                      | `(level: row \| section) => void \| Promise<void>`                                                                                                                                                                              |
| mapOptions                 | Map options                                                                   | [Leaflet Map Options](https://leafletjs.com/reference.html#map-option)                                                                                                                                                          |

### MapItem extends IMapItemIdentifies

| Property       | Description                                                                                    | Type                | Default |
| -------------- | ---------------------------------------------------------------------------------------------- | ------------------- | ------- |
| interactive    | If `false`, the layer will not emit mouse events and will act as a part of the underlying map. | `boolean`           | `true`  |
| fillPattern    | The pattern to fill the Item with.                                                             | `hatched \| dotted` |
| activeStyles   | Item styles in active state                                                                    | `ItemStyles`        |
| inactiveStyles | Item styles in inactive state                                                                  | `ItemStyles`        |
| inactiveStyles | Item styles in non-interactive state                                                           | `ItemStyles`        |
| rowTooltip     | Row Tooltip                                                                                    | `JSX.Element`       |
| sectionTooltip | Section Tooltip                                                                                | `JSX.Element`       |

### IMapItemIdentifies

**Note:** The identifiers used are `sectionId`, `rowId`, `sectionName`, `rowName`. If the section/row IDs are missing, the display will be performed by names.

| Property    | Description                 | Type       | Default |
| ----------- | --------------------------- | ---------- | ------- |
| sectionId   | Item Section ID             | `number`   |
| rowId       | Item Row ID                 | `number`   |
| sectionName | Item Section Name           | `string`   |
| rowName     | Item Row Name               | `string`   |
| aliases     | Item Section \| Row Aliases | `string[]` |
| sortOrder   | Item Sort Order             | `string[]` |

### ItemStyles

| Property    | Description           | Type     | Default |
| ----------- | --------------------- | -------- | ------- |
| color       | Border color          | `string` |
| weight      | Border weight         | `number` |
| opacity     | Border opacity, 0...1 | `number` |
| fillColor   | Item color            | `string` |
| fillOpacity | Item opacity, 0...1   | `number` |

### IMapMarker

| Property | Description     | Type               | Default |
| -------- | --------------- | ------------------ | ------- |
| key\*    | Marker Key      | `React.Key`        |
| point\*  | Marker position | `[number, number]` |
| title    | Market title    | `string`           |
| color    | Marker color    | `string`           |
