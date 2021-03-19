import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import "./InviteToParty.css"
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
//import { response } from "express"

import { makeStyles } from '@material-ui/core/styles';

//Function to set style for the email description box (https://material-ui.com/styles/basics/)
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        //margin: theme.spacing(1),
        //This does not handle resizing of the window. Consider adding a hook to handle resize events.
        width: 0.9*window.innerWidth,
      },
    //https://material-ui.com/customization/typography/#responsive-font-sizes
    typography: {
        fontSize: '60rem',
    }
    },
  }));

const InviteToParty = () => {
    
    const classes = useStyles()

    //VAIHTAA DESCRIPTION-KENTÄN TILAA. TÄHÄN KIRJOITETAAN EMAILIN SISÄLTÖ
    const[description, changeDescription] = useState("Please input a party description that will be included in the party invitations by email.");
    //Changes PartyPack state since server requests are asynchronous (e.g., code is being executed before a response is here)
    const[partypack, changePartyPack] = useState();

    useEffect(() => {
        //getData gets partypack in question
        getData()
        console.log(description, " is the description")
      }, [])

    //getData gets the partypack in question from the server
    const getData = () => {
        let id=1;
        axios.get(`/api/parties/${id}`).then(response => {

        //setState(response.data);
        changePartyPack(response.data)
        const {partypack} = response.data

        changeDescription(response.data.description)
        console.log(response.data, " is the partypack fetched in InviteToParty");
        
        //This part could be bugged because partypack useState is not initialized with an empty partypack object and therefore changes to 'undefined'
        console.log(partypack, " is the partypack fetched and stored")
        console.log(response.data.description, " is the description of the partypack")
        changeDescription(response.data.description)
        //changeDescription(response.data.description)
        //changeDescription(partypack.description)
        //return(partypack)
        return(response.data)
    })
    
    }

    //Handles changes to the form
    const handleChange = (event) => {
        changeDescription(event.target.value)
    }

    const handleSubmit = () => {
        return(0)
    }

    return(
    //Classes.root enables the styling for the materialui textField.
    <div className={classes.root}>
        <Link to="/createpartypage">Back</Link>
        <div class="mainheader">
            <h1>Party Package finalization 2/2</h1>
            <p>Personalize party invitations</p>
        </div>
        
        
        <div class="partydescription">
            <h1>Party description</h1>
            {/*This form will be initialized with the description useState. Once the partypack data is fetched from the database, its value will be updated with the
            description field of the partypack object. If you use defaultValue instead of value, it doesn't work due to defaultValue not being updated (somehow).
            */}
            <div className="emaildescription">
                <form >
                    <TextField className="test" id="outlined-basic" defaultValue={description} multiline variant="outlined"/>
                </form>
            </div>
        </div>
        <Link to="/partypage">Send Invites and go to party page</Link>
    </div>
    )
}

export default InviteToParty