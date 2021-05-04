import React, { useState, useEffect } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import "./PartyPage.css";
//import ContactCard from "./ContactCard";
import { Avatar, Paper, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GameInfo from "../CreatePartyPage/components/GameInfo";
import Attendees from "../GuruPartyPage/components/Attendees";
import CheckBoxes from "../GuruPartyPage/components/CheckBoxes";
import FAQ from "./components/FAQ";
import PartyPageInfo from "./components/PartyPageInfo";
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
    width: theme.spacing(25),
    height: theme.spacing(25),
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

//Screen for party page and it's contents
const PartyPage = () => {

  const [party, setParty] = useState({});
  const [partyPackage, setPartyPackage] = useState({})
  const [checkBoxInfo, changeCheckBoxInfo] = useState([]);
  const [attendeeInfo, changeAttendeeInfo] = useState([]);
  const [guruid, changeGuruID] = useState();
  const [guru, changeGuru] = useState({});
  const [contactInfo, setContactInfo] = useState();


  useEffect( () => {
    let newPartyID = window.location.href.split("partyPage/").pop()
    
    axios.get(`/api/parties/${newPartyID}`).then((response) => {
      setParty(response.data)
      setContactInfo({
        email: response.data.email,
        name: response.data.ownername
      })
      changeGuruID(response.data.guruid);


      axios.get(`/api/packages/${response.data.packageid}`).then(response => {
        setPartyPackage(response.data)
        console.log("pPackage" + response.data)
      })

      axios.get(`/api/attendees/${newPartyID}`).then((response) => {
        /* setAttendeeName(response.data.attendees[0].name);
        changeAttendeeInfo(response.data.attendees[0].attends);
        console.log(response.data.attendees[0].name); */
        changeAttendeeInfo(response.data[0].attendees); //if I change this value to anything else it will crash
        //console.log(response.data[0].attendees[0].name)
        console.log(response.data);
      });

    })
  }, [])

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
          <PartyPageInfo partyDescription={party.description} gameName={partyPackage.name} date={party.datetime}  attendees={party.num_attendees}
          />
        </Grid>
        <Grid item xs={6}>
          <Attendees attendeesArray={attendeeInfo} />
        </Grid>
      </Grid>
      <Typography variant="h3">Schedule</Typography>
      <Grid
          container
          justify="flex-start"
          direction="row"
          style={{ marginBottom: "6rem", marginTop: "3rem" }}
      >
        {partyPackage.scheduleitems &&
        partyPackage.scheduleitems.map((item) => (
            <Grid item xs={2}>
              <Paper style={{backgroundColor: "lightgray", paddingLeft:"4vh", paddingRight:"4vh", paddingBottom:"2vh", paddingTop: "2vh", margin: "1vh"}}>
                <Typography key={item} style={{ fontSize: "1.5rem" }}>
                  {item}
                </Typography>
              </Paper>
            </Grid>
        ))}
      </Grid>

      <Grid container direction="row">
      {contactInfo && (
      <Grid container item xs={6} direction="column" spacing={1} justify="flex-start">
          <Grid item>
            <Typography variant="h3" style={{ marginTop: "2rem" }} >
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
                style: { fontSize: "1.5rem", lineHeight: "150%", color:"black" },
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
                style: { fontSize: "1.5rem", lineHeight: "150%", color:"black" },
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
      </Grid>)}
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
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

      <FAQ gameName={partyPackage.name} />
    </div>
  );
};
export default PartyPage;
