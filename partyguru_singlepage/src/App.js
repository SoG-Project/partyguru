import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Import Material-ui components here
import Link from '@material-ui/core/Link';

//Import pages here
import LandingPage from "./screens/LandingPage/LandingPage";
import PartyPackage from "./screens/PartyPackage/PartyPackage";
import GuruPage from "./screens/GuruPage/GuruPage";
import CreatePartyPage from "./screens/CreatePartyPage/CreatePartyPage"
import CartPage from "./screens/CartPage/CartPage";
import LoginPage from './screens/LoginPage/LoginPage';
import InviteToParty from "./screens/InviteToParty/InviteToParty"
import PartyPage from "./screens/PartyPage/PartyPage";
import RSVP from "./screens/RSVP/RSVP";
import GuruPartyPage from "./screens/GuruPartyPage/GuruPartyPage"
import Profile from "./screens/ProfilePage/ProfilePage"
//Import components
import Header from "./components/Header";

//Browserrouter hoitaa tän urlien reitityksen
//Kaikki HTML koodi mitä tässä näkyy ajetaan joka sivulla,
//paitsi nuo <Route> tagit, jotka ajetaan vain URLin mukaisella sivulle
//---> Header ja footer on aina samat, mutta urlin mukaan valitaan oikea body
// Eli uudet screenit uusiin tiedostoihin ja importti tohon ylös, ja sitten ton alemman <Route> tagin mukaisesti uus reititys.
const App = () => {

  return (
    <Router>
      <div className="grid-container">
        <Header/>
        <Switch>
          <Route path="/gurupartypage"> <GuruPartyPage/> </Route>
          <Route path="/createpartypage"> <CreatePartyPage/> </Route>
          <Route path="/cart"> <CartPage/> </Route>
          <Route path="/gurupage/"> <GuruPage/> </Route>
          <Route path="/product/:id"> <PartyPackage/> </Route>
          <Route path="/login"><LoginPage/></Route>
          <Route path="/invitetoparty"><InviteToParty/></Route>
          <Route path="/partypage"><PartyPage/></Route>
          <Route path="/RSVP"><RSVP/></Route>
          <Route path="/"> <LandingPage/> </Route>
          <Route path="/profilepage"><Profile/></Route>
        </Switch>
        <footer>
          <p className="footer-text">
          <Link href="/gurupartypage">Gurupartypage </Link>
          <Link href="/createpartypage">Createpartypage </Link>
          <Link href="/cart">Cart </Link>
          <Link href="/gurupage">gurupage </Link>
          <Link href="/product/1">Product id 1 </Link>
          <Link href="/login">Login </Link>
          <Link href="/invitetoparty">Invitetoparty </Link>
          <Link href="/partypage">Partypage </Link>
          <Link href="/RSVP">RSVP</Link>
          <Link href="/profilepage">Profile Page</Link>
          </p>
        </footer>
      </div>
    </Router>
  );
}
export default App
