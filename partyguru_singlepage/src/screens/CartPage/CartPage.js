import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
//Topright link to Cart brings you here
//Payment page where you can see what is in your cart and make your payment

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "1rem",
    margin: "1rem",
  },
}));

const CartPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Link to="/">Party Guru Home Page</Link>
      <p>This is the cart screen. View your cart and pay</p>
      <Link to="/login">Pay and go to login</Link>
    </div>
  );
};
export default CartPage;
