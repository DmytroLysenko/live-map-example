import ReactDOM from "react-dom/client";

import TPSMapApp from "./dev/components/TPSMapApp";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(<TPSMapApp />);
