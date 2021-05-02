import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  Paper,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "material-ui-image";
import axios from "axios";
import AttendeeNumberSelector from "../../components/AttendeeNumberSelector";
import ContactInfoFields from "../../components/ContactInfoFields";
import CostCalculator from "../../components/CostCalculator";
import Calendar from "../../components/Calendar/Calendar";
import { useAuth0 } from "@auth0/auth0-react";
import { AvatarGroup } from "@material-ui/lab";

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
  guruAvatars: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const PartyPackage = () => {
  const classes = useStyles();
  //contains product (the one clicked in LandingPage to access this page)
  const [product, setProduct] = useState();
  //useState for the guruIDs of this product, used to get info on these gurus from the backend
  const [productGurus, setProductGurus] = useState();
  //useState for number of participants, used for example to calculate cost of party
  const [participants, setParticipants] = useState(1);
  //useState for events of the chosen guru + new event, these are saved to backend
  const [guruEvents, setGuruEvents] = useState();
  //useState for currently selected gurus ID
  const [currentGuruID, setCurrentGuruID] = useState();
  //useState to check if date is weekend or not
  const [isWeekend, setIsWeekend] = useState(false);
  //useStates to contain customer contact information
  const [customerName, setCustomerName] = useState();
  const [customerEmail, setCustomerEmail] = useState();
  const {user} = useAuth0();
  const [partyStartTime, setPartyStartTime] = useState()

  //useState for duration, passed to CostCalculator to calculate costs
  const [duration, setDuration] = useState(1);
  //Extract functions from Auth0 to see if user is logged in.
  const history = useHistory();

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

  //Function to send current events of selected guru into backend server
  const saveParties = () => {
    console.log("Current guru id: ", currentGuruID);
    console.log("Lähetetään bäkkiin: ", guruEvents);
    axios({
      method:'put',
      url:`/api/gurus/${currentGuruID}`,
      data:{
        timeswhenunavailable: guruEvents
      }
    }).then(function(response) {
      history.push("/createpartypage");
    });
  };

  const createNewParty = () => {
    console.log(partyStartTime);
    axios.post(`/api/parties/`,{packageid:product._id, guruid:currentGuruID, userid: user.sub, ownername: customerName, datetime: partyStartTime, duration:duration, email:customerEmail, phone: "",
      num_attendees: participants, schedule:[], likes:[], description:"" }).then(response => {
        console.log(response.data);
        history.push("/createpartypage");
    });
  };

  return (
    <div className={classes.mainContainer}>
      {/*If product has been fetched from backend, render page.
      This is done to avoid "could not read undefined" errors
      These errors are usually related to reading attributes of product before it has been fetched,
      like product.img or product.name 
      While product is not fetched a simple loading page will display
      product gurus array is needed by Calendar so we wait for that too.
      Probably sort of a hack but it turned out to be a sure way for the page to work*/}
      {product && productGurus ? (
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
              <Grid container>
                {/* AvatarGroup to contain guru Avatars, max denotes how many are shown before showing a +x bubble */}
                <AvatarGroup max={6}>
                  {/*Map through gurus of this product and create Avatars of their profile pictures */}
                  {productGurus &&
                    productGurus.map((guru) => (
                      <Tooltip
                        key={guru._id}
                        title={
                          <Typography style={{ fontSize: "1.5rem" }}>
                            {guru.name}
                          </Typography>
                        }
                      >
                        <Avatar
                          alt={guru.name}
                          src={guru.image}
                          className={classes.guruAvatars}
                        />
                      </Tooltip>
                    ))}
                </AvatarGroup>
              </Grid>
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
            {/*Header for name of party package and generic information about it*/}
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
          <Grid
            container
            justify="space-around"
            style={{ height: "100%", marginTop: "3rem" }}
          >
            <Grid item xs={12}>
              <div
                style={{
                  borderTop: "dashed",
                  borderColor: "orange",
                  marginBottom: "2rem",
                }}
              />
            </Grid>
            {/*Grid to contain reservation calendar and fields for the customer to input their name and email. 
            Also contains a selector for the number of attendees and a cost calculator */}
            <Grid container item xs={7} direction="column">
              <Grid xs={12} align="center">
                {/*Pass functions to change weekend boolean, party reservation info, duration
                 and product gurus to fetch correct gurus calendars*/}
                <Calendar
                  setIsWeekend={setIsWeekend}
                  setGuruEvents={setGuruEvents}
                  setDuration={setDuration}
                  productGurus={productGurus}
                  setCurrentGuruID={setCurrentGuruID}
                  setPartyStartTime = {setPartyStartTime}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={4}
              xs={4}
              direction="column"
              justify="center"
            >
              <Grid item>
                <ContactInfoFields
                  setCustomerEmail={setCustomerEmail}
                  setCustomerName={setCustomerName}
                />
              </Grid>
              <Grid item>
                <AttendeeNumberSelector
                  participants={participants}
                  setParticipants={setParticipants}
                />
              </Grid>
              <Grid item>
                <CostCalculator
                  participants={participants}
                  isWeekend={isWeekend}
                  duration={duration}
                />
              </Grid>
              <Grid item align="center">
                {guruEvents && partyStartTime && customerEmail && customerName ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.bigButton}
                    onClick={createNewParty}
                  >
                    Lock in party and invite guests!
                  </Button>
                ) : (
                  <div>
                    <Typography variant="h5">
                      You must first select a time and date for your party and
                      fill in your contact information above.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.bigButton}
                      disabled
                    >
                      Lock in party and invite guests!
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div
          className={classes.mainContainer}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/*This area is rendered while the package has not been fetched, usually for a very brief amount of time*/}
          <Typography variant="h4">Page loading...</Typography>
          <CircularProgress
            color="secondary"
            disableShrink
            size="15vh"
            style={{ margin: "3%" }}
          />
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
