import { React, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Button, Grid } from "@material-ui/core";
import LoginButton from "../LandingPage/components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
//Topright link to Cart brings you here
//Payment page where you can see what is in your cart and make your payment

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "1rem",
    margin: "1rem",
  },
  buttons: {
    margin: "3vh",
  },
}));

const CartPage = (props) => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [paymentStatus, changePaymentStatus] = useState(false);

  const handlePaymentClick = () => {
    const paid = true;
    changePaymentStatus(paid);
    console.log("Payment status is ", paymentStatus);
  };

  const handleCreateParty = () => {
    console.log("Käyttäjän ID on ", user.sub)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.mainContainer}>
      <p>This is the cart screen. View your cart and pay</p>

      <Button
        className={classes.buttons}
        id="paymentbtn"
        variant="contained"
        onClick={handlePaymentClick}
      >
        Payment
      </Button>
      {paymentStatus && <p>Payment status is true</p>}

      {isAuthenticated && paymentStatus ? (
        <div>
          <Button className={classes.buttons} variant="contained" onClick={handleCreateParty}>
            Let's make a party!
          </Button>
        </div>
      ) : 
        <div>
          {isAuthenticated && (<div>
            <h1>You must pay before you can make a party</h1>
          </div>)}
        </div>
      }
    </div>
  );
};
export default CartPage;
