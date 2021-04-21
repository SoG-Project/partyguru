import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "material-ui-image";
import axios from "axios";
import AttendeeNumberSelector from "../../components/AttendeeNumberSelector";
import ContactInfoFields from "../../components/ContactInfoFields";
import CostCalculator from "../../components/CostCalculator";
import Calendar from "../../components/Calendar/Calendar";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: "4%",
  },
  bigButton: {
    margin: "10px",
    minWidth: "80px",
    minHeight: "40px",
    fontSize: "1.2rem",
  },
  dashed: {
    borderTop: "3px dashed #bbb",
  },
}));

const PartyPackage = () => {
  const classes = useStyles();
  //contains product (the one clicked in LandingPage to access this page)
  const [product, setProduct] = useState();
  //useState for the guruIDs of this product, used to get info on these gurus from the backend
  const [productGurus, setProductGurus] = useState([]);
  //useState for number of participants, used for example to calculate cost of party
  const [participants, setParticipants] = useState(1);
  //useState for new calendar event, this will be sent from here to backend
  const [partyReservation, setPartyReservation] = useState({
    id: null,
    title: "",
    start: null,
    end: null,
  });
  //useState to check if date is weekend or not
  const [isWeekend, setIsWeekend] = useState(false);

  // This function will set the participant amount and is usable in child components
  const setParticipantAmount = (amount) => {
    setParticipants(amount);
  };

  //Function to set new partyReservation, usable by Calendar to bring event data here
  const setNewPartyReservation = (partyData) => {
    setPartyReservation(partyData);
  };

  //get ID of product from address of site
  //Needed to show name of product, gurus attached to it, and so on
  useEffect(() => {
    const productID = window.location.href.split("product/").pop();
    axios.get(`/api/packages/${productID}`).then((response) => {
      setProduct(response.data);
      console.log(response.data.guruid);
    });
  }, []);

  //get gurus of this product from backend
  useEffect(() => {
    console.log(product);
    //product && guruIDs check ensures that the map is not done if guruIDs is undefined -> prevents a crash
    axios.get("/api/gurus").then((response) => {
      const guruArray =
        product &&
        response.data.filter(
          (guru) =>
            product.guruid.includes(guru._id) && guru.availability === true
        );
      setProductGurus(guruArray);
    });
  }, [product]);

  return (
    <div className={classes.mainContainer}>
      {/*If product has been fetched from backend, render page.
      This is done to avoid "could not read undefined" errors
      These errors are usually related to reading attributes of product before it has been fetched,
      like product.img or product.name 
      While product is not fetched a simple loading page will display*/}
      {product ? (
        <Grid
          container
          direction="row"
          justify="center"
          style={{ width: "100%" }}
        >
          {/*Start of Image grid top level container for containers of calendar and input fields */}
          <Grid container item xs={3} direction="column" align="center">
            <Grid item style={{ width: "100%" }}>
              <Paper style={{ width: "100%", marginBottom: "6%" }}>
                <Image src={product.image} />
              </Paper>
            </Grid>
            <Grid item>
              <div style={{ borderBottom: "dashed", borderColor: "orange" }} />
            </Grid>
            <Grid item>
              <Typography variant="h3" style={{ marginTop: "5%" }}>
                Gurus:
              </Typography>
              {/*Map through gurus of this product and print their names */}
              {productGurus &&
                productGurus.map((guru) => (
                  <Typography style={{ fontSize: "1.5rem" }} key={guru._id}>
                    {guru.name}
                  </Typography>
                ))}
            </Grid>
          </Grid>

          {/* Start of information grid*/}
          <Grid
            container
            item
            xs={7}
            direction="column"
            style={{ marginLeft: "5%", padding: "1rem" }}
          >
            <Grid item>
              <Typography variant="h1">{product.name} Party Pack</Typography>
              <Typography gutterBottom paragraph style={{ fontSize: "1.5rem" }}>
                Generic information about this package here. <br /> Lorem ipsum
                dolor sit amet, consectetur adipisci elit, sed eiusmod tempor
                incidunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquid ex ea commodi consequat. Quis aute iure reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint obcaecat cupiditat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Grid>
          </Grid>
          {/*Grid container for input fields */}
          <Grid container style={{ height: "100%", marginTop: "3rem" }}>
            <Grid item xs={12}>
              <div
                style={{
                  borderTop: "dashed",
                  borderColor: "orange",
                  marginBottom: "2rem",
                }}
              />
            </Grid>
            <Grid container item xs={7} direction="column">
              <Grid xs={12} align="center">
                <Calendar
                  setIsWeekend={setIsWeekend}
                  setNewPartyReservation={setNewPartyReservation}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={4}
              xs={3}
              direction="column"
              justify="center"
            >
              <Grid item>
                <AttendeeNumberSelector
                  participants={participants}
                  setParticipantAmount={setParticipantAmount}
                />
              </Grid>
              <Grid item>
                <ContactInfoFields />
              </Grid>
              <Grid item>
                <CostCalculator participants={participants} isWeekend={isWeekend} />
              </Grid>
              <Grid item align="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.bigButton}
                  href="/cart"
                >
                  Add to cart and invite guests!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.mainContainer} style={{textAlign:"center", justifyContent:"center", alignItems:"center"}} >
          {/*This area is rendered while the package has not been fetched, usually for a very brief amount of time*/}
          <Typography variant="h4">
            Page loading...
          </Typography>
          <CircularProgress color="secondary" disableShrink size="15vh" style={{margin:"3%"}} />
          <Typography variant="h4">
            If you see this page for an extended period of time something has
            likely gone wrong.
          </Typography>
        </div>
      )}
    </div>
  );
};
export default PartyPackage;
