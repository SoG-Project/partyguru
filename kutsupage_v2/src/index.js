import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
    <style>{'body { background-color: darkorange; }'}</style>
  </StrictMode>,
  rootElement
);
