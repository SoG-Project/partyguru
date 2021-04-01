import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { SettingsInputAntenna } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: "2rem",
    margin: "3px",
    minWidth: "60%",
    maxWidth: "60%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const AttendeeNumberSelector = () => {
  const classes = useStyles();
  const [guests, setGuests] = React.useState(0);

  const handleChange = (event) => {
    setGuests(event.target.value);
  };
  return (
    <div>
      <Grid container>
        <FormControl className={classes.formControl}>
          <InputLabel id="party-participants">
            Number of party participants
          </InputLabel>
          <Select
            labelId="party-participants"
            id="party-participants"
            value={guests}
            onChange={handleChange}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </div>
  );
};
export default AttendeeNumberSelector;
