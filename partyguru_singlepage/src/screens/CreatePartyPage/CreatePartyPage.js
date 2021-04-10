import React from "react";
import { useState } from "react";
import "./CreatePartyPage.css";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";

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
  checkBoxText:{
    color: "white",
    fontSize: "1.2rem",
  },
  button: {
    fontSize: "1.7rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

const CreatePartyPage = () => {
  //This useState keeps track of all the name+email fields. The fields in guestion contain the information about the invitees
  //the customer wants to invite to the party.  Emailfields are stored inside an array. The array contains the client name
  //and email.
  

  const classes = useStyles();
  return (
    <div>
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
      <div className={classes.mainContainer}>
        {/*Creates a grid to display the schedule for the party
          Schedule displays things that are meant to be done 
          at the party like "Brithday Cheer", "Eat cake", 
          "Play Minecraft"*/}
        <div>Schedule</div>
        <div className="schedulebox">
          <div className="schedulecomponent">Minecraft</div>
          <div>Birthday Cheer</div>
          <div>Minecraft mod 1</div>
          <div>Eat cake</div>
          <div>Minecraft mod 2</div>
        </div>
        {/*Available activities for the party package*/}
        <div>Available activities</div>
        <div className="schedulebox">
          <div>Minecraft</div>
          <div>Birthday Cheer</div>
          <div>Minecraft mod 1</div>
          <div>Eat cake</div>
          <div>Minecraft mod 2</div>
        </div>

        <div className="infoGrid">
          <div className="partyheroinfo">
            <h2>Party Hero info</h2>
            <p>
              Please input information about the party hero so the Party Guru
              can provide a customized experience
            </p>
          </div>
          {/*Checkboxes for what the child likes
            CHECK TUTORIAL: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
            */}

          <Grid
            container
            direction="column"
            style={{
              backgroundColor: "#8f00e2",
              padding: "2rem",
              margin: "10px",
            }}
          >
            <Grid item>
              <Typography variant="h4" style={{color:"white"}}>Likes about Minecraft</Typography>
            </Grid>
            <Grid item>
              <FormGroup column>
                <FormControlLabel
                  control={<Checkbox color="primary" name="Checkboxtest" />}
                  label={<Typography className={classes.checkBoxText}>TNT</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" name="Checkboxtest" />}
                  label={<Typography className={classes.checkBoxText}>Cats</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" name="Checkboxtest" />}
                  label={<Typography className={classes.checkBoxText}>Dogs</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" name="Checkboxtest" />}
                  label={<Typography className={classes.checkBoxText}>Griefing</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox color="primary" name="Checkboxtest" />}
                  label={<Typography className={classes.checkBoxText}>Co-op</Typography>}
                />
              </FormGroup>
            </Grid>
          </Grid>
          <div className="checkboxarea">
            <h2 className="checkboxtitle">Likes about Minecraft</h2>
            <label className="container">
              TNT
              <input type="checkbox"></input>
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Cats
              <input type="checkbox"></input>
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Dogs
              <input type="checkbox"></input>
              <span className="checkmark"></span>
            </label>
            <label className="container">
              Griefing
              <input type="checkbox"></input>
              <span className="checkmark"></span>
            </label>
            <label className="container">
              CO-OP
              <input type="checkbox"></input>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>

       
        <Button className={classes.button} variant="contained" color="primary">
          To invitation creation
        </Button>
      </div>
    </div>
  );
};

export default CreatePartyPage;
