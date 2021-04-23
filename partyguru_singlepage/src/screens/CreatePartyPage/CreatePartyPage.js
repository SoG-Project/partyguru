import React, {useEffect, useState} from "react";
import "./CreatePartyPage.css";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ContactInfoFieldsPartyPage from "./components/ContactInfoFieldsPartyPage";
import Attendees from "./components/Attendees";
import GameInfo from "./components/GameInfo";
import CheckBoxes from "./components/CheckBoxes"
import axios from "axios";
import Linkki from "./components/link"

const useStyles = makeStyles(() => ({
  margin: {
    margin: "theme.spacing(2)",
    borderRadius: 35,
  },
  root: {
    flexGrow: 1,
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
    fontSize: "1.2rem",
  },
  button: {
    fontSize: "1.7rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

const CreatePartyPage = () => {
  const partyID = "605f8bcd8dfd970aa770584a";
  const [thisParty, setThisParty] = useState([])
  //This useState keeps track of all the name+email fields. The fields in guestion contain the information about the invitees
  //the customer wants to invite to the party.  Emailfields are stored inside an array. The array contains the client name
  //and email.

  /* const saveAttendees = ()=>{
    //Construct array out of the names and emails
    var attendeeArray=[];
    emailfields.map(attendee =>{
      var singleAttendee={
        name:attendee.clientName,
        email:attendee.clientEmail
      };
      attendeeArray.push(singleAttendee);
    })
    var sendableJSON={
      partyid: partyID,
      attendees: attendeeArray
    };
    axios.post(`http://localhost:5000/api/attendees`,sendableJSON).then(response => {
      console.log(response.data);
    })
  }
*/
  useEffect(() => {
    axios.get(`/api/parties/${partyID}`).then((response) => {
      setThisParty(response.data);
      console.log(response.data)
    });
  }, []);


  const classes = useStyles();
  return (
    <div className="root">
      <div className="partyguruinfobox">
        <Grid container direction="column" alignItems="center">
          <Typography variant="h2">Party Guru</Typography>
          <Typography variant="h5" gutterBottom>
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

      <Grid container direction="row">
        <Grid item xs={5}>
          <GameInfo />
        </Grid>
        <Grid item xs={5}>
          <Attendees />
        </Grid>
      </Grid>
      <div className={classes.mainContainer}>
        {/*Creates a grid to display the schedule for the party
          Schedule displays things that are meant to be done 
          at the party like "Brithday Cheer", "Eat cake", 
          "Play Minecraft"*/}
        <Typography variant="h5">Schedule</Typography>
        <Grid
          container
          justify="space-around"
          direction="row"
          style={{ backgroundColor: "orange", marginBottom: "1rem" }}
        >
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>Minecraft</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>
              Birthday Cheer
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>
              Minecraft Mod 1
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>Eat Cake</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>
              Minecraft Mod 2
            </Typography>
          </Grid>
        </Grid>

        {/*Available activities for this party pack*/}
        <Typography variant="h5">Available activities</Typography>
        <Grid
          container
          justify="space-around"
          direction="row"
          style={{ backgroundColor: "orange" }}
        >
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>Minecraft</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>
              Birthday Cheer
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>
              Minecraft mod 1
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>Eat cake</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "1.5rem" }}>
              Minecraft Mod 2
            </Typography>
          </Grid>
        </Grid>

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
                    Special considerations about your child
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
                    label={
                      <Typography style={{ fontSize: "2rem" }}>
                        Enter info here
                      </Typography>
                    }
                    variant="outlined"
                    inputProps={{
                      maxLength: 300,
                      style: { fontSize: "2rem", lineHeight: "150%" },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <CheckBoxes/>
          </Grid>
        </Grid>

        <ContactInfoFieldsPartyPage />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          href="/invitetoparty"
        >
          To invitation creation
        </Button>
        {/*<Button className={classes.button} variant="contained" color="primary" onClick={()=>{saveAttendees()}}>
          Save attendees
        </Button>
          */} 
        <Linkki></Linkki>
      </div>
    </div>
  );
};

export default CreatePartyPage;
