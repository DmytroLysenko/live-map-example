import ReactDOM from "react-dom/client"

// import SimpleLeaflet from "../components/SimpleLeaflet"
// import OLMapApp from "./components/OLMapApp"
import TPSMapApp from "./components/TPSMapApp"
// import VenueMapApp from "./components/VenueMapApp"

export function renderApp() {
  const rootElement = document.getElementById("root")
  if (!rootElement) {
    throw new Error("Root element not found")
  }
  const root = ReactDOM.createRoot(rootElement)
  root.render(<TPSMapApp />)
}
