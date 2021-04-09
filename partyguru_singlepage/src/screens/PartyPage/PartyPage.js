import { Link } from "react-router-dom"
import React, {useState, useEffect} from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import axios from 'axios';
import "./PartyPage.css";
import ContactCard from "./ContactCard"
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
/*import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'*/
import Icon from "@material-ui/core/Icon";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "theme.spacing(2)",
    borderRadius: 35,
  },
  grid: {
    flexGrow: 1,
  },
  textfielderino: {
    padding: "",
    /*minWidth: "20%",
    maxWidth: "20%",*/
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

/**
 

 */

//Screen for party page and it's contents
const PartyPage= () => {

      const [emailFields, setEmailFields] = useState([
        { clientName: "", clientEmail: "" },
      ]);
      const[attendees, setAttendees] = useState([{}])
    const [partyState, setPartyState] = useState({})
    let partyID="605f8bcd8dfd970aa770584a"
    // Initial useEffect on page load that gets the details of the correct party
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`/api/parties/`).then(response => {
                console.log(response.data)
                const allParties = response.data
                setPartyState(allParties.find(party => party._id === partyID))
            })
            axios.get(`/api/attendees/`).then(response => {
              console.log(response.data)
              const allAttendees = response.data
              setAttendees(allAttendees.find(attendee => attendee.partyid === partyID))
              console.log(allAttendees.find(attendee => attendee.partyid === partyID))
          })
          }
        fetchData();
        return () => {
            //
        };
    }, []);

/*
    useEffect(() => {
        setGuruImage(props.guruImage)
        setNewGuruImageAddress(props.guruImage)
    }, [props]);
*/

/*
    //This will delete the emailfield at the given index of emailfields array. Updating the array will change the useState and then in the
    //HTML part of the code the emailfields.map((x, i) => function will "update" the amount of the emailfields.
    const handleEmailfieldDelete = (index) => {
      const emailfieldscopy = [...emailfields];
      //Splice removes something at the given index. It will delete x items. Currently we only want to delete 1 item.
      emailfieldscopy.splice(index, 1);
      changeEmailfields(emailfieldscopy);
    };
*/
    const classes = useStyles();
    return(
        <div className={classes.mainContainer}>
            <Typography variant="subtitle">Page for party page: details, timetable, guru info etc.</Typography>
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            style={{ marginTop: "30px", marginBottom: "30px" }}
            >
            <Grid container xs={6} spacing={3} direction="column">
            <Grid>
{/*
            {attendees.attendees.map(item=>{
              return <ContactCard x={item}></ContactCard>
            })}
          */}
            </Grid>
            </Grid>
          </Grid>
        
      
        </div>
    )
        }
export default PartyPage