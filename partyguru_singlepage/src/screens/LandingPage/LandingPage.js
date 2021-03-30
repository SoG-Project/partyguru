import React, { useState, useEffect, useRef } from 'react';
import Product from '../../components/Product';
//import data from '../data';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SchedulerTest from '../../components/Scheduler/SchedulerTest';
import Divider from '@material-ui/core/Divider';
import EditableScheduler from '../../components/Scheduler/EditableScheduler';
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

const LandingPage = () => {

  const [products, setProduct] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [singleid, setSingleid]=useState(1);
  
  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/packages').then(response => {
        console.log(response.data);
        setProduct(response.data);
    })}
    fetchData();
    return () => {
      //
    };
  }, []);
  
  //Kun products muuttuu, alustetaan singleID
  useEffect(() => {
    let found=products.filter(item => {
      return item._id === singleid
    })
    for (var i = 0; i < products.length; i++){
      if (products[i]._id === singleid){
         found=products[i];
         setSingleProduct(found);
      }
    }
    return () => {
      //
    };
  }, [products, singleid]);

//Kun singleid muuttuu, etsi sen arvon mukainen partypackagedata ja laita se singleProductiin
  useEffect(() => {
    let found=products.filter(item => {
      return item._id === singleid
    })
    let foundBoolean=false;
    for (var i = 0; i < products.length; i++){
      if (products[i]._id === singleid.toString()){
         foundBoolean=true;
         found=products[i];
         setSingleProduct(found);
      }
    }
    if(foundBoolean===false){
      setSingleid(1);
    }
    return () => {
      //
    };
  }, [products, singleid]);

  //Nappi mikä vaihtaa partypackagekorttia, sen klikinhändlääjä
  //klikkauksessa vaan kasvatetaan singleid:tä, mikä triggeröi ylläolevan hookin^
  const handleClick = () => {
    let __sid=singleid;
    __sid+=1;
    setSingleid(__sid);
   }

  const classes = useStyles();
  return (
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
      <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        {/*Ensimmmäisen gridin sisälle grid item, jossa on scheduler*/} 
        <Grid container item xs={8} direction="column" justify="flex-start" alignItems="center" style={{borderStyle:"solid", borderColor:"grey", marginBottom:"10px", marginTop:"10px"}}>
          <Grid item>
            <SchedulerTest/>
          </Grid>
          {/*Ja toinen item, jossa placeholder gurun tiedoille*/}
          <Grid item>
            <p>Party Guru photo and information</p>
          </Grid>
        </Grid>

        {/*Toinen Grid, jonka sisään on tarkoitus tulla email, yms */}
        <Grid container item xs={3} direction="column" justify="flex-start" alignItems="stretch" style={{borderStyle:"dotted", borderColor:"grey", textAlign:"center", height: "690px"}}>
          <Grid item xs>
            <p>Contact information</p>
          </Grid>
          <Grid item xs>
            <p>Attendee amount</p>
          </Grid>
          <Grid item xs>
            <p>Party cost: 5B €</p>
          </Grid>
          <Grid item xs>
            <Link to="/cart">View cart</Link>
          </Grid>
        </Grid>
      </Grid>

        <Grid container padding="15px" margin="15px" direction="column" spacing={4} justify="space-around" alignItems="center">
        {/* tämän kortin sisältö vaihtuu napista */}
       <Product key={singleid} product={singleProduct}></Product>
       <Button size="large" variant="contained" color="primary" onClick={() => { handleClick() }}> Next package button </Button>
    </Grid>
    </div>
  );
}
export default LandingPage
/*
import React, { useState, useEffect, useRef } from 'react';
import Product from '../components/Product';
import data from '../data';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import axios from 'axios';
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

const HomeScreen = () => {

  const [products, setProduct] = useState(data);
  //package, joka on valittu next napilla
  const [singleProduct, setSingleProduct] = useState([]);
  //Kun singleid muuttuu, etsi sen arvon mukainen partypackagedata ja laita se singleProductiin
  const [singleid, setSingleid]=useState(1);

  useEffect(() => {
    setProduct(data);
    /*
    const fetchData = async () => {
      axios.get('/api/products').then(response => {
      const {data} = response.data;
      setProduct(response.data);
      console.log(data)
})
    }
    fetchData();
    return () => {
      //
    };
      
    
  }, []);

  
  //Kun products muuttuu, alustetaan singleID
  useEffect(() => {
    let found=products.products.filter(item => {
      return item._id === singleid
    })
    for (var i = 0; i < products.length; i++){
      if (products[i]._id === singleid){
         found=products.products[i];
         setSingleProduct(found);
      }
    }
    return () => {
      //
    };
  }, [products]);

//Kun singleid muuttuu, etsi sen arvon mukainen partypackagedata ja laita se singleProductiin
  useEffect(() => {
    console.log("täääl");
    let found=null;
    let apuri=singleid;
    let foundBoolean=false;
    for (var i = 0; i < products.products.length; i++){
      if (products.products[i]._id === singleid.toString()){
         foundBoolean=true;
         found=products.products[i];
         setSingleProduct(found);
      }
    }
    if(foundBoolean===false){
      setSingleid(1);
    }
    return () => {
      //
    };
  }, [singleid]);

  //Nappi mikä vaihtaa partypackagekorttia, sen klikinhändlääjä
  //klikkauksessa vaan kasvatetaan singleid:tä, mikä triggeröi ylläolevan hookin^
  const handleClick = () => {
    let __sid=singleid;
    __sid+=1;
    setSingleid(__sid);
   }
   
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={4} justify="center">
      
        {products.products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </Grid>
      <div className="row">uusi rivi</div>
      <Button variant="contained" color="primary" onClick={() => { handleClick() }}>
      Next package button
    </Button>
    <div className="break"></div>

        <Grid container spacing={4} justify="center">
        
        
       <Product key={singleid} product={singleProduct}></Product>
        
      
      
    
    </Grid>
    </div>
  );
}
export default HomeScreen
*/
