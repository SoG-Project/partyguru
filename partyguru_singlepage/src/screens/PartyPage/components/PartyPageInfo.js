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

const PartyPageInfo = (props) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    // This little fellow adds a zero to the displayed hours/minutes when required, because JavaScript dates suck.
    const addZero = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

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
        props.date &&
        setTime(
            addZero(newDate.getHours()) + ":" + addZero(newDate.getMinutes())
        );
    }, [props]);

    const classes = useStyles();

    return (
        <div className={classes.mainContainer}>
            <Grid container direction="row" style={{ width: "95vw" }}>
                <Grid container item direction="column" xs={5}>
                    <Grid item>
                        <Typography variant="h1">{props.gameName} Party</Typography>
                        <Typography paragraph className={classes.gameInfoText}>
                            {props.partyDescription}
                        </Typography>

                    </Grid>
                </Grid>
                <Grid
                    className={classes.gridBox}
                    justify="flex-start"
                    alignItems="center"
                    container
                    item
                    direction="row"
                    xs={5}
                >
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

export default PartyPageInfo;
