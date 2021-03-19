import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
//party package kortti
//packagen informaatiot tulee propsina LandingPagelta

const Product = (props) => {
  const { product } = props;
  //productGuru state on tämän productin gurujen tietojen hakemista varten
  const [productGuru, setProductGurus] = useState([])
  const guruIDs = product.guru;


  //Haetaan gurut, joiden ID mainitaan tässä product paketissa
  //Laitetaan guru-oliot/objektit talteen productGuru stateen

  useEffect(() => {
    //guruIDs && guruIDS -juttu varmistaa, ettei mappia suoriteta jos guruIDs on undefined -> estää crashin
    let guruArray = []
    guruIDs && guruIDs.map( guru =>
    axios.get(`/api/gurus/${guru}`).then(response => {
      guruArray = guruArray.concat(response.data)
      setProductGurus(guruArray)
    })
    )

  }, []);

  return (
    <Grid item xs={2}>
      {/*Grid on material-ui komponentti, jolla saadaan kortin sisäinen layout hoidettua,
      xs määrittää kokoa suhteessa muihin elementteihin (esim muut kortit) */}
    <div className="card">
      {/*Kortin peruslayout */}
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
        {/*Kuva, joka toimii linkkinä tuotteen lisätietosivuille*/}
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 style={{marginBottom:"0px", marginTop:"0", paddingTop:"0", textAlign:"center"}}>{product.name}</h2>
          <h2 style={{margin:"0px", padding:"1px"}}>Gurus: </h2>
          {productGuru && productGuru.map(guru => <div key={guru._id}> {guru.name} </div>)}
        </Link>
        <div className="price">${product.price}</div>
      </div>
    </div>
    </Grid>
  );
}
export default Product

/*export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
  <h2>Guru: {product.guru}</h2>
        </a>
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}*/