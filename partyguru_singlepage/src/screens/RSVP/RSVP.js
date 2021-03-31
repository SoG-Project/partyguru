import React from "react";
import { useState } from "react";
import {
  makeStyles,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  TextField,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import "./RSVP.css";

const useStyles = makeStyles((theme) => ({
  root:{
    paddingLeft:"1rem",
    paddingRight: "1rem"
  },
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
  textfielderino: {
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "50%",
    maxHeight: "50%",
    fontSize: "2rem",
    marginBottom: "15px",
  },
}));

const RSVP = () => {
  //This state controls the attending/not attending radio buttons.
  const [value, setValue] = useState("true");

  //This state controls checkbox states. Example: if game (e.g. Minecraft) is installed, then user clicks on the game is installed checkbox.
  //This checkbox method is to guide the client to installing what they need to prepare for a smooth party experience. Preferably,
  //the checkboxes should not allow checking both installed and not installed on the same property (e.g. discord). Also, it would
  //be beneficial to offer instructions on how to install them (e.g. official Minecraft/Discord FAQ)
  const [gamingspecs, setSpecs] = useState({
    gameinstalled: false,
    gamenotinstalled: false,
    discordinstalled: false,
    discordnotinstalled: false,
  });

  //This changes the state of the gaming specs checkboxes
  const handleGamingSpecChange = (event) => {
    console.log(
      event.target.name,
      " has changed its state to",
      event.target.checked
    );
    setSpecs({ ...gamingspecs, [event.target.name]: event.target.checked });
  };

  //This changes the state of the attending/not attending checkbox. ERROR: doing ...!checked changes
  //the component from controlled to uncontrolled. ...checked means it will fill out all the checked
  //object information. ...!checked flips the state from true to false and the other way around
  //but it messes with the object causing a lengthy error.
  const handleChange = (event) => {
    if (event.target.value === value) {
      console.log("Value not changed");
      return;
    } else {
      console.log("Value changed to", event.target.value);
      setValue(event.target.value);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Invitation</Typography>
      <Typography paragraph variant="body1" style={{ fontSize: "2rem" }}>
        You’re invited to Sander Grander’s online birthday party on 26.3.21
        16.00-18.00! We will play Among Us.
      </Typography>

      <Grid container direction="row">
        <Grid item xs={6} md={3} lg={3}>
          <Paper
            elevation={3}
            className={classes.checkBoxPaper}
            style={{ padding: "10px" }}
          >
            <FormControl required component="fieldset">
              <FormLabel
                component="legend"
                className={classes.checkBoxFont}
                style={{ marginBottom: "3px", color: "black" }}
              >
                Can you attend this party?
              </FormLabel>
              <RadioGroup
                aria-label="attending"
                name="attending"
                value={value}
                onChange={handleChange}
              >
                <Paper style={{ margin: "5px", paddingLeft: "5px" }}>
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label={
                      <Typography className={classes.checkBoxFont}>
                        I can attend
                      </Typography>
                    }
                  />
                </Paper>

                <Paper style={{ margin: "5px", paddingLeft: "5px" }}>
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label={
                      <Typography className={classes.checkBoxFont}>
                        I cannot attend
                      </Typography>
                    }
                  />
                </Paper>
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item md={9} lg={10} />
      </Grid>

      <Grid container direction="row">
        <Grid item xs={6} lg={4}>
          <Typography style={{ fontSize: "2.5rem", marginTop: "3vh" }}>
            Special considerations about your child:
          </Typography>
        </Grid>
        <Grid item xs={6} lg={8}/>

        <Grid item xs={6} lg={4}>
          <TextField
            className={classes.textfielderino}
            multiline
            fullWidth
            rows={3}
            rowsMax={5}
            id="namefield"
            label={
              <Typography className={classes.textfielderino}>Enter info here</Typography>
            }
            color="secondary"
            variant="outlined"
            inputProps={{ maxLength:300, style: { fontSize: "2rem", lineHeight:"150%" } }}
          />
        </Grid>
        
        <Grid item xs={6} lg={8}/>
      </Grid>

      <Grid container justify="center" alignItems="center" direction="column">
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction="row"
          style={{
            backgroundColor: "orange",
            width: "75%",
            borderStyle: "solid",
            borderWidth: "2px",
            borderBottomColor: "white",
          }}
        >
          <Grid item xs={4}>
            <Typography align="center" variant="h4" style={{margin:"2px"}}>
              Device information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="h4" >
              Installed
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="h4">
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
            borderLeftStyle: "solid",
            borderBottomStyle: "solid",
            borderRightStyle: "solid",
            borderWidth: "2px",
            borderBottomColor: "white",
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
            borderLeftStyle: "solid",
            borderBottomStyle: "solid",
            borderRightStyle: "solid",
            borderWidth: "2px",
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
    </div>
  );
};

export default RSVP;
