import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LandingPage from "./screens/LandingPage";
import PartyPackage from "./screens/PartyPackage";
import GuruPage from "./screens/GuruPage/GuruPage";
import CreatePartyPage from "./screens/CreatePartyPage"
import CartPage from "./screens/CartPage";
import LoginPage from './screens/LoginPage';
import InviteToParty from "./screens/InviteToParty"
import PartyPage from "./screens/PartyPage";
import { colors } from '@material-ui/core';
import LoginPage from './screens/LoginPage';
import CartPage from './screens/CartPage';
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
            <Link className="brand" to="/">
              Party Guru
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
          <div><Link to='/gurupage/'>Guru Page</Link></div>

          <div>
            <Link to="/login">Login</Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/createpartypage"> <CreatePartyPage/> </Route>
            <Route path="/cart"> <CartPage/> </Route>
            <Route path="/gurupage/"> <GuruPage/> </Route>
            <Route path="/product/:id"> <PartyPackage/> </Route>
            <Route path="/login"><LoginPage/></Route>
            <Route path="/invitetoparty"><InviteToParty/></Route>
            <Route path="/partypage"><PartyPage/></Route>
            <Route path="/"> <LandingPage/> </Route>
          </Switch>
        </main>
        <footer>
          <p className="footer-text">Footer contents here</p>
        </footer>
      </div>
    </Router>
  );
}
export default App
