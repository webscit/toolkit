import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@webscit/tokens/tokens.css";
import "@webscit/tokens/tokens-dark.css";
import "@webscit/tokens/theme.css";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
