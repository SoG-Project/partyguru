import React from "react";
import { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
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

const GameInfo = (props) => {

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {

    const newDate = (new Date(props.date))


    props.date && setDate(newDate.getDate() + "." + (newDate.getMonth() + 1) + "." + newDate.getFullYear())
    props.date && setTime(newDate.getHours() + ":" + newDate.getMinutes())
  }, [props]);

  const classes = useStyles();

  return (
    <div className={classes.maincontainer}>
      <Typography variant="h1">{props.gameName} Party</Typography>
      <Typography className={classes.gameinfotext}>Kovakoodattu deskriptioni fortnite partystä. Tähän tarttis varmaan tekstikentän, mutta ei ehkä tämän gameinfo komponentin alle?</Typography>
      <Grid className={classes.gridbox} container direction="row">
        <div>
          <Typography className={classes.boldtext}>Date:</Typography>
          <Typography className={classes.boldtext}>Time:</Typography>
          <Typography className={classes.boldtext}>Game:</Typography>
          <Typography className={classes.boldtext}>Attendees:</Typography>
        </div>
        <div style={{marginLeft: "2%"}}>
          <Typography className={classes.gameinfotext}>{date}</Typography>
          <Typography className={classes.gameinfotext}>{time}</Typography>
          <Typography className={classes.gameinfotext}>{props.gameName}</Typography>
          <Typography className={classes.gameinfotext}>{props.attendees}</Typography>
        </div>
      </Grid>
    </div>
  );
};

export default GameInfo;
