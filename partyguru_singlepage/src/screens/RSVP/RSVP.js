import React from "react";
import { useState } from "react";
import {
  makeStyles,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import createSpacing from "@material-ui/core/styles/createSpacing";
import "./RSVP.css";

const useStyles = makeStyles((theme) => ({
  buttons: {
    margin: "10px",
  },
  checkBoxFont: {
    fontSize: "2rem",
  },
  checkBoxPaper: {
    padding: "5px",
    margin: "5px",
    width: "20vw",
    elevation: "3",
  },
}));

const RSVP = () => {
  const [checked, setChecked] = useState({
    attending: false,
    notattending: false,
  });
  const [gamingspecs, setSpecs] = useState({
    gameinstalled: false,
    gamenotinstalled: false,
    discordinstalled: false,
    discordnotinstalled: false,
  });
  //const [attending, changeAttending] = useState(true)
  //const [notattending, changeNotAttending] = useState(false)

  //äääääääää

  const handleGamingSpecChange = (event) => {
    console.log(
      event.target.name,
      " has changed its state to",
      event.target.checked
    );
    setSpecs({ ...gamingspecs, [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    console.log(event.target.name);
    //setChecked(event.target.checked)
    setChecked({ ...!checked, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();

  return (
    <div>
      <h1>Invitation</h1>
      <div className="invitationinfo">
        <p>
          You’re invited to Sander Grander’s online birthday party on 26.3.21
          16.00-18.00! We will play Among Us.
        </p>
        {/* Extra checkboxit kommentoitu pois
                <label>
                    <input type="checkbox"></input>
                    I will attend
                </label>
                <label>
                    <input type="checkbox"></input>
                    I can't attend
                </label>
                */}
      </div>
      <Paper className={classes.checkBoxPaper}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.attending}
              onChange={handleChange}
              name="attending"
              icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
              checkedIcon={<CheckBoxIcon fontSize="large" />}
            />
          }
          label={
            <Typography className={classes.checkBoxFont}>
              I will attend
            </Typography>
          }
        />
      </Paper>
      <Paper className={classes.checkBoxPaper}>
        <FormControlLabel
          control={
            <Checkbox
              className={classes.checkBox}
              checked={checked.notattending}
              onChange={handleChange}
              name="notattending"
              icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
              checkedIcon={<CheckBoxIcon fontSize="large" />}
            />
          }
          label={
            <Typography className={classes.checkBoxFont}>
              I can't attend
            </Typography>
          }
        />
      </Paper>
      <Typography style={{ fontSize: "2.5rem" }}>
        Special considerations about your child:
      </Typography>

      <div className="gamingspecscontainer">
        <Typography style={{ fontSize: "2rem" }}>
          Your gaming device information:
        </Typography>
        <Typography style={{ fontSize: "2rem" }}>Installed</Typography>
        <Typography style={{ fontSize: "2rem" }}>Not installed</Typography>
        <div>
          <FormControlLabel
            className="gameinstalledcheckbox"
            label={
              <Typography className={classes.checkBoxFont}>Amogus</Typography>
            }
            control={
              <Checkbox
                name="gameinstalled"
                onChange={handleGamingSpecChange}
                icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                checkedIcon={<CheckBoxIcon fontSize="large" />}
              />
            }
          />
        </div>
        <div>
          <FormControlLabel
            className="discordinstalledcheckbox"
            label={
              <Typography className={classes.checkBoxFont}>Discord</Typography>
            }
            control={
              <Checkbox
                name="discordinstalled"
                onChange={handleGamingSpecChange}
                icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                checkedIcon={<CheckBoxIcon fontSize="large" />}
              />
            }
          />
        </div>
        <div>
          <Checkbox
            className="discordnotinstalledcheckbox"
            name="discordnotinstalled"
            onChange={handleGamingSpecChange}
            icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
            checkedIcon={<CheckBoxIcon fontSize="large" />}
          />
        </div>
        <div>
          <Checkbox
            className="gamenotinstalledcheckbox"
            name="gamenotinstalled"
            onChange={handleGamingSpecChange}
            icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
            checkedIcon={<CheckBoxIcon fontSize="large" />}
          />
        </div>
      </div>
      <Button
        className={classes.buttons}
        variant="contained"
        color="primary"
        href="/"
        style={{minWidth: '80px', minHeight: '40px', fontSize:'1.2rem'}}
      >
        Send
      </Button>
        <Button className={classes.buttons} 
        variant="contained" 
        color="secondary"
        style={{minWidth: '60px', minHeight: '40px', fontSize:'1.2rem'}}>
          More information
        </Button>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" paragraph style={{marginTop:"5px"}}>Frequently Asked Questions</Typography>
        </Grid>

        <Grid item>
          <Typography variant="p1">
              How do I join a party?
            </Typography>
        </Grid>

        <Grid item>
          <Typography variant="p1">
            What kind of qualifications do Party Gurus have?
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="p1">
            What is Discrod and how do I install it?
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="p1">
            What is Minecraft and how do I install it?
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default RSVP;