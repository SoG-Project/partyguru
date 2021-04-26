import { Grid, TextField, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import CostCalculator from "./CostCalculator";

//Create styles with Material UI
const useStyles = makeStyles((theme) => ({
  contactFields: {
    fontSize: "2rem",
    margin: "3px",
    minWidth: "60%",
    maxWidth: "60%",
  },
}));

//Creates three contact information fields: name, email, and phone number
//All fields are TextFields contained in Grid items inside a Grid
//Maybe need states for name, email, number?
const ContactInfoFields = () => {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleNameChange = () => {
    const nameInput = document.getElementById("nameInput").value;
    console.log(nameInput);
    setName(nameInput);
  };

  const handleEmailChange = () => {
    const emailInput = document.getElementById("emailInput").value;
    console.log(emailInput);
    setEmail(emailInput);
  };

  return (
    <div>
      <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4">
              Please enter your contact information so we can contact you in case anything regarding your party changes
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              color="primary"
              id="nameInput"
              label={
                <Typography style={{fontSize: "1.5rem"}}>
                  Your name
                </Typography>
              }
              className={classes.contactFields}
              onChange={handleNameChange}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              color="primary"
              id="emailInput"
              label={
                <Typography style={{fontSize: "1.5rem"}}>
                  Email address
                </Typography>
              }
              className={classes.contactFields}
              onChange={handleEmailChange}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
          </Grid>
{/*          <Grid item>
            <TextField
              variant="outlined"
              color="primary"
              label={
                <Typography style={{fontSize: "1.5rem"}}>
                  Phone number
                </Typography>
              }
              className={classes.contactFields}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
            </Grid>*/}
      </Grid>
    </div>
  );
};
export default ContactInfoFields;
