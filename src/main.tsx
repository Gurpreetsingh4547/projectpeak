import React from "react";

// Packages
import ReactDOM from "react-dom/client";

// Services
import App from "./App.tsx";

// Styles
import "../app/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
