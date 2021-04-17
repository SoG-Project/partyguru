import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core';
import axios from "axios";
//package kortit linkkaa tänne
//jätin tän vaan siksi että näkyisi miten eri screenejä voi tehä browserroutella, oikeasti varmaan meillä ei oo mitään tällaista screeniä

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "1rem",
    margin: "1rem",
  },
}));




const PartyPackage = () => {
  const classes = useStyles();
  const [product, setProduct] = useState()


    useEffect(() => {
        const productID = window.location.href.split('product/').pop()
        axios.get(`/api/packages/${productID}`).then(response => {
        setProduct(response.data)
    })
    }, []);




    return (
    <div className={classes.mainContainer}>
        <div className="row center">
            <button onClick={()=>console.log(product)}>Testaa onko meillä producti</button>
        <p>Party package description comes here.<br /> Package info, availability calendar, gurus, contact + add to cart</p>
        </div>
    </div>
  );
};
export default PartyPackage;
