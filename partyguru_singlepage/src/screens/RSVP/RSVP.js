import React from 'react'
import {useState} from 'react'
import {makeStyles, Button, Checkbox, FormControlLabel} from '@material-ui/core'
import createSpacing from '@material-ui/core/styles/createSpacing'
import "./RSVP.css"

const useStyles= makeStyles((theme) => ({
    buttons: {
        //padding: '10px 10px',
        //paddingTop: '10px',
        //paddingBottom: '10px',
        //padding: theme.spacing(3),
        margin: '10px',
    },
}))

const RSVP = () => {

    const [checked, setChecked] = useState({
        attending: false,
        notattending: false,
    })
    const [gamingspecs, setSpecs] = useState({
        gameinstalled: false,
        gamenotinstalled: false,
        discordinstalled: false,
        discordnotinstalled: false,
    })
    //const [attending, changeAttending] = useState(true)
    //const [notattending, changeNotAttending] = useState(false)

    //äääääääää

    const handleGamingSpecChange= (event) => {
        console.log(event.target.name, " has changed its state to", event.target.checked)
        setSpecs({ ...gamingspecs, [event.target.name]: event.target.checked})
    }

    const handleChange = (event) => {
        console.log(event.target.name)
        //setChecked(event.target.checked)
        setChecked({ ...!checked, [event.target.name]: event.target.checked})
    };

    const classes = useStyles()

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
            <div className="infofield">
                <p>Special considerations about your child:</p>

            </div>
            <div className="gamingspecscontainer">
                <p className="infoparagraph">Your gaming device information:</p>
                <p className="installedparagraph">Installed</p>
                <p className="notinstalledparagraph">Not installed</p>
                <div><FormControlLabel className="gameinstalledcheckbox"
                    label="Amongs Us"
                    control={<Checkbox name="gameinstalled" onChange={handleGamingSpecChange}/>}
                /></div>
                <div><FormControlLabel className="discordinstalledcheckbox"
                    label="Discord"
                    control={<Checkbox name="discordinstalled" onChange={handleGamingSpecChange}/>}
                /></div>
                <div><Checkbox className="discordnotinstalledcheckbox" name="discordnotinstalled" onChange={handleGamingSpecChange}/></div>
                <div><Checkbox className="gamenotinstalledcheckbox" name="gamenotinstalled" onChange={handleGamingSpecChange}/></div>
            </div>
            <Button className={classes.buttons} variant="contained" color="primary" href="/">Send</Button>
            <div><Button className={classes.buttons} variant="outlined">More information</Button></div>
            <div className="faqGrid">
                <h2>Frequently asked questions</h2>
                <p>How do I join a Party Guru party?</p>
                <p>What kind of qualifications do Party Guru have?</p>
                <p>What is Discord and how do I get there?</p>
                <p>What is Minecraft?</p>
            </div>

        </div>
    )
}

export default RSVP