import { Grid, Typography, makeStyles, TextField } from "@material-ui/core";
import React from "react";

//Create material ui styles
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

//Calculator to calculate cost of party based on its options
//Props should contain information about party (like attendee number, date, etc)
const CostCalculator = (props) => {
  //Utilize material ui styles created in makeStyles
  const classes = useStyles();
  //State for number of party participants
  const [price, setPrice] = React.useState(0);

  //Handle changing of current price
  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  //Return grid container with a header text and a readOnly TextField that contains the current price
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h4">Price of party</Typography>
        <TextField
          id="priceField"
          defaultValue={price + " €"}
          label={
            <Typography style={{ fontSize: "1.5rem"}}>
              Cost
            </Typography>
          }
          color="primary"
          inputProps={{
            style: { fontSize: "2rem", marginLeft:"1vw"},
          }}
          InputProps={{
              readOnly:true
          }}
          style={{width:"6rem"}}
        />
      </Grid>
    </Grid>
  );
};
export default CostCalculator;
