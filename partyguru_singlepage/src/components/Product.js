import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Box,
} from "@material-ui/core";
//Party package product cards
//The information in the cards comes as props from LandingPage.js

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  cost: {
    width: "50%",
    textAlign: "center",
    fontSize: "2rem",
    bottom: "2px",
    position: "static",
  },

  cardStyle: {
    height: "100%",
    display: "flex",
  },

  contentStyle: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "0",
    paddingRight: "0",
    paddingBottom: "0",
  },
}));

const Product = (props) => {
  const { product } = props;
  //productGuru state is for containing the information of the gurus related to this card
  const [productGuru, setProductGurus] = useState([]);
  const guruIDs = product.guruid;

  //take stylings created in useStyles into classes variant
  //with classes we can apply styling to different elements by choosing a class from useStyles
  const classes = useStyles();

  //Get gurus from backend by ID, whose ID is mentioned in this products package
  //Put all information of these gurus in the productGuru state

  useEffect(() => {
    //guruID && guruIDs check ensures that the map is not done if guruIDs is undefined -> prevents a crash
    axios.get("api/gurus").then((response) => {
      const guruArray =
        guruIDs &&
        response.data.filter(
          (guru) => guruIDs.includes(guru._id) && guru.availability === true
        );
      console.log("täs guruarray (Product.js):", guruArray);
      setProductGurus(guruArray);
    });
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4}>
      {/*Card MUI component, contains the contents of the card
      This component uses 'cardStyle' defined earlier in useStyles. It is taken into use with className={classes.cardStyle}
      */}
      <Card raised className={classes.cardStyle}>
        {/*Whole card is a CardActionArea. This makes the card clickable and creates ripples when clicked 
        href is the link clicking the card will lead to. "+ product.id" should pass the id of that product to PartyPackage-page*/}
        <CardActionArea
          style={{
            paddingTop: "4%",
            paddingBottom: "7%",
            paddingLeft: "7%",
            paddingRight: "7%",
          }}
          centerRipple
          href={`/product/${product._id}` + product.id}
        >
          {/*CardMedia loads our image. Most likely the easiest way to have a responsive image
          top padding is necessary to display the image, and gives the image a certain amount of space */}
          <CardMedia
            image={product.image}
            title={product.name}
            style={{ paddingTop: "50%" }}
          />
          {/*
          CardContent contains the 'header' of the card (name of product), names of gurus, and the price info
          CardContent is only a container
          Contents are not properly fitting card currently
          */}
          <CardContent className={classes.contentStyle}>
            {/*Typography contains text, variant denotes how it should look basically using html tags like h1-h6, p1, etc. */}
            <Typography variant="h4" className={classes.cardHeader}>
              {product.name}
            </Typography>
            {/*Divider line under header of card and gurus*/}
            <div style={{borderBottom:"dashed", borderColor:"orange"}}/>
            {/*Typography containers for gurus*/}
            <Typography gutterBottom variant="h4" style={{ marginTop: "7px" }}>
              Gurus:
            </Typography>
            {/*To enable there to be X number of Gurus all the names should be put inside a single Typography
            This typography should then have overflow="hidden", textOverflow="ellipsis"
            This can be done by creating a single string that contains all guru names (somehow) 
            and adding linebreaks to put them on different lines */}
            <div style={{ height: "10rem"}}>
              {productGuru &&
                productGuru.map((guru) => (
                  <Typography style={{ fontSize: "1.5rem" }} key={guru._id}>
                    {guru.name}
                  </Typography>
                ))}
            </div>
            {/*Another typography to contain the price of the product*/}
            <Typography className={classes.cost}>Starting at {product.price}€</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default Product;
