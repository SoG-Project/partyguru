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
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "15px",
    margin: "5px",
  },
}));

const RSVP = () => {
  const [attending, setAttending] = useState(false);
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
    setAttending(!attending);
  };

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h1">Invitation</Typography>
      <Typography paragraph variant="body1" style={{fontSize:"2rem"}}>
        You’re invited to Sander Grander’s online birthday party on 26.3.21
        16.00-18.00! We will play Among Us.
      </Typography>

      <Grid container direction="row">
        <Grid item xs={6} md={3} lg={2}>
          <Paper elevation={3} className={classes.checkBoxPaper}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={attending}
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
        </Grid>
        <Grid item md={9} lg={10} />
        <Grid item xs={6} md={3} lg={2}>
          <Paper elevation={3} className={classes.checkBoxPaper}>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkBox}
                  checked={!attending}
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
        </Grid>
      </Grid>
      <Typography style={{ fontSize: "2.5rem" }}>
        Special considerations about your child:
      </Typography>

      <Grid container justify="center" alignItems="center" direction="column">
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction="row"
          style={{
            backgroundColor: "orange",
            width: "75%",
            borderBottomStyle: "solid",
            borderWidth: "2px",
            borderColor: "white",
          }}
        >
          <Grid item xs={4}>
            <Typography align="center" style={{ fontSize: "2rem" }}>
              Device information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontSize: "2rem" }}>
              Installed
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" style={{ fontSize: "2rem" }}>
              Not installed
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{
            backgroundColor: "purple",
            width: "75%",
            borderBottomStyle: "solid",
            borderWidth: "2px",
            borderColor: "white",
          }}
        >
          <Grid item xs={4}>
            <Typography
              align="center"
              style={{ fontSize: "2rem", color: "white" }}
            >
              Amogus
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div align="center">
              <FormControlLabel
                label={
                  <Typography
                    style={{ color: "white" }}
                    className={classes.checkBoxFont}
                  >
                    Game installed
                  </Typography>
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
          </Grid>
          <Grid item xs={4}>
            <div align="center">
              <FormControlLabel
                className="gamenotinstalledcheckbox"
                label={
                  <Typography
                    style={{ color: "white" }}
                    className={classes.checkBoxFont}
                  >
                    Not installed
                  </Typography>
                }
                control={
                  <Checkbox
                    name="gamenotinstalled"
                    onChange={handleGamingSpecChange}
                    icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                    checkedIcon={<CheckBoxIcon fontSize="large" />}
                  />
                }
              />
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{
            backgroundColor: "orange",
            width: "75%",
          }}
        >
          <Grid item xs={4}>
            <Typography align="center" style={{ fontSize: "2rem" }}>
              Discrod
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div align="center">
              <FormControlLabel
                label={
                  <Typography className={classes.checkBoxFont}>
                    Discord installed
                  </Typography>
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
          </Grid>
          <Grid item xs={4}>
            <div align="center">
              <FormControlLabel
                label={
                  <Typography className={classes.checkBoxFont}>
                    Not installed
                  </Typography>
                }
                control={
                  <Checkbox
                    name="discordnotinstalled"
                    onChange={handleGamingSpecChange}
                    icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                    checkedIcon={<CheckBoxIcon fontSize="large" />}
                  />
                }
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />

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
        style={{ minWidth: "80px", minHeight: "40px", fontSize: "1.2rem" }}
      >
        Send
      </Button>
      <Button
        className={classes.buttons}
        variant="contained"
        color="secondary"
        style={{ minWidth: "60px", minHeight: "40px", fontSize: "1.2rem" }}
      >
        More information
      </Button>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3" paragraph style={{ marginTop: "5px" }}>
            Frequently Asked Questions
          </Typography>
        </Grid>

        <Grid item>
          <Typography>How do I join a party?</Typography>
        </Grid>

        <Grid item>
          <Typography>
            What kind of qualifications do Party Gurus have?
          </Typography>
        </Grid>

        <Grid item>
          <Typography>What is Discord and how do I install it?</Typography>
        </Grid>

        <Grid item>
          <Typography>What is Minecraft and how do I install it?</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default RSVP;
