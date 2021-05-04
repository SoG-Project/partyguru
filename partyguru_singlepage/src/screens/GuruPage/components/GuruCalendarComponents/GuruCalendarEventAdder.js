import React, {useState} from "react";
import '../GuruCalendar.css';
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel,
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
    const [recurring, setRecurring] = useState(false)


    const handleChecked = (event) => {
        setRecurring(event.target.checked)
    }

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
                <FormControlLabel style={{marginTop: "10px", marginLeft: "10px"}} control={<Checkbox checked={recurring} onChange = {handleChecked}/>}
                label="Set this time as unavailable for the next 10 weeks?">
                </FormControlLabel>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" color="primary">Cancel</Button>
                <Button onClick={()=> { props.addEvent(eventTitle, recurring); setEventTitle("Unavailable")} } variant="contained" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    )


};
export default GuruCalendarEventAdder