import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

//These are secrets your code should never have in its code!
//They are found in the .env file in partyguru_singlepage.
//Auth0 needs these variables to work.
const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  //We use history to push you in to a page with the page's URL. Essentially,
  //history.push tells "go to this address".
  const history = useHistory();

  //Once you are logged in/signed up, auth0 will call this function to redirect
  //you to a page.
  const onRedirectCallback = appState => {
    console.log("APPSTATE ON ", appState)
    //history.push will allow React to "push" you to an address in the website.
    //appState is recorded in the LoginButton component. targetURL will be the
    //screen URL you logged in from. This comparison statement will check if
    //an appState exists, If so, it will redirect to the screen you left from.
    //If not, it should redirect you to the main page. Please be advised this
    //history.push method requires you to have a Router (do NOT have nested
    //routers such as one Router component in index.js and one Router in App.js,
    //since that makes, IIRC, two seperate history objects). History object is
    //declared in index.js and this code needs that history object to work.
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
        //window.location.href = "http://localhost:3000"
    );
  }

  //redirectUri is the address auth0 defaults to after login if no other page is
  //specified.
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