import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/PartyPackageScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Party Guru
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App
