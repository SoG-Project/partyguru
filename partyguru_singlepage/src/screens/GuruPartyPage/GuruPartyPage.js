import { React, useState, useEffect } from "react";

import {
  makeStyles,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//import PartyHeroInfo from "./components/PartyHeroInfo";
import Attendees from "./components/Attendees";
import CheckBoxes from "./components/CheckBoxes"
import GameInfo from "../CreatePartyPage/components/GameInfo"
import axios from "axios";
import PartyPageInfo from "../PartyPage/components/PartyPageInfo";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "theme.spacing(2)",
    borderRadius: 35,
  },
  grid: {
    flexGrow: 1,
    width: "30%",
  },
  textfielderino: {
    padding: "",
    /*minWidth: "20%",
      maxWidth: "20%",*/
    fontSize: "2rem",
  },
  bigtext: {
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
    //color: "white",
    fontSize: "1.6rem",
  },
  button: {
    fontSize: "1.7rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  giveheight: {
    height: "50%",
  },
  test: {
    height: "100%",
  },
  dividermargin: {
    marginTop: "2vh",
    marginBottom: "4vh",
  },
}));

const GuruPartyPage = (props) => {

  const classes = useStyles();
  const [party, setParty] = useState({});
  const [partyPackage, setPartyPackage] = useState({})
  const [guruid, changeGuruID] = useState();
  const [guru, changeGuru] = useState({});
  const [contactInfo, setContactInfo] = useState();
  //Partyheroinfo contains a string with the party hero description (e.g., I want to play Minecraft
  //and blow up castles). This way the client can say they want to do x things and the guru can see
  //these requests.

  const [attendeeName, setAttendeeName] = useState([]);
  //Creates an empty array to store what the party hero aka the one who bought the
  //party likes. Array with strings.This stores things such as liking cats or dogs
  //in Minecraft so that the Party Guru can make the best party for them possible.
  const [checkBoxInfo, changeCheckBoxInfo] = useState([])

  const [attendees, changeAttendees] = useState([])

  useEffect( () => {
    let newPartyID = window.location.href.split("gurupartypage/").pop()

    axios.get(`/api/parties/${newPartyID}`).then((response) => {
      setParty(response.data)
      setContactInfo({
        email: response.data.email,
        name: response.data.ownername
      })
      changeCheckBoxInfo(response.data.likes)
      changeGuruID(response.data.guruid);


      axios.get(`/api/packages/${response.data.packageid}`).then(response => {
        setPartyPackage(response.data)
        console.log("pPackage" + response.data)
      })

      axios.get(`/api/attendees/${newPartyID}`).then((response) => {
        changeAttendees(response.data[0].attendees);
        console.log(response.data);
      });

    })
  }, [])

  

  return (
    <div className="maindiv">
      <div className="partyguruinfobox">
        <Grid container direction="column" alignItems="center">
          <Typography variant="h2">Party Guru</Typography>
          <Typography variant="subtitle" gutterBottom>
            Our Party Gurus host the most awesome parties for partiers of any
            age.
            <br />
            Parties are hosted on the Discord voice application and in various
            games <br />
            available in our selection. <br />
            Choose your package and get partying. Do it now!
            <br />
            <br />
          </Typography>
        </Grid>
      </div>
    <div className ={classes.mainContainer}>
      {contactInfo && (
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
      </Grid>)}
     </div>
      <Grid container>
        <Grid item xs={6}>
          <PartyPageInfo partyDescription={party.description} gameName={partyPackage.name} date={party.datetime}  attendees={party.num_attendees}/>
        </Grid>
        <Grid item xs={6}>
          <Attendees attendeesArray={attendees} thisIsGuruPage={true} />
        </Grid>
      </Grid>
      <Divider className={classes.dividermargin} />
      <Grid
        container
        justify="space-around"
        direction="row"
        alignItems="stretch"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        <Grid item xs={5}>
          <Paper elevation={4} style={{ height: "100%" }}>
            <Grid
              container
              item
              direction="column"
              style={{
                padding: "2rem",
              }}
            >
              <Grid item xs={12}>
                <Typography gutterBottom paragraph variant="h4">
                  Information about participants
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  color="primary"
                  multiline
                  fullWidth
                  rows={4}
                  rowsMax={5}
                  id="namefield"
                  value={party.partyheroinfo}
                  variant="outlined"
                  inputProps={{
                    readOnly: true,
                    maxLength: 300,
                    style: { fontSize: "2rem", lineHeight: "150%" },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <CheckBoxes checkboxarray={checkBoxInfo}/>
        </Grid>
        
      </Grid>

      
    </div>
  );
};
export default GuruPartyPage;
