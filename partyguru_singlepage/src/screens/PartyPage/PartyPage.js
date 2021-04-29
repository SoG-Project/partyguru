import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import "./PartyPage.css";
//import ContactCard from "./ContactCard";
import { Avatar, Paper, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GameInfo from "../CreatePartyPage/components/GameInfo";
import Attendees from "../GuruPartyPage/components/Attendees";
import CheckBoxes from "../GuruPartyPage/components/CheckBoxes";
import FAQ from "./components/FAQ";
//import ContactInfoFieldsPartyPage from "../CreatePartyPage/components/ContactInfoFieldsPartyPage";

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
  guruAvatars: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  gurufont: {
    fontSize: "2rem",
    textAlign: "center",
  },
  guruBox: {
    width: "50%",
  },
  contactFields: {
    fontSize: "2rem",
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

/**
 
 */

//Screen for party page and it's contents
const PartyPage = () => {
  const [partyID, changePartyID] = useState("605f8bcd8dfd970aa770584b");
  const [attendeesID, setAttendeeID] = useState("605f8bcd8dfd970aa770584b");
  const [party, setParty] = useState({});
  const [checkBoxInfo, changeCheckBoxInfo] = useState([]);
  const [attendeeInfo, changeAttendeeInfo] = useState([]);
  const [guruid, changeGuruID] = useState();
  const [guru, changeGuru] = useState({});
  const [contactInfo, setContactInfo] = useState();

  const getData = () => {
    //axios gets the partypack
    axios.get(`/api/parties/${partyID}`).then((response) => {
      setParty(response.data);
      changeCheckBoxInfo(response.data.likes);
      setContactInfo({
        email: response.data.email,
        phone: response.data.phone,
        ownername: response.data.ownername
      });

      console.log("GPP checkboxinfo on ", checkBoxInfo);
      console.log("Guruid is ", response.data.guruid);
      changeGuruID(response.data.guruid);
    });
    axios.get(`/api/attendees/${attendeesID}`).then((response) => {
      /* setAttendeeName(response.data.attendees[0].name);
      changeAttendeeInfo(response.data.attendees[0].attends);
      console.log(response.data.attendees[0].name); */
      changeAttendeeInfo(response.data[0].attendees); //if I change this value to anything else it will crash
      //console.log(response.data[0].attendees[0].name)
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log("PP contactInfo is ", contactInfo);
  }, [contactInfo]);

  useEffect(() => {
    console.log("AttendeeInfo is: ", attendeeInfo);
  }, [attendeeInfo]);

  useEffect(() => {
    //getData gets partypack in question.
    getData();
    //If you console.log here, it will not display the response gotten from the server since further code is being executed
    //already since code is async. That means console log here is pointless. Try console.log in .then() function in getData()
    //console.log(description, " is the description")
  }, []);

  //setState is asynchronous, so we need to wait for the
  //guruid to be set.
  useEffect(() => {
    console.log("USEEFFECT GURUID: ", guruid);
    axios.get(`/api/gurus/${guruid}`).then((response) => {
      console.log("Backin gurun data on ", response.data[0]);
      changeGuru(response.data[0]);
      console.log("useStaten gurun data ", guru.image, "gurulle ", guruid);
    });
  }, [guruid]);

  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Grid container="row">
        <Grid item xs={6}>
          <GameInfo />
        </Grid>
        <Grid item xs={6}>
          <Attendees attendeesArray={attendeeInfo} />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={6}>
          <CheckBoxes checkboxarray={checkBoxInfo} />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Paper className={classes.gurubox}>
              <Grid item>
                <Typography className={classes.gurufont} variant="h6">
                  {guru.name}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  alt={guru.name}
                  src={guru.image}
                  className={classes.guruAvatars}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.gurufont} variant="h6">
                  {guru.nick}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4" style={{ marginTop: "2rem" }} >
              Client Information
            </Typography>
          </Grid>
          {contactInfo.name && (
          <Grid item>
            <Paper style={{ width: "50%" }} elevation={4}>
            <TextField
              disabled
              variant="outlined"
              color="primary"
              value={contactInfo.name}
              className={classes.contactFields}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
            </Paper>
          </Grid>)}
          {contactInfo.email && (
          <Grid item>
            <Paper style={{ width: "50%" }} elevation={4}>
            <TextField
              disabled
              variant="outlined"
              color="primary"
              value={contactInfo.email}
              className={classes.contactFields}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
            </Paper>
          </Grid>)}
          {contactInfo.phone && (
          <Grid item>
            <Paper style={{ width: "50%" }} elevation={4}>
            <TextField
              disabled
              variant="outlined"
              color="primary"
              value={contactInfo.phone}
              className={classes.contactFields}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
            </Paper>
          </Grid>)}
      </Grid>
      <FAQ />
    </div>
  );
};
export default PartyPage;
