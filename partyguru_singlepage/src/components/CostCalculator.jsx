import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";

//Calculator to calculate cost of party based on its options
//Props should contain information about party (like attendee number, date, etc)
const CostCalculator = (props) => {
  //State for number of party participants
  const [price, setPrice] = React.useState(0);

  //When the state of isWeekend or participants is changed in PartyPackage.js this fires
  //First we check isWeekend, if true double price and set it as new price
  //if not weekend halve price and set it as new price
  useEffect(() => {
    if (props.isWeekend) {
      let newPrice = price * 2;
      setPrice(newPrice);
      console.log("Juhlat viikonloppuna, hinta nyt ", price);
      return;
    } else {
      let newPrice = price / 2;
      setPrice(newPrice);
      console.log("Juhlat arkena, hinta nyt ", price);
      return;
    };
  }, [props.isWeekend]);

  // When amount of participants changes, readjust price accordingly
  useEffect(() => {
    let newPrice = 0;
    for (let i = 0; i < props.participants; i++) {
      newPrice += 5;
    };
    let durationPrice = props.duration * 5;
    newPrice = newPrice + durationPrice;
    if(props.isWeekend){
      newPrice = newPrice * 2;
      console.log("Osallistujia tai kestoa muutettu viikonloppuna");
    };
    setPrice(newPrice);
  }, [props.participants, props.duration]);

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
        <Typography variant="h5">The price is increased by a longer duration, more participants, and arranging the party on a weekend.</Typography>
      </Grid>
    </Grid>
  );
};
export default CostCalculator;
