import React, { useEffect, useState } from "react";
import "./CreatePartyPage.css";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Paper,
  Tooltip,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ContactInfoFieldsPartyPage from "./components/ContactInfoFieldsPartyPage";
import Attendees from "./components/Attendees";
import GameInfo from "./components/GameInfo";
import CheckBoxes from "./components/CheckBoxes";
import axios from "axios";
import UniqueLink from "./components/UniqueLink";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { user } = useAuth0();
  const [thisParty, setThisParty] = useState([]);
  const [partyPackage, setPartyPackage] = useState();
  const [partyDescription, setPartyDescription] = useState("");
  const [partyHeroInfo, setPartyHeroInfo] = useState("");
  const [partyHeroLikes, setPartyHeroLikes] = useState([]);
  const [guestsInvited, setGuestsInvited] = useState(false);

  //This useState keeps track of all the name+email fields. The fields in guestion contain the information about the invitees
  //the customer wants to invite to the party.  Emailfields are stored inside an array. The array contains the client name
  //and email.

  useEffect(() => {
    // Finding the party with userid that matches the user's id
    user &&
      axios.get(`/api/parties/`).then((response) => {
        setThisParty(response.data.find((party) => party.userid === user.sub));
        // Also getting the party package name from its ID
        axios
          .get(
            `/api/packages/${
              response.data.find((party) => party.userid === user.sub).packageid
            }`
          )
          .then((response) => {
            setPartyPackage(response.data);
          });
      });
  }, [user]);

  useEffect(() => {
    setPartyDescription(thisParty.description);
    setPartyHeroInfo(thisParty.partyheroinfo);
    setPartyHeroLikes(thisParty.likes);
  }, [thisParty]);

  const updateParty = () => {
    axios
      .put(`/api/parties/${thisParty._id}`, {
        likes: partyHeroLikes,
        description: partyDescription,
        partyheroinfo: partyHeroInfo,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

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
            setPartyDescription={setPartyDescription}
            partyDescription={partyDescription}
          />
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
      <div className={classes.mainContainer}>
        {/*Creates a grid to display the schedule for the party
          Schedule displays things that are meant to be done 
          at the party like "Brithday Cheer", "Eat cake", 
          "Play Minecraft"*/}
        <Typography variant="h3">Schedule</Typography>
        <Grid
          container
          justify="flex-start"
          direction="row"
          style={{ marginBottom: "6rem", marginTop: "3rem" }}
        >
          {partyPackage &&
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
                    value={partyHeroInfo}
                    onChange={(event) => setPartyHeroInfo(event.target.value)}
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
            <CheckBoxes
              partyPackage={partyPackage}
              partyHeroLikes={partyHeroLikes}
              setPartyHeroLikes={setPartyHeroLikes}
            />
          </Grid>
        </Grid>
        <div
          style={{
            borderBottom: "dashed",
            borderColor: "orange",
            marginBottom: "1%",
            marginTop: "1%",
          }}
        />
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="row"
          style={{ marginTop: "1%" }}
        >
          <Grid item xs={7} style={{ marginLeft: "4%" }}>
            <UniqueLink
              partyID={thisParty._id}
              setGuestsInvited={setGuestsInvited}
            />
          </Grid>

          <Grid item xs={3} align="center" style={{ marginRight: "10%" }}>
            <Typography style={{ fontSize: "1.5rem" }}>
              Click the button below once you are done entering information to
              go view your party page.
            </Typography>
            
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                href={"/partyPage/" + thisParty._id}
              >
                To Party Page
              </Button>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreatePartyPage;
