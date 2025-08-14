import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ResetScroll from "./Utils/ResetScroll.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ResetScroll />
      <App />
    </BrowserRouter>
  </StrictMode>
);
