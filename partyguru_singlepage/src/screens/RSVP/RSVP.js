import React from 'react'
import {useState} from 'react'
import {Button, Checkbox, FormControlLabel} from '@material-ui/core'
import { STATES } from 'mongoose'

const RSVP = () => {

    const [checked, setChecked] = useState({
        attending: false,
        notattending: false,
    })
    //const [attending, changeAttending] = useState(true)
    //const [notattending, changeNotAttending] = useState(false)

    //äääääääää

    const handleChange = (event) => {
        console.log(event.target.name)
        //setChecked(event.target.checked)
        setChecked({ ...!checked, [event.target.name]: event.target.checked})
    };

    return(
        <div>
            <h1>Invitation</h1>
            <div className="invitationinfo">
                <p>You’re invited to Sander Grander’s 
                    online birthday party 
                    on 26.3.21 16.00-18.00!
                    We will play Among Us.
                </p>
                <label>
                    <input type="checkbox"></input>
                    I will attend
                </label>
                <label>
                    <input type="checkbox"></input>
                    I can't attend
                </label>
            </div>
            <div>
                <FormControlLabel
                    control={<Checkbox checked={checked.attending} onChange={handleChange} name="attending"/>}
                    label="I will attend"
                />
            </div>
            <div>
                <FormControlLabel className="indiciso"
                    control={<Checkbox checked={checked.notattending} onChange={handleChange} name="notattending"/>}
                    label="I can't attend"
                />
            </div>

            <Button variant="contained" color="primary" href="/">Send</Button>

        </div>
    )
}

export default RSVP