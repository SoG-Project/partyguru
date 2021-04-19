import React from "react";
import { useState, useEffect } from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  boldtext: {
    fontWeight: 600,
    fontSize: "2rem",
  },
  gameinfotext: {
    fontSize: "2rem",
  },
  gridbox: {
    margin: theme.spacing(2),
  },
  maincontainer: {
    margin: "2%",
  },
}));

const GameInfo = () => {
  const [partyinfo, changePartyInfo] = useState("");

  useEffect(() => {}, []);

  const classes = useStyles();

  return (
    <div className={classes.maincontainer}>
      <Typography variant="h1">Minecraft Party</Typography>
      <Typography className={classes.gameinfotext}>Martti's BD party is on the internet this time! We're going to play Minecraft mods and sing a song</Typography>
      <Grid className={classes.gridbox} container direction="row">
        <div>
          <Typography className={classes.boldtext}>Date:</Typography>
          <Typography className={classes.boldtext}>Time:</Typography>
          <Typography className={classes.boldtext}>Game:</Typography>
          <Typography className={classes.boldtext}>Attendees:</Typography>
        </div>
        <div style={{marginLeft: "2%"}}>
          <Typography className={classes.gameinfotext}>26.4.2021</Typography>
          <Typography className={classes.gameinfotext}>14.00-16.00</Typography>
          <Typography className={classes.gameinfotext}>Minecraft</Typography>
          <Typography className={classes.gameinfotext}>6</Typography>
        </div>
      </Grid>
    </div>
  );
};

export default GameInfo;
