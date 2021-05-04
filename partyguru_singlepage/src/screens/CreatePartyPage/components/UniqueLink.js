import React, { useState } from "react";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";

const UniqueLink = (props) => {
  const [uniqueLink, setUniqueLink] = useState();

  const generateLink = () => {
    setUniqueLink(
      window.location.href.split("createpartypage")[0] + "RSVP/" + props.partyID
    );
    props.setGuestsInvited(true);
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom style={{marginLeft:"15%"}}>Invite guests</Typography>
      <Typography paragraph style={{ fontSize: "1.7rem", width:"50%" }}>
        Click the "Generate Link" button below. Then, share the generated link to people you want to invite to your party through any way you want (for example through email or text message).
      </Typography>
      <TextField
        style={{ width: "35%", marginBottom:"1%" }}
        inputProps={{
          style: { fontSize: "2rem", lineHeight: "150%" },
        }}
        value={uniqueLink}
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        style={{ fontSize: "1.5rem", marginLeft:"1%"}}
        onClick={generateLink}
      >
        Generate link
      </Button>
    </div>
  );
};

export default UniqueLink;
