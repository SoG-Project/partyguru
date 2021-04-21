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

const GuruCalendarEventDeleter = (props) => {

    const classes = useStyles()

    return(
        <div>
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle disableTypography={true} className={classes.dialogTitle}>Confirm delete</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.dialogContentText}>
            {"Delete this event?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.deleteEvent} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    )


};
export default GuruCalendarEventDeleter