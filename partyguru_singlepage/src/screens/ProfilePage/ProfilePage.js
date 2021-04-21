// src/views/profile.js

import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LandingPage/components/LoginButton";
import LogoutButton from "../LandingPage/components/LogoutButton";

const Profile = () => {
  //Let's extract these functions/booleans from auth0
  const { user, isAuthenticated, isLoading } = useAuth0();

  //isLoading simply sees if auth0 is still loading elements.
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    {/*"Simple" if-statement: if user is authenticated through auth0, then the following will be rendered.*/},
    isAuthenticated && (<div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: "1%", marginBottom: "1%"}}>
        <LogoutButton />
      </div>
    </div>)
  );
};

export default Profile;