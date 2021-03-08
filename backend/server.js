import express from 'express';
import data from './data.js';

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id
  const partypack = data.products.find(product => product._id === id)
  res.json(partypack)
})

app.listen(5000, () => { console.log("Server started at http://localhost:5000") });
