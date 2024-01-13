import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/mulish"; // Defaults to weight 400.
import { SWRConfig } from "swr";

const local_storage_key = "app-cache";

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(
    JSON.parse(localStorage.getItem(local_storage_key) || "[]")
  );

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem(local_storage_key, appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <SWRConfig value={{ provider: localStorageProvider }}>
        <App />
      </SWRConfig>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
