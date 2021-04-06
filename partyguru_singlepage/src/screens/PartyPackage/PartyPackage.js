import React from "react";
import data from "../../data";
//package kortit linkkaa tänne
//jätin tän vaan siksi että näkyisi miten eri screenejä voi tehä browserroutella, oikeasti varmaan meillä ei oo mitään tällaista screeniä
const PartyPackage = (props) => {
  return (
    <div className="row center">
        <div>
        <p>Party package description comes here.<br /> Package info, availability calendar, gurus, contact + add to cart</p>
        </div>
    </div>
  );
};
export default PartyPackage;
