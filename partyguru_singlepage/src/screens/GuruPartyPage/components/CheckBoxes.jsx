import React from "react";
import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  makeStyles,
  FormControlLabel,
  Checkbox,
  Divider,
  FormGroup,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  checkBoxText: {
    fontSize: "1.7rem",
    fontWeight: 600,
  },
}));

const CheckBoxes = (props) => {
  const [checkBoxInfo, changeCheckBoxInfo] = useState(props.checkboxarray);

  const classes = useStyles();

  //console.log("Checkboxarray on ", checkBoxInfo);

  //This useEffect is the key to making checkBoxInfo work.
  useEffect(() => {
    changeCheckBoxInfo(props.checkboxarray);
  }, [props]) 

  return (
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
              {checkBoxInfo.map((x, i) => {
                return (
                  <FormControlLabel
                    disabled
                    control={<Checkbox />}
                    checked={true}
                    label={
                      <Typography className={classes.checkBoxText}>
                        {x}
                      </Typography>
                    }
                  />
                );
              })}
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default CheckBoxes;
