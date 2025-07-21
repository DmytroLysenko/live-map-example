// ---> Venue Map Component
import TPSMap from "./components/TPSMap";
export * from "./components/TPSMap/types";
export default TPSMap;

// For the dev only
import { renderApp } from "./dev/devApp";
renderApp();
