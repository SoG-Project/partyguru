import {React, useState, useEffect} from "react";
import Axios from "axios";

import {
  makeStyles,
  TextField,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {shadows} from '@material-ui/system'
import PartyHeroInfo from './components/PartyHeroInfo'
import Attendees from './components/Attendees'
import axios from "axios";
import { isPropsEqual } from "@fullcalendar/react";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "theme.spacing(2)",
    borderRadius: 35,
  },
  grid: {
    flexGrow: 1,
    width: "30%",
  },
  textfielderino: {
    padding: "",
    /*minWidth: "20%",
      maxWidth: "20%",*/
    fontSize: "2rem",
  },
  bigtext: {
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
  checkBoxText: {
    //color: "white",
    fontSize: "1.6rem",
  },
  button: {
    fontSize: "1.7rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  giveheight: {
    height: "50%",
  },
  test: {
    height: "100%"
  },
}));

const GuruPartyPage = (props) => {
  const partyID="605f8bcd8dfd970aa770584b";
  const classes = useStyles();
  const [party, setParty]=useState({});
  const [partyheroinfo, changePartyHeroInfo] = useState("Display information about the Party hero here")

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
    //axios gets the partypack
    axios.get(`/api/parties/${partyID}`).then(response => {

    setParty(response.data);
    changePartyHeroInfo(response.data.partyheroinfo);
    console.log(response.data.partyheroinfo)

})

}


  const handlePartyHeroInfoChange = (event) => {
    let info = event.target.value
    changePartyHeroInfo(info)
  }

  return (
    <div className="maindiv">
      
      <div className="partyguruinfobox">
        <Grid container direction="column" alignItems="center" >
          <Typography variant="h2">Party Guru</Typography>
          <Typography variant="subtitle" gutterBottom>
            Our Party Gurus host the most awesome parties for partiers of any
            age.
            <br />
            Parties are hosted on the Discord voice application and in various
            games <br />
            available in our selection. <br />
            Choose your package and get partying. Do it now!
            <br />
            <br />
          </Typography>
        </Grid>
      </div>
      <Grid
          container
          justify="space-around"
          direction="row"
          alignItems="stretch"
          style={{ marginTop: "2rem", marginBottom: "1rem" }}
        >
          <Grid item xs={5}>
      <Paper elevation={4} style={{ height: "100%" }}>
              <Grid
                container
                item
                direction="column"
                style={{
                  padding: "2rem",
                }}
              >
                <Grid item xs={12}>
                  <Typography gutterBottom paragraph variant="h4">
                    Special considerations about your child
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    color="primary"
                    multiline
                    fullWidth
                    rows={4}
                    rowsMax={5}
                    id="namefield"
                    label={
                      <Typography style={{ fontSize: "2rem" }}>
                        Enter info here
                      </Typography>
                    }
                    variant="outlined"
                    inputProps={{
                      maxLength: 300,
                      style: { fontSize: "2rem", lineHeight: "150%" },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            </Grid>
            </Grid>
      <Attendees/>
      <div>
        
        <PartyHeroInfo description={partyheroinfo}/>
        
      </div>
    </div>
  );
};
export default GuruPartyPage;
