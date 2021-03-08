
import React from 'react';
import Product from '../components/Product';
import data from '../data';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
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
/* function CenteredGrid(props) {
  const classes=useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12, Ilmeisesti gridin rivillä on aina 12 yksikköä tilaa</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=1</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
} */
const HomeScreen = () => {
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
        <Link to='/gurupage/'>Click here if you are the party guru</Link>

    
    </div>
  );
}
export default HomeScreen




 