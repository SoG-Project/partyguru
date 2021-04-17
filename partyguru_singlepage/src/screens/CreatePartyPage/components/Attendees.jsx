import React from 'react'
import { useState } from 'react'
import {Paper, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles ((theme) => ({
    attendeeText: {
        fontSize: "2rem"
    },
    attendeeBox: {
        width: "auto"
    }
}))

const Attendees = () => {

    const classes = useStyles()

    const [attendees, changeAttendees] = useState([
        {name: "Jarkko", attends: "unknown"},
        {name: "Jarkko", attends: "unknown"},
        {name: "Jarkko", attends: "unknown"},
        {name: "Jarkko", attends: "unknown"},
        {name: "Jarkko", attends: "unknown"}
    ])

    

    return(
        <div>
            <Paper>
                <Typography className={classes.attendeeText}>{attendees[attendees.length-1].name}</Typography>
            </Paper>

        </div>
    )
}

export default Attendees