import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import App from './App';
import 'fontsource-roboto';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
  domain="dev-721af4og.eu.auth0.com"
  clientId="DGNR4tVH0Vb99jJwzzFIfzXwQ5nqILPk"
  redirectUri={window.location.origin}
>
  <React.StrictMode>
    
    <ThemeProvider theme = {theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
