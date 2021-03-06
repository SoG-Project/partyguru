
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//party package kortti
//packagen informaatiot tulee propsina 

export default function Product(props) {
  const { product } = props;
  return (
    <Grid item xs={2}>
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
    </Grid>
  );
}

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