import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "material-ui-image";
import axios from "axios";
import Product from "../../components/Product";
import AttendeeNumberSelector from "../../components/AttendeeNumberSelector";
import ContactInfoFields from "../../components/ContactInfoFields";
import CostCalculator from "../../components/CostCalculator";
//package kortit linkkaa tänne

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
  //contains product, initialized empty to prevent errors
  const [product, setProduct] = useState();
  const [productGurus, setProductGurus] = useState([]);

  //useState for the guruIDs of this product, used to get info on these gurus from the backend

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
          style={{ height: "100vh" }}
        >
          {/*Start of Image grid */}
          <Grid
            container
            item
            xs={3}
            direction="column"
            align="center"
            style={{ borderStyle: "solid" }}
          >
            <Grid item style={{ width: "100%" }}>
              <Paper style={{ width: "100%", marginBottom: "6%" }}>
                <Image src={product.image} />
              </Paper>
            </Grid>
            <Grid item>
              <div style={{ borderBottom: "dashed", borderColor: "orange" }} />
            </Grid>
            <Grid item>
              <Typography variant="h4" style={{ marginTop: "5%" }}>
                Gurus:
              </Typography>
              {productGurus &&
                productGurus.map((guru) => (
                  <Typography style={{ fontSize: "1.5rem" }} key={guru._id}>
                    {guru.name}
                  </Typography>
                ))}
            </Grid>
          </Grid>

          {/* Start of information and options grid */}
          <Grid
            container
            item
            xs={7}
            spacing={3}
            direction="column"
            style={{ borderStyle: "dotted", marginLeft: "5%", padding: "1rem" }}
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
            <Grid item>
              <AttendeeNumberSelector />
            </Grid>
            <Grid item>
              <ContactInfoFields />
            </Grid>
            <Grid item align="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.bigButton}
              >
                Add to cart and invite guests!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.mainContainer} style={{ marginLeft: "45%" }}>
          {/*This area is rendered while the package has not been fetched, usually for a very brief amount of time*/}
          <Typography variant="h4">
            Page loading... (PartyPackage.js)
          </Typography>
          <CircularProgress color="secondary" disableShrink size="15vh" />
          <Typography variant="h4">
            If you see this page for an extended duration of time something has
            likely gone wrong.
          </Typography>
        </div>
      )}
    </div>
  );
};
export default PartyPackage;
