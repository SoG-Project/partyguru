import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  //const returnURL = props.URL

  const [returnURL, changeReturnURL] = React.useState(props.URL);

  useEffect(() => {
    changeReturnURL(props.URL);
    console.log("ReturnURL on ", returnURL);
  }, [props, returnURL]);

  //appState is used to call loginWithRedirect with a return URL. With auth0ProviderWithHistory we can
  //essentially record the screen URL you started the login from (appState targetURL) and then redirect
  //you back to the page you logged in from.
  return(<button onClick={() => loginWithRedirect({ appState: { targetUrl: window.location.pathname } })}>Log In</button>)
  //return(<button onClick={() => loginWithRedirect({ appState: { targetUrl: returnURL } })}>Log In</button>)
};

export default LoginButton;