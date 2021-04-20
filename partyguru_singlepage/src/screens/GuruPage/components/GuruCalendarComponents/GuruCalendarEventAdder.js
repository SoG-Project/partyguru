import React, {useState, useEffect} from "react";
import '../GuruCalendar.css';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({

    dialogTitle: {
        fontSize: '20px'
    },
    dialogActions:{
        alignSelf: 'center'
    },
    dialogContentText:{
        fontSize: '15px'
    }




}));

const GuruCalendarEventAdder = (props) => {

    const classes = useStyles()

    return(
        <div>
        <Dialog open={props.open} onClose={props.onClose} eventStart={props.eventStart} eventEnd={props.eventEnd}>
            <DialogTitle disableTypography={true} className={classes.dialogTitle}>Confirm unavailability</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.dialogContentText}>
            {"Are you unavailable from " + props.eventStart + ' to ' + props.eventEnd + '?'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.addEvent} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    )


};
export default GuruCalendarEventAdder