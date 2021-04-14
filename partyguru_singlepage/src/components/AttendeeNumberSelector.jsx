import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "2rem",
    margin: "3px",
    minWidth: "80%",
    maxWidth: "80%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "60%",
  },
}));

const AttendeeNumberSelector = () => {
  //Utilize material ui styles created in makeStyles
  const classes = useStyles();
  //State for number of party participants
  const [participants, setParticipants] = React.useState(0);

  //Blur happens if you input a value less than 0 or greater than 30 in the selection field
  //Blur will set the value to the minimum (0) or maximum (30), depending on where the limit was overlapped
  const handleBlur = () => {
    if (participants < 0) {
      setParticipants(0);
    } else if (participants > 30) {
      setParticipants(30);
    }
  };

  const handleChange = (event) => {
    setParticipants(event.target.value);
  };
  return (
    <Grid container justify="center">
      <Typography variant="h4">Enter number of attendees</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="party-participants">
          <Typography style={{ fontSize: "1.5rem", width:"100%" }}>
            Participants
          </Typography>
        </InputLabel>
        <Input
          value={participants}
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          inputProps={{
            step: 1,
            min: 0,
            max: 30,
            type: "number",
            "aria-labelledby": "input-slider",
            style: { fontSize: "2rem", marginLeft:"1vw" },
          }}
        />
      </FormControl>
    </Grid>
  );
};
export default AttendeeNumberSelector;
