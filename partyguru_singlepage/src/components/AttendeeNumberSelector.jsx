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

const AttendeeNumberSelector = (props) => {
  //Utilize material ui styles created in makeStyles
  const classes = useStyles();
  //State for number of party participants
  /* const [participants, setParticipants] = React.useState(1); */

  //Blur happens if you input a value less than 0 or greater than 30 in the selection field
  //Blur will set the value to the minimum (0) or maximum (30), depending on where the limit was overlapped
  const handleBlur = () => {
    if (props.participants < 1) {
    props.setParticipantAmount(1);
  } else if (props.participants > 30) {
    props.setParticipantAmount(30);
  }
};

  //update number of participants in PartyPackage.js state, this will update price of party in CostCalculator
  const handleChange = (event) => {
    props.setParticipantAmount(event.target.value);
  };

  return (
    <Grid container justify="center" direction="column">
      <Typography variant="h4">Enter number of attendees</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="party-participants">
          <Typography style={{ fontSize: "1.5rem"}}>
            Participants
          </Typography>
        </InputLabel>
        <Input
          value={props.participants}
          margin="dense"
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          style={{width:"6rem"}}
          inputProps={{
            step: 1,
            min: 1,
            max: 30,
            type: "number",
            style: { fontSize: "2rem", marginLeft:"1vw" },
          }}
        />
      </FormControl>
    </Grid>
  );
};
export default AttendeeNumberSelector;
