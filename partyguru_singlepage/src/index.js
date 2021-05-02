import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import App from "./App";
import "fontsource-roboto";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history'

import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Auth0ProviderWithHistory>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
