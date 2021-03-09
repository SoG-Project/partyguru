
import React from 'react';
import Product from '../components/Product';
import data from '../data';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//splash sivu
//map funktio looppaa datan läpi ja tekee niistä kortteja
//Product.js tekee ne kortit viime kädessä
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function HomeScreen() {
  const classes = useStyles();
  return (
    
    <div classname={classes.root}>
      <Grid container spacing={4} justify="center">
      
        {data.products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      
      </Grid>
      <div className="row">uusi rivi</div>
      <Button variant="contained" color="primary">
      Hello Button
    </Button>
    
    </div>
  );
}




 