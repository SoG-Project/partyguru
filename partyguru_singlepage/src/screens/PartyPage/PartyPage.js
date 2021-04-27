import React, { useState, useEffect } from "react";
import { makeStyles, Typography} from "@material-ui/core";
import axios from "axios";
import "./PartyPage.css";
import ContactCard from "./ContactCard";
import {
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GameInfo from "../CreatePartyPage/components/GameInfo"
import Attendees from "../GuruPartyPage/components/Attendees"
import CheckBoxes from "../GuruPartyPage/components/CheckBoxes"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "theme.spacing(2)",
    borderRadius: 35,
  },
  grid: {
    flexGrow: 1,
  },
  textfielderino: {
    padding: "",
    /*minWidth: "20%",
    maxWidth: "20%",*/ 
    fontSize: "2rem",
  },
  resize: {
    fontSize: "2rem",
  },
  giveextraspace: {
    marginBottom: "2rem",
    marginTop: "2rem",
  },
  mainContainer: {
    padding: "1rem",
    margin: "1rem",
  },
  checkBoxText: {
    color: "white",
    fontSize: "1.2rem",
  },
  button: {
    fontSize: "1.7rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

/**
 
 */

//Screen for party page and it's contents
const PartyPage = () => {
  
  const [partyID, changePartyID] = useState("605f8bcd8dfd970aa770584b")
  const [party, setParty] = useState({});
  const [checkBoxInfo, changeCheckBoxInfo] = useState([])
  const [attendeeInfo, changeAttendeeInfo] = useState([])


  const getData = () => {
    //axios gets the partypack
    axios.get(`/api/parties/${partyID}`).then((response) => {
      setParty(response.data);
      changeCheckBoxInfo(response.data.likes)
      console.log("GPP checkboxinfo on ", checkBoxInfo )
    });
  };

  useEffect(() => {
    //getData gets partypack in question.
    getData();
    //If you console.log here, it will not display the response gotten from the server since further code is being executed
    //already since code is async. That means console log here is pointless. Try console.log in .then() function in getData()
    //console.log(description, " is the description")
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Grid container="row">
        <Grid item xs={6}>
          <GameInfo />
        </Grid>
        <Grid item xs={6}>
          <Attendees attendeeinfo={attendeeInfo}/>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={6}>
          <CheckBoxes checkboxarray={checkBoxInfo}/>
        </Grid>
      </Grid>
      
    </div>
  );
};
export default PartyPage;