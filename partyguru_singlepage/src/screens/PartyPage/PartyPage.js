import { Link } from "react-router-dom"
import React from 'react'
import {makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
      padding: "1rem",
      margin: "1rem",
    },
  }));

//Screen for party page and it's contents
const PartyPage= () => {
    const classes = useStyles();
    return(
        <div className={classes.mainContainer}>
            <Typography variant="subtitle">Page for party page: details, timetable, guru info etc.</Typography>
        </div>
    )
}
export default PartyPage