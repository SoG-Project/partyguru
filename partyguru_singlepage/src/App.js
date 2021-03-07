import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PartyPackageScreen from "./screens/PartyPackageScreen";
//Browserrouter hoitaa tän urlien reitityksen
//Kaikki HTML koodi mitä tässä näkyy ajetaan joka sivulla,
//paitsi nuo <Route> tagit, jotka ajetaan vain URLin mukaisella sivulle
//---> Header ja footer on aina samat, mutta urlin mukaan valitaan oikea body
// Eli uudet screenit uusiin tiedostoihin ja importti tohon ylös, ja sitten ton alemman <Route> tagin mukaisesti uus reititys.
const App = () => {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              Party Guru
            </a>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
        </header>
        <main>
          <Switch>
          <Route path="/product/:id"> <PartyPackageScreen/> </Route>
          <Route path="/"> <HomeScreen/> </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
export default App
