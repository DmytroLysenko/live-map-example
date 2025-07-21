import ReactDOM from "react-dom/client";

import TPSMapApp from "./dev/components/TPSMapApp";

export function renderApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(<TPSMapApp />);
}
