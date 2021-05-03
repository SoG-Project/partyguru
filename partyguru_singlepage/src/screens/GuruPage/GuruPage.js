import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GuruPage.css";
import "./components/GuruImage";
import GuruImage from "./components/GuruImage";
import GuruInfo from "./components/GuruInfo";
import GuruPartyPackages from "./components/GuruPartyPackages";
import GuruVideo from "./components/GuruVideo";
import GuruAvailability from "./components/GuruAvailability";
import UpcomingParties from "./components/UpcomingParties";
import GuruSmallCalendar from "./components/GuruSmallCalendar";
import { CircularProgress, Typography } from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";

const GuruPage = (props) => {
  const [userProfile, setUserProfile] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth0();


  // Initial useEffect on page load that gets the details of the correct guru based on their user account.
  useEffect(() => {
    const fetchData = async () => {


      isAuthenticated && axios.get(`/api/gurus/`).then((response) => {
        const allGurus = response.data;
          setUserProfile(allGurus.find((guru) => guru.useauthid === user.sub));
      });
    };
    fetchData();
    return () => {
      //
    };
  }, [user]);

  if (isAuthenticated) return (
    <div className="mainContainer">
        <div className="guruGrid">
          <GuruImage guruImage={userProfile.image} guruID={userProfile._id} />
          <GuruInfo
            id={userProfile._id}
            bio={userProfile.bio}
            name={userProfile.name}
            nick={userProfile.nick}
          />
          <GuruPartyPackages guruID={userProfile._id} />
          <GuruVideo video={userProfile.video} guruID={userProfile._id} />
          <GuruSmallCalendar
            guruID={userProfile._id}
            UnavailableDates={userProfile.timeswhenunavailable}
          />
          <GuruAvailability
            id={userProfile._id}
            availability={userProfile.availability}
          />
          <UpcomingParties guruID={userProfile._id} />
        </div>
    </div>
  )
      if (isLoading) return (
          <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                margin:"4%",
              }}
          >
            {/*This area is rendered while the package has not been fetched, usually for a very brief amount of time*/}
            <Typography variant="h4">Page loading...</Typography>
            <CircularProgress
                color="secondary"
                disableShrink
                size="15vh"
                style={{ margin: "3%" }}
            />
            <Typography variant="h4">
              If you see this page for an extended period of time something has
              likely gone wrong.
            </Typography>
          </div>
      )


};
export default GuruPage;
