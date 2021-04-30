import React, { useState, useEffect } from "react";
import Product from "../../components/Product";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
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
  searchbarelements: {
    margin: theme.spacing(2),
    alignItems: "center"
  },
  searchbar: {
    minWidth: "85%",
    maxWidth: "85%",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing(2),
    alignItems: "center",
    margin: "0",
    width: "20vh",
    height: "4vh",
    marginLeft: "4vh",
  }
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

  const classes = useStyles();
  return (
    <div>
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

      <div className={classes.searchbar}>
        <Paper style={{ backgroundColor: "lightgrey", marginLeft:"17%" , marginTop: "4vh"}}>
          <Grid container alignItems="center" direction="row" style={{marginBottom: "10%"}}>
            <Grid item className={classes.searchbarelements} xs={4}>
              <TextField
                id="seachbygame"
                fullWidth
                rows={1}
                rowsMax={1}
                label={<Typography style={{fontSize: "1.7rem"}}>Search by game</Typography>}
                inputProps={{
                  maxLength: 20,
                  style: { fontSize: "2rem", lineHeight: "150%" },
                }}
              />
            </Grid>
            <Grid className={classes.searchbarelements} item xs={4}>
              <TextField
                id="searchbydate"
                fullWidth
                rows={1}
                rowsMax={1}
                label={<Typography style={{fontSize: "1.7rem"}}>Search by game</Typography>}
                inputProps={{
                  maxLength: 20,
                  style: { fontSize: "2rem", lineHeight: "150%" },
                }}
              />
            </Grid>
            <Grid item className={classes.searchbarelements}>
              <Button className={classes.button} variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
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
