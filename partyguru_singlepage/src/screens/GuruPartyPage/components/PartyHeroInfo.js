import React from 'react'
import { useState } from 'react'
import {
    makeStyles,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box,
  } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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

const PartyHeroInfo = () => {

    const classes = useStyles()

    const [partyheroinfo, changePartyHeroInfo] = useState("Display information about the Party hero here")

    const handlePartyHeroInfoChange = (event) => {
        let info = event.target.value
        changePartyHeroInfo(info)
    }

    return(
        <Grid container direction="column" >
          <Grid item>
            <Grid container direction="row">
              <Grid item xs={4} style={{ paddingTop: "20px", paddingLeft: "20px"}}>
                <Typography className={classes.bigtext} variant="h2">
                  Party hero info
                </Typography>
              </Grid>
              <Grid item xs={8} style={{ paddingTop: "20px", paddingLeft:"20px"}}>
                <Typography variant="h4">Likes about Minecraft</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid  container direction="row" alignItems="stretch" /*style={{border:"3px solid cyan"}}*/>
              <Grid item xs={4} className={classes.test}>
                <Box boxShadow={5}>
                  <TextField
                    id="phitext"
                    fullWidth
                    multiline
                    rows={6}
                    value={partyheroinfo}
                    inputProps={{
                      style: { fontSize: "2rem", lineHeight: "150%" },
                    }}
                    //variant="outlined"
                    onChange={handlePartyHeroInfoChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} className={classes.test}>
                <Grid
                  container
                  direction="column"
                  style={{
                    marginLeft: "30px",
                    width: "30%",
                  }}
                >
                  <Box boxShadow={6} style={{ padding: "20px" }}>
                    <Grid item></Grid>
                    <Grid item>
                      <FormGroup column>
                        <FormControlLabel
                          control={<Checkbox name="Checkboxtest" />}
                          label={
                            <Typography className={classes.checkBoxText}>
                              TNT
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={<Checkbox name="Checkboxtest" />}
                          label={
                            <Typography className={classes.checkBoxText}>
                              Cats
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={<Checkbox name="Checkboxtest" />}
                          label={
                            <Typography className={classes.checkBoxText}>
                              Dogs
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={<Checkbox name="Checkboxtest" />}
                          label={
                            <Typography className={classes.checkBoxText}>
                              Griefing
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          control={<Checkbox name="Checkboxtest" />}
                          label={
                            <Typography className={classes.checkBoxText}>
                              Co-op
                            </Typography>
                          }
                        />
                      </FormGroup>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    )
}

export default PartyHeroInfo