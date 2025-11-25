import ReactDOM from "react-dom/client";
import { Provider } from "jotai";
import "./styles.css";
import "./appStyles.css";
import "@onlocation/tps-map/dist/index.css";

import MapApp from "./MapApp";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider>
    <MapApp />
  </Provider>
);
