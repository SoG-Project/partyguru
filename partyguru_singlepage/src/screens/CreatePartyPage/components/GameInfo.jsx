import React from "react";
import { useState, useEffect } from "react";
import { Typography, makeStyles, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: 600,
    fontSize: "2rem",
  },
  gameInfoText: {
    fontSize: "2rem",
  },
  gridBox: {
    margin: theme.spacing(2),
  },
  mainContainer: {
    margin: "2%",
  },
}));

const GameInfo = (props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partyDescription, setPartyDescription] = useState("");

  useEffect(() => {
    const newDate = new Date(props.date);

    props.date &&
      setDate(
        newDate.getDate() +
          "." +
          (newDate.getMonth() + 1) +
          "." +
          newDate.getFullYear()
      );
    props.date && setTime(newDate.getHours() + ":" + newDate.getMinutes());
  }, [props]);

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <Grid container direction="row" style={{width:"95vw"}}>
        <Grid container item direction="column" xs={5}>
          <Grid item>
          <Typography variant="h1">{props.gameName} Party</Typography>
          <Typography paragraph className={classes.gameInfoText}>
            Below you can enter a description for your party and review the
            date, time, game, and number of attendees you have input earlier.
            All information below will be visible to guests and the party guru.
          </Typography>

          <TextField
            color="primary"
            onChange={(e) => setPartyDescription(e.target.value)}
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
          /></Grid>
        </Grid>

        <Grid className={classes.gridBox} justify="flex-start" alignItems="center" container item direction="row" xs={5}>
          <Grid item>
            <Typography className={classes.boldText}>Date:</Typography>
            <Typography className={classes.boldText}>Time:</Typography>
            <Typography className={classes.boldText}>Game:</Typography>
            <Typography className={classes.boldText}>Attendees:</Typography>
          </Grid>
          <Grid item style={{ marginLeft: "2%" }}>
            <Typography className={classes.gameInfoText}>{date}</Typography>
            <Typography className={classes.gameInfoText}>{time}</Typography>
            <Typography className={classes.gameInfoText}>
              {props.gameName}
            </Typography>
            <Typography className={classes.gameInfoText}>
              {props.attendees}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GameInfo;
