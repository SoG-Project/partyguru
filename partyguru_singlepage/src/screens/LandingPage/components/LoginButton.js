import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  //const returnURL = props.URL

  const [returnURL, changeReturnURL] = React.useState(props.URL)

  useEffect(() => {
    changeReturnURL(props.URL)
    console.log("ReturnURL on ", returnURL)
  }, [props])

  return <button onClick={() => loginWithRedirect({returnTo: returnURL})}>Log In</button>;
};

export default LoginButton;