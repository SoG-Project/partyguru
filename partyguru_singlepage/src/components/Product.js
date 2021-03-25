import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Divider } from '@material-ui/core';
//Party package product cards
//The information in the cards comes as props from LandingPage.js

const useStyles = makeStyles((theme) => ({
  media: {
    width: '100%',
    height: '30%',
  },
  
  cardHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '2px',
  },

  cost: {
    backgroundColor: 'lightgrey',
    width: '30%',
    textAlign: 'center',
    justify: 'center',
    alignContent: 'flex-end',
    marginTop: '1rem',
    fontSize: '2rem',
    color: 'purple',
    outline: 'dashed',
    outlineWidth: '1px',
    marginLeft: '35%',
    position: 'static',
    },

  cardStyle: {
    backgroundColor: 'orange',
    height: 'auto',
  },
}))


const Product = (props) => {
  const { product } = props;
  //productGuru state is for containing the information of the gurus related to this card
  const [productGuru, setProductGurus] = useState([]);
  const guruIDs = product.guru;

  //take stylings created in useStyles into classes variant
  //with classes we can apply styling to different elements by choosing a class from useStyles
  const classes = useStyles(); 

  //Get gurus from backend by ID, whose ID is mentioned in this products package
  //Put all information of these gurus in the productGuru state

  useEffect(() => {
    //guruID && guruIDs check ensures that the map is not done if guruIDs is undefined -> prevents a crash
    let guruArray = [];
    guruIDs &&
      guruIDs.map((guru) =>
        axios.get(`/api/gurus/${guru}`).then((response) => {
          guruArray = guruArray.concat(response.data);
          setProductGurus(guruArray);
        })
      );
  }, []);

  return (
    //Return a Material-UI Grid item as the returned outcome will be inside a Grid container
    <Grid item className={classes.gridStyle} xs={12} sm={6} md={3} lg={2}>
      {/*Card MUI component, contains the contents of the card*/}
      <Card variant="outlined" className={classes.cardStyle}>
        <CardActionArea centerRipple href={`/product/${product._id}`}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
            component="img"
          />
          <CardContent>
            <Typography variant="h4" className={classes.cardHeader}>
              {product.name}
            </Typography>
            <Divider />
            <Typography variant="h4" style={{ marginTop: "7px"}}>
              Gurus:
            </Typography>
            <Typography>
              {productGuru &&
                productGuru.map((guru) => (
                  <div style={{ fontSize: "1.5rem" }} key={guru._id}>
                    {guru.name}
                  </div>
                ))}
            </Typography>
            <Grid container>
              <Typography className={classes.cost}>{product.price}€</Typography>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

// return (
//    <Grid item xs={12} sm={6} md={3} lg={2}>
      {/*Grid on material-ui komponentti, jolla saadaan kortin sisäinen layout hoidettua,
      xs määrittää kokoa suhteessa muihin elementteihin (esim muut kortit) */}
//      <div className="card">
        {/*Kortin peruslayout */}
//        <Link to={`/product/${product._id}`}>
//          <img className="medium" src={product.image} alt={product.name} />
          {/*Kuva, joka toimii linkkinä tuotteen lisätietosivuille*/}
//        </Link>
//        <div className="card-body">
//          <Link to={`/product/${product._id}`}>
//            <h2
//              style={{
//                marginBottom: "0px",
//                marginTop: "0",
//                paddingTop: "0",
//                textAlign: "center",
//              }}
//            >
//              {product.name}
//            </h2>
//            <h2 style={{ margin: "0px", padding: "1px" }}>Gurus: </h2>
//            {productGuru &&
//              productGuru.map((guru) => (
//                <div key={guru._id}> {guru.name} </div>
//              ))}
//          </Link>
//          <div className="price">${product.price}</div>
//        </div>
//      </div>
//    </Grid>
//  );
};
export default Product;