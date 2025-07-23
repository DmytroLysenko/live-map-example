import ReactDOM from "react-dom/client";
import './styles.css'

import TPSMapApp from "./TPSMapApp";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);
root.render(<TPSMapApp />);
