import React from 'react'
import { useState, useEffect } from 'react'
import {Paper, Typography} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const GameInfo = () => {

    const [partyinfo, changePartyInfo] = useState("")

    useEffect(() => {
        
    }, [])

    return(
        <div>
            <Typography>Date:</Typography>
            <Typography>Time:</Typography>
            <Typography>Game:</Typography>
            <Typography>Attendees:</Typography>

        </div>
    )
}

export default GameInfo