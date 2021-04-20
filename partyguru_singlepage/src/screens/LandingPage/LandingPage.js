import React, { useState, useEffect, useRef } from "react";
import Product from "../../components/Product";
import ContactInfoFields from "../../components/ContactInfoFields";
import AttendeeNumberSelector from "../../components/AttendeeNumberSelector";
import CostCalculator from "../../components/CostCalculator";
import Calendar from "../../components/Calendar/Calendar";

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import SchedulerTest from "../../components/Scheduler/SchedulerTest";
import Divider from "@material-ui/core/Divider";
import EditableScheduler from "../../components/Scheduler/EditableScheduler";
import { Typography } from "@material-ui/core";
import { useAuth0 } from '@auth0/auth0-react'
//splash sivu
//map funktio looppaa datan läpi ja tekee niistä kortteja
//Product.js tekee ne kortit viime kädessä

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "1rem",
    margin: "1rem",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  partyGuruInfo: {
    backgroundColor: "#8f00e2",
    color: "white",
    padding: "10px",
    marginBottom: "10px",
  },
}));

const LandingPage = () => {
  const [products, setProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [singleid, setSingleid] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      axios.get("/api/packages").then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
    };
    fetchData();
    return () => {
      //
    };
  }, []);

  //Kun products muuttuu, alustetaan singleID
  useEffect(() => {
    let found = products.filter((item) => {
      return item._id === singleid;
    });
    for (var i = 0; i < products.length; i++) {
      if (products[i]._id === singleid) {
        found = products[i];
        setSingleProduct(found);
      }
    }
    return () => {
      //
    };
  }, [products, singleid]);

  //Kun singleid muuttuu, etsi sen arvon mukainen partypackagedata ja laita se singleProductiin
  useEffect(() => {
    let found = products.filter((item) => {
      return item._id === singleid;
    });
    let foundBoolean = false;
    for (var i = 0; i < products.length; i++) {
      if (products[i]._id === singleid.toString()) {
        foundBoolean = true;
        found = products[i];
        setSingleProduct(found);
      }
    }
    if (foundBoolean === false) {
      setSingleid(1);
    }
    return () => {
      //
    };
  }, [products, singleid]);

  const AuthNav = () => {
    const { isAuthenticated } = useAuth0()

    return(
      <div>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    )
  }

  const classes = useStyles();
  return (
    <div>
      <AuthNav />
      <div className={classes.partyGuruInfo}>
        <Grid container direction="column" alignItems="center">
          <Typography gutterBottom variant="h3">
            Party Guru
          </Typography>
          <Typography variant="h5">
            Our Party Gurus host the most awesome parties for partiers of any
            age.
            <br />
            Parties are hosted on the Discord voice application and in various
            games <br />
            available in our selection. <br />
            You can get started by selecting a party package below.
            <br />
            <br />
          </Typography>
        </Grid>
      </div>

      <div className={classes.root}>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="center"
          alignItems="center"
          style={{ width: "80%", maxWidth: "1600px", margin: "auto" }}
        >
          <Grid item xs={12}>
            <Typography align="center" variant="h2">
              Party Package Selection
            </Typography>
          </Grid>

          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default LandingPage;
