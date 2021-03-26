import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import "./InviteToParty.css"
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add';



//import { response } from "express"

import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

//Function to set style for the email description box (https://material-ui.com/styles/basics/)
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        //margin: theme.spacing(1),
        //This does not handle resizing of the window. Consider adding a hook to handle resize events. 
        //OR do it with vh (viewheight)
        width: 0.9*window.innerWidth,
      },
    //https://material-ui.com/customization/typography/#responsive-font-sizes
    //Doesn't work: not sure why
    typography: {
        fontSize: '60rem',
    }
    },
  }));


const InviteToParty = () => {
    
  //This enables materialsUI styles. Normall CSS won't work for materialsUI elements.
    const classes = useStyles()

    //This changes the description field where the user will write the contents of the email. 
    const[description, changeDescription] = useState("");
    //Added for the preview feature
    const[description2, changeDescription2] = useState("");
    const[descriptions, changeDescriptions] = useState([]);

    const addDescription = (event) => {
        event.preventDefault();
        changeDescriptions([
          ...descriptions,
          {
            id: descriptions.length,
            name: description
          }
        ]);
        changeDescription("");
      };
    
    //Changes PartyPack state since server requests are asynchronous (e.g., code is being executed before a response is here)
    //This was added to save the partypack object
    const[partypack, changePartyPack] = useState();

    useEffect(() => {
        //getData gets partypack in question.
        getData()
        //If you console.log here, it will not display the response gotten from the server since further code is being executed
        //already since code is async. That means console log here is pointless. Try console.log in .then() function in getData()
        //console.log(description, " is the description")
      }, [])

    //getData gets the partypack in question from the server. axios.get() is an asynchronous function, so anything
    //not in the .then() {} brackets will be executed before we get a response from the server. How far in the code we
    //get depends on the execution time of the get function.
    const getData = () => {
        let id=1;
        //axios gets the partypack
        axios.get(`/api/parties/${id}`).then(response => {

        changePartyPack(response.data)
        const {partypack} = response.data
        //Changes the description in the email
        changeDescription(response.data.description)
        //In case something breaks, this will display the object fetched.
        console.log(response.data, " is the partypack fetched in InviteToParty");
        
        //This part could be bugged because partypack useState is not initialized with an empty partypack object and therefore changes to 'undefined'
        console.log(partypack, " is the partypack fetched and stored")
        console.log(response.data.description, " is the description of the partypack")
        //This changes the useState, therefore re-rendering (making changes visible).
        changeDescription(response.data.description)
        return(response.data)
    })
    
    }

    //Handles changes to the form. The text changes will be rendered because changing useState rerenders
    //the description (the changed text)
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
        
        <div className="mainheader">
            <h1>Party Package finalization 2/2</h1>
            <p>Personalize party invitations</p>
        </div>
        {/*This element contains all the email text to be sent out.*/}
        <div className="partydescription">
            <h1>Party description</h1>
            {/*This form will be initialized with the description useState. Once the partypack data is fetched from the database, its value will be updated with the
            description field of the partypack object. If you use defaultValue instead of value, it doesn't work due to defaultValue not being updated (somehow).
            */}
            <div className="emaildescription">
                <form >
                    <TextField className="test" id="outlined-basic" placeholder="Please input a party description that will be included in the party invitations by email." 
                    defaultValue={description} inputProps={{maxLength:1000}} multiline variant="outlined" onChange={(e) => changeDescription2(e.target.value)}
                    />
                </form>
                
            </div>
        </div>
        <Link to="/partypage">Send Invites and go to party page</Link>
        
        {/*Preview feature in progress
        This only works on a 1920x1080 resolution at the moment, does not also like zooming*/}
        <h2>Preview testing</h2>
        <div className="preview">
          <div className="invitelayout">
           <img src={"https://i.pinimg.com/originals/00/71/3b/00713b61c2ae3b4f244f3ff3fbac2fa9.jpg"} />
           </div>
           <div className="invitetitle">
             Kutsu Make Viljami-Macklemoren syntymäpäiväjuhliin
           </div>
           <div className="subtitle">{description2}</div>
           
        </div>
    </div>
    )
}

export default InviteToParty

/*tee nämä: 
tekstikenttää ei voi klikata tietyn määrän kirjoittamisen jälkeen, joku tukkii sen??

fonttikokoa pitäisi kasvattaa koska nykyinen turhan pieni
^(inputpropsilla ehkä, ei atm toimi laittaa kahta ominaisuutta yhteen propsiin, css?)
*/