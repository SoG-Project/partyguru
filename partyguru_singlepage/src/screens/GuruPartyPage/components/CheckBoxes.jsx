import React from 'react'
import { useState, useEffect } from "react";
import { Paper, Typography, makeStyles, FormControlLabel, Checkbox, Divider, FormGroup } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "theme.spacing(2)",
    borderRadius: 35,
  },
  root: {
    flexGrow: 1,
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
  checkBoxText: {
    fontSize: "1.2rem",
  },
  button: {
    fontSize: "1.7rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

const CheckBoxes = (props) => {

  const [checkBoxes, changeCheckBoxInfo] = useState(props.checkboxarray)

  const classes = useStyles()

  return(
    <div>
      
            <Paper elevation={4} style={{ height: "100%" }}>
              {/*Checkboxes for what the child likes*/}
              <Grid
                item
                container
                direction="column"
                style={{
                  padding: "2rem",
                }}
              >
                <Grid item>
                  <Typography paragraph gutterBottom variant="h4">
                    Likes about Minecraft
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item>
                  <FormGroup direction="column">
                    <FormControlLabel
                      disabled
                      control={<Checkbox name="Checkboxtest" />}
                      label={
                        <Typography className={classes.checkBoxText}>
                          TNT
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox name="Checkboxtest" />}
                      label={
                        <Typography className={classes.checkBoxText}>
                          Cats
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox name="Checkboxtest" />}
                      label={
                        <Typography className={classes.checkBoxText}>
                          Dogs
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox name="Checkboxtest" />}
                      label={
                        <Typography className={classes.checkBoxText}>
                          Griefing
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox name="Checkboxtest" />}
                      label={
                        <Typography className={classes.checkBoxText}>
                          Co-op
                        </Typography>
                      }
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Paper>
    </div>
  )
}
export default CheckBoxes