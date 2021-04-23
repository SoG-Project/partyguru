import React from "react";
import { useState } from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Attendees.css";

const useStyles = makeStyles((theme) => ({
  attendeeText: {
    fontSize: "2rem",
    marginLeft: "10px",
  },
  attendeeBox: {
    width: "40%",
    margin: "2%",
    flex: "1",
    right: "auto",
    //marginLeft makes it so that the element is not right next to the party info.
    //Change this however you will.
    marginLeft: "30%",
  },
}));

const Attendees = (props) => {
  const classes = useStyles();

  const [attendees, changeAttendees] = useState([
    { name: "Alvari", attends: "unknown" },
    { name: "Juho G", attends: "attending" },
    { name: "Juho V", attends: "notattending" },
    { name: "Joonas", attends: "attending" },
    { name: "Pauli", attends: "notattending" },
  ]);

  return (
    <div>
      <Typography className={classes.attendeeBox} variant="h2">Attendees:</Typography>
      {attendees.map((x, i) => {
          return(
            <Paper elevation={4} className={classes.attendeeBox}>
            <Grid container direction="row">
              <Grid item xs={10}>
                <Typography className={classes.attendeeText}>
                  {attendees[attendees.length - 1].name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {/*Hide overflowing text?? https://material-ui.com/system/display/#text-overflow*/}
                {x.attends === "unknown" && (
                <Typography className="tooltip" style={{ marginTop: "4px"}}>
                    <HelpIcon fontSize="large" />
                    <span className="tooltiptext">Unknown</span>
                  </Typography>
                )}
                {x.attends === "attending" && (
                <Typography className="tooltip" style={{ marginTop: "4px"}}>
                    <CheckCircleIcon fontSize="large" />
                    <span className="tooltiptext">Attending</span>
                  </Typography>
                )}
                {x.attends === "notattending" && (
                <Typography className="tooltip" style={{ marginTop: "4px"}}>
                    <HighlightOffIcon fontSize="large" />
                    <span className="tooltiptext">Not Attending</span>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
          )
      })}
    </div>
  );
};

export default Attendees;
