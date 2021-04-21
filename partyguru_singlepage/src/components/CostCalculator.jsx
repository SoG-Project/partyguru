import { Grid, Typography, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";

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

  useEffect(() => {
    if (props.isWeekend) {
      let newPrice = price * 2;
      setPrice(newPrice);
      console.log("Juhlat viikonloppuna, hinta nyt ", price);
      return;
    } else {
      let newPrice = price / 2;
      setPrice(newPrice);
      console.log("Juhlat arkena, hinta nyt ", price)
      return;
    }
  }, [props.isWeekend, props.participants]);
  // When amount of participants changes, readjust price accordingly
  useEffect(() => {
    let newPrice = 0;
    for (let i = 0; i < props.participants; i++) {
      newPrice += 10;
    }
    setPrice(newPrice);
  }, [props.participants]);

  //Return grid container with a header text and a readOnly TextField that contains the current price
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Typography variant="h4">Total sum</Typography>
        <Typography
          color="primary"
          style={{
            fontSize: "3rem",
            fontWeight: "600",
            marginLeft: "1vw",
            color: "#f1961d",
          }}
        >
          {price} €
        </Typography>
      </Grid>
    </Grid>
  );
};
export default CostCalculator;
