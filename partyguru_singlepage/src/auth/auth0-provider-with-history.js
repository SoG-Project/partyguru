import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  /*const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };*/

  const onRedirectCallback = appState => {
    console.log("APPSTATE ON ", appState)
    appState && appState.targetUrl 
        ? console.log("APPSTATE & TARGETURL EXIST") :
          console.log("APPSTATE & TARGETURL DONT EXIST")
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
        //window.location.href = "http://localhost:3000"
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;