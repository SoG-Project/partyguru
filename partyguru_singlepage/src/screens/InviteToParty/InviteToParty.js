import React, { useState, useEffect, Component } from "react"
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom"
import "./InviteToParty.css"
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";







//import { response } from "express"

import { makeStyles } from '@material-ui/core/styles';
import nodemailer from "nodemailer";

//Function to set style for the email description box (https://material-ui.com/styles/basics/)
const useStyles = makeStyles((theme) => ({
    root: {
      padding:"1rem",
      margin:"1rem",
      '& .MuiTextField-root': {
        //margin: theme.spacing(1),
        //This does not handle resizing of the window. Consider adding a hook to handle resize events. 
        //OR do it with vh (viewheight)
        width: 0.9*window.innerWidth,
      },
    },
    margin: {
      margin: "theme.spacing(2)",
      borderRadius: 35,
    },
    grid: {
      flexGrow: 1,
    },
    textfielderino: {
      padding: "",
      minWidth: "30%",
      maxWidth: "50%",
      fontSize: "2rem",
    },
    resize: {
      fontSize: "2rem",
    },
    giveextraspace: {
      marginBottom: "2rem",
      marginTop: "2rem",
    },
    mainContainer: {
      padding: "1rem",
      margin: "1rem",
    },
    checkBoxText:{
      color: "white",
      fontSize: "1.2rem",
    },
    button: {
      fontSize: "1.7rem",
      marginTop: "2rem",
      marginBottom: "2rem",
    },
  }));

  function PerusTeema(props) {
   return <img src={"https://i.pinimg.com/originals/59/2e/81/592e812f43f66758178347430b992436.png"} />
  }

  function AvaruusTeema(props) {
   return <img src={"https://kjeh.fi/gLuYo"} />
  }

function LiekkiTeema(props) {
  return <img src={"https://kjeh.fi/iKTpb"} />
}

/*Email sending thingy, didn't work yet when tried but will work on it*/
  /*var nodemailer = require('nodemailer') 

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
*/
const InviteToParty = () => {
    
  //This enables materialsUI styles. Normall CSS won't work for materialsUI elements.
    const classes = useStyles()

    //Theme selection IN PROGRESS
const[teema, setTheme]=useState("default")
const handleInviteTheme=(e)=>{
  console.log(e.target.value)
  setTheme(e.target.value)
}

const [emailfields, changeEmailfields] = useState([
  { clientName: "", clientEmail: "" },
]);

//This updates the state with the up-to-date name+email fields.
const handleEmailfieldChange = (e, index) => {
  const { name, value } = e.target;
  const emailfieldscopy = [...emailfields];
  emailfieldscopy[index][name] = value;
  changeEmailfields(emailfieldscopy);
  console.log(name, value);
  console.log(emailfields);
};

//This will update the emailfields array, which in turn will cause the emailfields.map((x, i) => function inside the HTML
//part of the code to "update" the amount of the emailfields. We add empty strings because the client will fill out this information.
const handlePlusButtonClick = () => {
  changeEmailfields([...emailfields, { clientName: "", clientEmail: "" }]);
};

//This will delete the emailfield at the given index of emailfields array. Updating the array will change the useState and then in the
//HTML part of the code the emailfields.map((x, i) => function will "update" the amount of the emailfields.
const handleEmailfieldDelete = (index) => {
  const emailfieldscopy = [...emailfields];
  //Splice removes something at the given index. It will delete x items. Currently we only want to delete 1 item.
  emailfieldscopy.splice(index, 1);
  changeEmailfields(emailfieldscopy);
};

    //This changes the description field where the user will write the contents of the email. 
    const[description, changeDescription] = useState("");
    //Added for the preview feature, copies the user input from the textfield into the preview layout
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
        let id="605f8a595b54c3088fc44d14";
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
                    defaultValue={description} inputProps={{maxLength:180, style:{ fontSize: "2rem", lineHeight: "150%"}}} multiline variant="outlined" onChange={(e) => changeDescription2(e.target.value)}
                    />
                </form>
                
            </div>
        </div>
        <Link to="/partypage">Send Invites and go to party page</Link>
        

        
        {/*Preview feature in progress
        this will preview the users input with an invitation letter layout
        not relative positioned anymore so doesn't break when using different resolution or zooming
        though it's currently standing on top of the bottom bar, making it unclickable, fix this soon
        ADDED PLACEHOLDER FOR THE TIME BEING^*/}
        <h2>Preview testing</h2>
        <div className="preview">
          <div className="invitelayout">
            {/*Tässä pitäisi renderöidä teema*/}

          <LiekkiTeema></LiekkiTeema>
           <div className="invitetitle">
             Kutsu Make Viljami-Macklemoren syntymäpäiväjuhliin
           </div>
           <div className="subtitle">{description2}</div>
          </div>
        </div>
        {/* Radio buttons for the theme selection, don't do anything atm*/}
        <div className="ThemeSelect">
        <h1>Valitse teemasi:</h1>
        <div>
        <span>default</span>
        <Radio
        value="default"
        checked={teema==="default"}        
        color="primary"
        onChange={handleInviteTheme}
        />
        </div>
        <div>
        <span>eeppiset liekit</span>
        <Radio
        value="liekit"
        checked={teema==="liekit"} 
        color="primary"
        onChange={handleInviteTheme}
        />
        </div>  
        <div>
        <span>kiva maisema</span>
        <Radio
        value="maisema"
        checked={teema==="maisema"}        
        color="primary"
        onChange={handleInviteTheme}
        />
        </div>
        </div>
        
        {/*This is on top of the invite preview for some reason
        dunno how to fix it atm */}
        {emailfields.map((x, i) => {
          return (
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="center"
              style={{ marginTop: "30px", marginBottom: "30px" }}
            >
              <Grid container xs={6} spacing={3} direction="column">
                <Grid item>
                  <div className="namefieldtest">
                    <TextField
                      className={classes.textfielderino}
                      name="clientName"
                      id="namefieldtest"
                      fullWidth
                      label={
                        <Typography className={classes.textfielderino}>
                          Name
                        </Typography>
                      }
                      color="secondary"
                      variant="outlined"
                      InputProps={{ style: { fontSize: "2rem" } }}
                      value={x.clientName}
                      onChange={(e) => handleEmailfieldChange(e, i)}
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className="emailfieldtest">
                    <TextField
                      className={classes.textfielderino}
                      name="clientEmail"
                      id="namefieldtest"
                      fullWidth
                      label={
                        <Typography className={classes.textfielderino}>
                          Email
                        </Typography>
                      }
                      color="secondary"
                      variant="outlined"
                      inputProps={{ style: { fontSize: "2rem" } }}
                      onChange={(e) => handleEmailfieldChange(e, i)}
                      value={x.clientEmail}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  className={classes.giveextraspace}
                  onClick={handlePlusButtonClick}
                >
                  <AddCircleIcon fontSize="large" color="primary" />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                {/*Inline if with Logical && operator: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
                 This will allow us to hide the delete button on the first item so at least one emailbox is "visible" at all times.
              */}
                {i !== 0 && (
                  <IconButton
                    onClick={(e) => handleEmailfieldDelete(i)}
                    aria-label="delete"
                    className={classes.margin}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          );
        })}

    </div>
    
    )
    
}

export default InviteToParty

/*todo:
make the theme selection
*/