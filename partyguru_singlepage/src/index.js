import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import App from './App';
import 'fontsource-roboto';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
  <BrowserRouter>
  <Auth0ProviderWithHistory
  domain="dev-721af4og.eu.auth0.com"
  clientId="DGNR4tVH0Vb99jJwzzFIfzXwQ5nqILPk"
  redirectUri="http://localhost:3000"
>
  <React.StrictMode>
    
    <ThemeProvider theme = {theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);
