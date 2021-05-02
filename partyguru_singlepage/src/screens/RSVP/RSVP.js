import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import "./RSVP.css";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "1rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
  bigButtons: {
    margin: "10px",
    minWidth: "80px",
    minHeight: "40px",
    fontSize: "1.2rem",
  },
  radioFont: {
    fontSize: "2rem",
  },
  checkBoxPaper: {
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "15px",
    margin: "5px",
  },
  textField: {
    fontSize: "2rem",
    marginBottom: "15px",
  },
  FAQText: {
    fontSize: "1.6rem",
  },
  accordionHeader: {
    backgroundColor: "#f1961d",
  },
}));

const RSVP = () => {
  const [thisParty, setThisParty] = useState("")
  const [partyPackage, setPartyPackage] = useState()
  const attendeeID = Math.floor(Math.random() * 10000).toString()
  //This state controls the attending/not attending radio buttons.
  const [value, setValue] = useState("true");
  const [specialConsiderations, setSpecialConsiderations] = useState("");
  const [nickName, setNickName] = useState("");
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

  useEffect( () => {
    const newPartyID = window.location.href.split("RSVP/").pop()
    axios.get(`/api/parties/${newPartyID}`).then((response) => {
      setThisParty(response.data)

      axios.get(`/api/packages/${response.data.packageid}`).then(response => {
        setPartyPackage(response.data)
        console.log("pPackage" + response.data)
      })

    })
  }, [])

  /*
  const onChangeHandler = (event) = {
    setSpecialConsiderations()
  }
*/
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

  const saveInformation = () => {
    console.log("Starting saveinformation");
    var attending = false;
    if (value === "true") {
      attending = true;
    }
    const attendeeJSON = {
      attendees: [
        {
          _id: attendeeID,
          game: gamingspecs.gameinstalled,
          discord: gamingspecs.discordinstalled,
          attends: attending,
          considerations: specialConsiderations,
          name: nickName,
        },
      ],
    };
    console.log(attendeeJSON);
    axios
      .put("http://localhost:5000/api/attendees/" + thisParty._id, attendeeJSON)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <div className={classes.root}>
      <Typography variant="h1">{partyPackage && partyPackage.name} Invitation</Typography>
      <Typography paragraph variant="body1" style={{ fontSize: "2rem" }}>
        {thisParty.description}
      </Typography>

      <Grid container direction="row">
        <Grid item xs={12} md={6} lg={4}>
          <FormControl required component="fieldset">
            <FormLabel
              component="legend"
              className={classes.radioFont}
              style={{ marginBottom: "3px", color: "black" }}
            >
              Can you attend this party? We need to know if you're attending so our party guru can prepare properly!
            </FormLabel>
            <RadioGroup
              aria-label="attending"
              name="attending"
              style={{width:"50%"}}
              value={value}
              onChange={handleChange}
            >
              <Paper style={{ margin: "5px", paddingLeft: "5px" }}>
                <FormControlLabel
                  value="true"
                  control={<Radio color="secondary" />}
                  label={
                    <Typography className={classes.radioFont}>
                      I can attend
                    </Typography>
                  }
                />
                <br/>
                <FormControlLabel
                  value="false"
                  control={<Radio color="secondary" />}
                  label={
                    <Typography className={classes.radioFont}>
                      I cannot attend
                    </Typography>
                  }
                />
              </Paper>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item md={9} lg={10} />
      </Grid>

      <Grid container direction="row">
        <Grid item xs={6} lg={6}>
          <Typography gutterBottom style={{ fontSize: "2rem", marginTop: "3vh" }}>
            Any information entered here will only be seen by the Party Guru hosting this party and will not be visible to other guests.
            Enter any special information the guru might need to know about the participant:
          </Typography>
        </Grid>
        <Grid item xs={6} lg={6} />

        <Grid item xs={6} lg={4}>
          <TextField
            className={classes.textField}
            onChange={(e) => setSpecialConsiderations(e.target.value)}
            multiline
            fullWidth
            rows={3}
            rowsMax={5}
            id="namefield"
            label={
              <Typography className={classes.radioFont}>
                Enter info here
              </Typography>
            }
            color="secondary"
            variant="outlined"
            inputProps={{
              maxLength: 300,
              style: { fontSize: "2rem", lineHeight: "150%" },
            }}
          />
        </Grid>

        

        <Grid item xs={6} lg={8} />
      </Grid>

      <Grid container direction="row">
        <Grid item xs={6} lg={6}>
          <Typography gutterBottom style={{ fontSize: "2rem", marginTop: "3vh" }}>
            Enter your nickname that you will be using at the party:
          </Typography>
        </Grid>
        <Grid item xs={6} lg={6} />

        <Grid item xs={6} lg={4}>
          <TextField
            className={classes.textField}
            onChange={(e) => setNickName(e.target.value)}
            multiline
            fullWidth
            rows={3}
            rowsMax={1}
            id="namefield"
            label={
              <Typography className={classes.radioFont}>
                Enter the nickname here
              </Typography>
            }
            color="secondary"
            variant="outlined"
            inputProps={{
              maxLength: 30,
              style: { fontSize: "2rem", lineHeight: "150%" },
            }}
          />
        </Grid>

        

        <Grid item xs={6} lg={8} />
      </Grid>

      <Grid container justify="center" alignItems="center" direction="column" style={{marginBottom:"1%"}}>
      <Typography style={{fontSize:"2rem", width:"60%", marginTop:"1%"}}>Information about your device and installed programs is helpful to ensure a smooth party experience. If you are lacking any of the items you should install them before the party.</Typography>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          direction="row"
          style={{
            backgroundColor: "orange",
            width: "75%",
            borderTopStyle: "solid",
            borderLeftStyle: "solid",
            borderRightStyle: "solid",
            borderWidth: "2px",
          }}
        >
          <Grid item xs={4}>
            <Typography align="center" variant="h4" style={{ margin: "2px" }}>
              Device information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="h4">
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
            width: "75%",
            borderStyle: "solid",
            borderWidth: "2px",
          }}
        >
          <Grid item xs={4}>
            <Typography align="center" style={{ fontSize: "2rem" }}>
              {partyPackage && partyPackage.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div align="center">
              <FormControlLabel
                label={
                  <Typography className={classes.radioFont}>
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
                  <Typography className={classes.radioFont}>
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
            width: "75%",
            borderLeftStyle: "solid",
            borderBottomStyle: "solid",
            borderRightStyle: "solid",
            borderWidth: "2px",
            marginBottom: "5px",
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
                  <Typography className={classes.radioFont}>
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
                  <Typography className={classes.radioFont}>
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

      <Button
        className={classes.bigButtons}
        variant="contained"
        color="primary"
        //href="/"
        onClick={() => {
          saveInformation();
        }}
      >
        Save selections
      </Button>

      <Button
        className={classes.bigButtons}
        variant="contained"
        color="secondary"
      >
        More information
      </Button>

      <Button
        className={classes.bigButtons}
        variant="contained"
        color="primary"
        href={"/partyPage/" + thisParty._id}
      >
        I've already enrolled, just show me the party info
      </Button>

      <Button
        onClick={() => {
          console.log(gamingspecs);
        }}
      >
        Show specs debug
      </Button>
      
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ paddingTop: "20px", width: "60%" }}
      >
        <Grid item xs={12}>
          <Divider />
          <Typography variant="h3" paragraph>
            Frequently Asked Questions
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                How do I join a party?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Install thingies and join online when the time is right and the
                full moon shines.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                What kind of qualifications do Party Gurus have?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                What is Discord and how do I install it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              className={classes.accordionHeader}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.FAQText}>
                What is {partyPackage && partyPackage.name} and how do I install it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.FAQText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default RSVP;
