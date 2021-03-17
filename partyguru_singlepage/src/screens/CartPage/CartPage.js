import React from 'react';
import {Link} from 'react-router-dom';
//Topright link to Cart brings you here
//Payment page where you can see what is in your cart and make your payment

const CartPage = () => {
    return(
    <div> 
    <Link to ="/">Party Guru Home Page</Link>
    <p>This is the cart screen. View your cart and pay</p>
    <Link to = "/login">Pay and go to login</Link>
    </div>)
}
export default CartPage