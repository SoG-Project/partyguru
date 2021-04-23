import React, {useState, useEffect} from "react";
import '../GuruCalendar.css';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    TextField
} from "@material-ui/core";

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
    },




}));

const GuruCalendarEventAdder = (props) => {

    const classes = useStyles()

    const [eventTitle, setEventTitle]=useState('Unavailable')


    const handleTitleChange = (event) => {
        setEventTitle(event.target.value)
    }

    return(
        <div>
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle disableTypography={true} className={classes.dialogTitle}>Confirm unavailability</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.dialogContentText}>
                    {"Do you wish to set yourself as unavailable to host parties from "  + new Date(props.eventStart) + ' to ' + new Date(props.eventEnd) + '?'}
                </DialogContentText>
                <TextField id="eventTitle" label="Event title (optional)" onChange={handleTitleChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" color="primary">Cancel</Button>
                <Button onClick={()=> { props.addEvent(eventTitle, false); setEventTitle("Unavailable")} } variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    )


};
export default GuruCalendarEventAdder