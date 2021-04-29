import { React, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import LoginButton from "../LandingPage/components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
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
    const testID = '605f8bcd8dfd970aa770584a'
    axios.put(`/api/parties/${testID}`,{userid: user.sub+1}).then(response => {
      console.log(response.data)
    })
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

      {isAuthenticated && paymentStatus ? (
        <div>
          <h1>You're ready!</h1>
          <Button className={classes.buttons} variant="contained" onClick={handleCreateParty}>
            Let's make a party!
          </Button>
        </div>
      ) : 
        <div>

          {isAuthenticated ? (<div>
            <h1>You must pay before you can make a party</h1>
          </div>) 
          : 
          <div> 
            <p>Create an account to easily access your party!</p>
            <LoginButton URL={"http://localhost:3000/cart"} />
          </div>}
          
        </div>
      }
    </div>
  );
};
export default CartPage;
