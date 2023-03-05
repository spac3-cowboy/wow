import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { PeerProvider } from "./contexts/Peer";
import { Provider } from 'react-redux'
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <PeerProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Provider store={store}>
  <App />
        </Provider>
      
      </MantineProvider>
    </PeerProvider>
  </>
);
