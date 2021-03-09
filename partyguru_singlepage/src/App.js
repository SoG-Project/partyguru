import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import HomeScreen from "./screens/HomeScreen";
import PartyPackageScreen from "./screens/PartyPackageScreen";
import GuruPage from "./screens/GuruPage";
import CreatePartyPage from "./screens/CreatePartyPage"
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen';
import InviteToParty from "./screens/InviteToParty"
import PartyPageScreen from "./screens/PartyPageScreen";
import { colors } from '@material-ui/core';
//Browserrouter hoitaa tän urlien reitityksen
//Kaikki HTML koodi mitä tässä näkyy ajetaan joka sivulla,
//paitsi nuo <Route> tagit, jotka ajetaan vain URLin mukaisella sivulle
//---> Header ja footer on aina samat, mutta urlin mukaan valitaan oikea body
// Eli uudet screenit uusiin tiedostoihin ja importti tohon ylös, ja sitten ton alemman <Route> tagin mukaisesti uus reititys.
const App = () => {

  //Yksinkertainen  useState sille onko käyttäjä logged in vai ei
  const [loginStatus, setLoginStatus] = useState(false);

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
          <div>
            <Link to="/login">Login</Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/createpartypage"> <CreatePartyPage/> </Route>
            <Route path="/cart"> <CartScreen/> </Route>
            <Route path="/gurupage/"> <GuruPage/> </Route>
            <Route path="/product/:id"> <PartyPackageScreen/> </Route>
            <Route path="/login"><LoginScreen/></Route>
            <Route path="/invitetoparty"><InviteToParty/></Route>
            <Route path="/partypage"><PartyPageScreen/></Route>
            <Route path="/"> <HomeScreen/> </Route>
          </Switch>
        </main>
        <footer>
          <p className="footer-text">Tänne footerin sisällöt</p>
        </footer>
      </div>
    </Router>
  );
}
export default App
