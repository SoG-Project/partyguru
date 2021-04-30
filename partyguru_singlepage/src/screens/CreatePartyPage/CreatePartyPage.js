import React, { useEffect, useState } from "react";
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
import CheckBoxes from "./components/CheckBoxes";
import axios from "axios";
import Linkki from "./components/UniqueLink";
import UniqueLink from "./components/UniqueLink";
import {useAuth0} from "@auth0/auth0-react";

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

  const {user} = useAuth0()
  const [thisParty, setThisParty] = useState([])
  const [partyPackage, setPartyPackage] = useState()

  //This useState keeps track of all the name+email fields. The fields in guestion contain the information about the invitees
  //the customer wants to invite to the party.  Emailfields are stored inside an array. The array contains the client name
  //and email.


  useEffect(() => {

    // Finding the party with userid that matches the user's id
    user && axios.get(`/api/parties/`).then((response) => {
      setThisParty(response.data.find(party => party.userid === user.sub))
      // Also getting the party package name from its ID
      axios.get(`/api/packages/${response.data.find(party => party.userid === user.sub).packageid}`).then(response => {
        setPartyPackage(response.data)
      })
    })
  }, [user])



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
          <GameInfo
            gameName={partyPackage && partyPackage.name}
            date={thisParty.datetime}
            duration={thisParty.duration}
            attendees={thisParty.num_attendees}
          />
        </Grid>
        <Grid item xs={5}></Grid>
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
          {partyPackage && partyPackage.scheduleitems.map(item =>
                <Typography key={item} style={{ fontSize: "1.5rem" }}>
                  {item}
                </Typography>
                )}

        </Grid>




        <Typography
          gutterBottom
          variant="h4"
          style={{ width: "60%", marginTop: "1%" }}
        >
          Enter information about what your child likes about this game and any
          special considerations related to them. This information will help our
          guru make the party the best possible experience for you and will only
          be visible to the Party Guru.
        </Typography>
        <Grid
          container
          justify="space-around"
          direction="row"
          alignItems="stretch"
          style={{ marginBottom: "1rem" }}
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
                    Special information
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
            <CheckBoxes partyPackage={thisParty.packageid} />
          </Grid>
        </Grid>
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

        <UniqueLink partyID={thisParty._id} />
      </div>
    </div>
  );
};

export default CreatePartyPage;
