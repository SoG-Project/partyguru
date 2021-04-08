import React, {useEffect, useState} from 'react'
import axios from "axios";
import {
    makeStyles,
    TextField,
    Typography,
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

const ContactCard = (props)=>{
let x=1
let i=2
const classes = useStyles();
return(
  <><Grid item>
  <div className="namefieldtest">
    <TextField
      className={classes.textfielderino}
      name="clientName"
      id="namefieldtest"
      //defaultValue="nmmame"
      fullWidth
      label={
        <Typography className={classes.textfielderino}>
          Name
        </Typography>
      }
      color="secondary"
      variant="outlined"
      InputProps={{ style: { fontSize: "2rem" }, readOnly:true }}
      value={props.x.name}
      
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
      inputProps={{ style: { fontSize: "2rem" }, readOnly:true, }}
      value={props.x.email}
    />
  </div>
</Grid></>
      )
} 
export default ContactCard 