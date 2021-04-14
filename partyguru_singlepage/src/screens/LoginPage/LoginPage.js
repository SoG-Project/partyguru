import {Link} from 'react-router-dom';
import React from 'react';
import {makeStyles} from '@material-ui/core';
import Profile from "../ProfilePage/ProfilePage"
//Topright link to Cart brings you here
//Payment page where you can see what is in your cart and make your payment

const useStyles = makeStyles((theme) => ({
    mainContainer: {
      padding: "1rem",
      margin: "1rem",
    },
  }));
  

const LoginPage = ()=> {
    const classes = useStyles();
    return(
    <div className={classes.mainContainer}> 
    <Profile></Profile>
        <p>Login screen to login customer or create account</p>
        <Link to="/createpartypage">Create party page</Link>
    </div>)
}
export default LoginPage