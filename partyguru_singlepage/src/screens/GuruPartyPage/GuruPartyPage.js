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
  const partyID = "605f8bcd8dfd970aa770584b";
  const attendeesID = "605f8bcd8dfd970aa770584b";
  const classes = useStyles();
  const [party, setParty] = useState({});
  const [guruid, changeGuruID] = useState();
  const [guru, changeGuru] = useState({});
  const [contactInfo, setContactInfo] = useState();
  //Partyheroinfo contains a string with the party hero description (e.g., I want to play Minecraft
  //and blow up castles). This way the client can say they want to do x things and the guru can see
  //these requests.
  const [partyheroinfo, changePartyHeroInfo] = useState(
    "Display information about the Party hero here"
  );
  const [attendeeName, setAttendeeName] = useState([]
  );
  //Creates an empty array to store what the party hero aka the one who bought the
  //party likes. Array with strings.This stores things such as liking cats or dogs
  //in Minecraft so that the Party Guru can make the best party for them possible.
  const [checkBoxInfo, changeCheckBoxInfo] = useState([

  ])

  const [attendees, changeAttendees] = useState([
    
  ])
  const getData = () => {
    //axios gets the partypack
    axios.get(`/api/attendees/${attendeesID}`).then((response) => {
      /* setAttendeeName(response.data.attendees[0].name);
      changeAttendeeInfo(response.data.attendees[0].attends);
      console.log(response.data.attendees[0].name); */
      changeAttendees(response.data[0].attendees)  //if I change this value to anything else it will crash
      console.log(response.data[0].attendees[0].name)
      console.log(response.data);
      console.log("GPP attendeeinfo ", attendees )
      console.log("GPP attendeenames ", attendeeName )
    });
    
    axios.get(`/api/parties/${partyID}`).then((response) => {
      setParty(response.data);
      changeCheckBoxInfo(response.data.likes);
      changePartyHeroInfo(response.data.partyheroinfo);
      setContactInfo({
        email: response.data.email,
        phone: response.data.phone,
        ownername: response.data.ownername
      });
      console.log("Guruid is ", response.data.guruid);
      changeGuruID(response.data.guruid);
      console.log(response.data.partyheroinfo);
      console.log("GPP checkboxinfo on ", checkBoxInfo )
    })
  };


  useEffect(() => {
    //getData gets partypack in question.
    getData();
    //If you console.log here, it will not display the response gotten from the server since further code is being executed
    //already since code is async. That means console log here is pointless. Try console.log in .then() function in getData()
    //console.log(description, " is the description")
  },[])

  //getData gets the partypack in question from the server. axios.get() is an asynchronous function, so anything
  //not in the .then() {} brackets will be executed before we get a response from the server. How far in the code we
  //get depends on the execution time of the get function.

 

  /*const handlePartyHeroInfoChange = (event) => {
    let info = event.target.value;
    changePartyHeroInfo(info);
  };*/

  

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
          <GameInfo />
        </Grid>
        <Grid item xs={6}>
          <Attendees attendeesArray={attendees} />
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
                  value={partyheroinfo}
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
      
      {/*<div>
        <PartyHeroInfo description={partyheroinfo} />
      </div>*/}
      
    </div>
  );
};
export default GuruPartyPage;
