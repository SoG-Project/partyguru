import React from 'react'
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

  const classes = useStyles()


  // Add or remove an item from the partyHeroLikes array of the parent component based on checkbox status
  const handleLikeChange = (i) => {

    if (!props.partyHeroLikes.includes(props.partyPackage.likeableitems[i])) {
      props.setPartyHeroLikes(props.partyHeroLikes.concat(props.partyPackage.likeableitems[i]))
    }

    if (props.partyHeroLikes.includes(props.partyPackage.likeableitems[i])) {
      const filteredLikes = props.partyHeroLikes.filter(item => item !== props.partyPackage.likeableitems[i])
      props.setPartyHeroLikes(filteredLikes)

    }
  }

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
                    Likes about {props.partyPackage && props.partyPackage.name}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item>
                  <FormGroup direction="column">
                    {props.partyPackage && props.partyPackage.likeableitems.map((item, index) =>
                        <FormControlLabel key={item}
                            control={<Checkbox color="primary" name="likecheckbox" checked={props.partyHeroLikes.includes(item)}
                                               onChange={()=>handleLikeChange(index)}/>}
                            label={
                              <Typography className={classes.checkBoxText}>
                                {item}
                              </Typography>
                            }
                        />
                    ) }

                  </FormGroup>
                </Grid>
              </Grid>
            </Paper>
    </div>
  )
}
export default CheckBoxes