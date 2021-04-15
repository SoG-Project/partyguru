import React, { useEffect, useState } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import Image from 'material-ui-image';
import axios from "axios";
import Product from "../../components/Product";
//package kortit linkkaa tänne

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "1rem",
    margin: "1rem",
  },
}));


const PartyPackage = () => {
  const classes = useStyles();
  //contains product, initialized empty to prevent errors
  const [product, setProduct] = useState();
  const [productGuru, setProductGurus] = useState([]);

  //useState for the guruIDs of this product, used to get info on these gurus from the backend

  //get ID of product from address of site
  //Needed to show name of product, gurus attached to it, and so on
  useEffect(() => {
    const productID = window.location.href.split("product/").pop();
    axios.get(`/api/packages/${productID}`).then((response) => {
      setProduct(response.data);
      console.log(response.data.guruid)
    });

  }, []);

  //get gurus of this product from backend
  useEffect(() => {
    console.log(product)
    //guruID && guruIDs check ensures that the map is not done if guruIDs is undefined -> prevents a crash
    axios.get("/api/gurus").then((response) => {
      const guruArray =
        product &&
        response.data.filter(
          (guru) => product.guruid.includes(guru._id) && guru.availability === true
        );
      setProductGurus(guruArray);
      console.log("guruarray (Product.js):", guruArray);
    });
  }, [product]);

  return (
    <div className={classes.mainContainer}>
      <div className="row center">
        {product && product.image ? (
        <Image src={product.image}/>)
          :
          <Typography variant="h3">Image loading...</Typography>}
        <Button variant="contained" color="primary" onClick={() => console.log(product)}>
          Testaa onko meillä producti
        </Button>
        <p>
          Party package description comes here.
          <br /> Package info, availability calendar, gurus, contact + add to
          cart
        </p>
      </div>
    </div>
  );
};
export default PartyPackage;
