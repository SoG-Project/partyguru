import { Grid, TextField, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  contactFields: {
    fontSize: "2rem",
    margin: "3px",
    minWidth: "60%",
    maxWidth: "60%",
  },
}));

const ContactInfoFields = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4">
              Please enter contact information
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              color="primary"
              label={
                <Typography style={{fontSize: "1.5rem"}}>
                  Your name
                </Typography>
              }
              className={classes.contactFields}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              color="primary"
              label={
                <Typography style={{fontSize: "1.5rem"}}>
                  Email address
                </Typography>
              }
              className={classes.contactFields}
              inputProps={{
                style: { fontSize: "1.5rem", lineHeight: "150%" },
              }}
            />
          </Grid>
          <Grid item>
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
          </Grid>
      </Grid>
    </div>
  );
};
export default ContactInfoFields;
