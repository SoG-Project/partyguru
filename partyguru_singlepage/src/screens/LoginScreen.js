import {Link} from 'react-router-dom';
import React from 'react';
//Topright link to Cart brings you here
//Payment page where you can see what is in your cart and make your payment

const LoginScreen = ()=> {
    return(
    <div> 
        <p>Login screen to login customer or create account</p>
        <Link to="/createpartypage">Create party page</Link>
    </div>)
}
export default LoginScreen