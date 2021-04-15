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
  },
  attendeeBox: {
    width: "20%",
  },
}));

const Attendees = () => {
  const classes = useStyles();

  const [attendees, changeAttendees] = useState([
    { name: "Jarkko", attends: "unknown" },
    { name: "Jarkko", attends: "unknown" },
    { name: "Jarkko", attends: "unknown" },
    { name: "Jarkko", attends: "unknown" },
    { name: "Jarkko", attends: "unknown" },
  ]);

  return (
    <div>
      <Paper elevation={4} className={classes.attendeeBox}>
        <Grid container direction="row">
          <Grid item xs={8}>
            <Typography className={classes.attendeeText}>
              {attendees[attendees.length - 1].name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {/*VerticalAlign doesn't work atm!*/}
            <Typography className="tooltip" style={{ verticalAlign : "center", marginTop: "4px"}}>
              <HelpIcon fontSize="large" />
              <span className="tooltiptext">Unknown</span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Attendees;
