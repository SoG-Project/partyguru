import React from 'react';
import {useState} from 'react'
import {Link} from "react-router-dom";
import "./CreatePartyPage.css"
import {
  makeStyles, 
  TextField, 
  Typography,
  } from '@material-ui/core'
/*import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircle from '@material-ui/icons/AccountCircle'*/
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme) => ({
  textfielderino: {
    padding: '',
    minWidth: '20%',
    maxWidth: '20%',
    fontSize: "2rem",
  },
  resize: {
    fontSize: "2rem",
  }
}))

const CreatePartyPage = () => {

  const [guestName, changeName] = useState("Teppo Tapani")

  const classes = useStyles()
    return(
        <div>
          <div className ="partyguruinfobox">
            <h1>Party Guru</h1>
            <p>
                Our Party Gurus host the most awesome parties for partiers of any age.<br/>
                Parties are hosted on the Discord voice application and in various games <br/>
                available in our selection. <br/>
                Choose your package and get partying. Do it now!<br/>
                <br/>
            </p>
          </div>
          
          {/*Creates a grid to display the schedule for the party
          Schedule displays things that are meant to be done 
          at the party like "Brithday Cheer", "Eat cake", 
          "Play Minecraft"*/}
          <div>Schedule</div>
          <div className="schedulebox">
            <div className="schedulecomponent">Minecraft</div>
            <div>Birthday Cheer</div>
            <div>Minecraft mod 1</div>
            <div>Eat cake</div>
            <div>Minecraft mod 2</div>
          </div>
          {/*Available activities for the party package*/}
          <div>Available activities</div>
          <div className="schedulebox">
            <div>Minecraft</div>
            <div>Birthday Cheer</div>
            <div>Minecraft mod 1</div>
            <div>Eat cake</div>
            <div>Minecraft mod 2</div>
          </div>

          <div className="infoGrid">

            <div className="partyheroinfo">
              <h2>Party Hero info</h2>
              <p>Please input information about the party hero so the Party Guru can provide a customized experience</p>
            </div>
            {/*Checkboxes for what the child likes
            CHECK TUTORIAL: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
            */}
            <div className="checkboxarea">
              <h2 className="checkboxtitle">Likes about Minecraft</h2>
              <label className="container">TNT
                <input type="checkbox"></input>
                <span className="checkmark"></span>
              </label>
              <label className="container">Cats
                <input type="checkbox"></input>
                <span className="checkmark"></span>
              </label>
              <label className="container">Dogs
                <input type="checkbox"></input>
                <span className="checkmark"></span>
              </label>
              <label className="container">Griefing
                <input type="checkbox"></input>
                <span className="checkmark"></span>
              </label>
              <label className="container">CO-OP
                <input type="checkbox"></input>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>

          <div>
            <h2>Guest contacts</h2>
              <div className="namefield">
                <TextField
                  className={classes.textfielderino}
                  id="namefield"
                  label={<Typography className={classes.textfielderino}>Name</Typography>}
                  color="secondary"
                  variant="outlined"
                  /*inputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}
                  inputProps={{style: {fontSize: "2rem"}}}*/
                  InputProps={{style: {fontSize: "2rem"}, 
                  /*startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )*/}}
                />
              </div>
              <div className="emailfield">
                <TextField
                  className={classes.textfielderino}
                  id="namefield"
                  label={<Typography className={classes.textfielderino}>Email</Typography>}
                  color="secondary"
                  variant="outlined"
                  /*inputProps={{
                    classes: {
                      input: classes.resize,
                    },
                  }}*/
                  inputProps={{style: {fontSize: "2rem"}}}
                />
              </div>
              <div className="plusbutton">
                <Icon className="fa fa-plus-circle" style={{color: "orange"}}/>
              </div>
              <div>
                <p>Plusnappi</p>
              </div>
            {/*<FormControl>
              <InputLabel htmlFor="component-simple">Guest name</InputLabel>
              <Input id="component-simple" value={guestName} onChange={changeName}></Input>
            </FormControl>*/}
            
          </div>
          
          <Link className="invitetopartylink" to ="/invitetoparty">To invitation creation</Link> 
          
          </div>
    )
}

export default CreatePartyPage