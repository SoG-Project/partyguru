import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
//Topright link to Cart brings you here
//Payment page where you can see what is in your cart and make your payment

const CartScreen = () => {
    return(
    <div> 
    <Link to ="/">Party Guru Home Page</Link>
    <p>This is the cart screen. View your cart and pay</p>
    <Link to = "/login">Pay and go to login</Link>
    </div>)
}
export default CartScreen