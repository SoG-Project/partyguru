import React from "react";
import {makeStyles} from '@material-ui/core';
//package kortit linkkaa tänne
//jätin tän vaan siksi että näkyisi miten eri screenejä voi tehä browserroutella, oikeasti varmaan meillä ei oo mitään tällaista screeniä

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "1rem",
    margin: "1rem",
  },
}));

const PartyPackage = (props) => {
  const classes = useStyles();
  const {product} = props;
  console.log(product)
  return (
    <div className={classes.mainContainer}>
        <div className="row center">
        <p>Party package description comes here.<br /> Package info, availability calendar, gurus, contact + add to cart</p>
        </div>
    </div>
  );
};
export default PartyPackage;
