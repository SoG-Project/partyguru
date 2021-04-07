import React, { useState, useEffect, useRef } from "react";
import Product from "../../components/Product";
import ContactInfoFields from "./components/ContactInfoFields";
import AttendeeNumberSelector from "./components/AttendeeNumberSelector";
import CostCalculator from "./components/CostCalculator";

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
//splash sivu
//map funktio looppaa datan läpi ja tekee niistä kortteja
//Product.js tekee ne kortit viime kädessä

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "1rem",
    margin: "1rem",
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

  //Nappi mikä vaihtaa partypackagekorttia, sen klikinhändlääjä
  //klikkauksessa vaan kasvatetaan singleid:tä, mikä triggeröi ylläolevan hookin^
  const handleClick = () => {
    let __sid = singleid;
    __sid += 1;
    setSingleid(__sid);
  };

  const classes = useStyles();
  return (
    <div>
      <div className={classes.partyGuruInfo}>
        <Grid container direction="column" alignItems="center">
        <Typography gutterBottom variant="h3">Party Guru</Typography>
        <Typography variant="subtitle">
          Our Party Gurus host the most awesome parties for partiers of any age.
          <br />
          Parties are hosted on the Discord voice application and in various
          games <br />
          available in our selection. <br />
          Choose your package and get partying. Do it now!
          <br />
          <br />
        </Typography>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </Grid>
        {/*<div className="row">uusi rivi</div>*/}

        <div className="break"></div>

        {/*Tavoitteena sisäkkäiset gridit.
    Vasemmalla näkymässä Scheduler, oikealla formeja tms (ks. Figma etusivua)
    Tässä määritellään uloin grid container, jossa elementtien pitäisi mennä vas -> oik*/}
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={4}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <Grid item xs={12}>
            <Divider style={{ marginBottom: "2rem" }} />
          </Grid>
          {/*Ensimmmäisen gridin sisälle grid item, jossa on scheduler*/}
          <Grid
            container
            item
            spacing={2}
            xs={8}
            direction="column"
            justify="flex-start"
            alignItems="center"
            style={{
              borderStyle: "solid",
              borderColor: "grey",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Grid item>
              <SchedulerTest />
            </Grid>
          </Grid>

          {/*Toinen Grid, jonka sisään on tarkoitus tulla email, yms */}
          <Grid
            container
            item
            xs={3}
            spacing={4}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            style={{
              borderStyle: "dotted",
              borderColor: "grey",
              textAlign: "center",
              height: "690px",
            }}
          >
            <Grid item xs>
              <ContactInfoFields />
            </Grid>
            <Grid item xs>
              <AttendeeNumberSelector />
            </Grid>
            <Grid item xs>
              <CostCalculator />
            </Grid>
            <Grid item xs>
              <Button
                variant="contained"
                color="primary"
                href="/cart"
                style={{
                  margin: "10px",
                  minWidth: "80px",
                  minHeight: "40px",
                  fontSize: "1.2rem",
                }}
              >
                Link to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default LandingPage;
