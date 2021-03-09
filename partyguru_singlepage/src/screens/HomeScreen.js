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
    fetchData();*/
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
        <Link to='/gurupage/'>Click here if you are the party guru</Link>

        <Grid container spacing={4} justify="center">
        
        {/* tämän kortin sisältö vaihtuu napista */}
       <Product key={singleid} product={singleProduct}></Product>
        
      
      
    
    </Grid>
    </div>
  );
}
export default HomeScreen
