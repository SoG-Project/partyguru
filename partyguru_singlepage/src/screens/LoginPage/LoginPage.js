import {Link} from 'react-router-dom';
import React from 'react';
import {makeStyles} from '@material-ui/core';
import Profile from "../ProfilePage/ProfilePage"
import { useAuth0 } from '@auth0/auth0-react'
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
    const { isAuthenticated } = useAuth0()

    return(
    <div className={classes.mainContainer}> 
    <Profile></Profile>
        {isAuthenticated && (
        <Link to="/createpartypage">Create party page</Link>)}
    </div>)
}
export default LoginPage