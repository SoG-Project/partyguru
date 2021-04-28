import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Button, TextField} from "@material-ui/core";

const UniqueLink = (props) => {

    const [uniqueLink, setUniqueLink] = useState()

    const generateLink = () => {

        setUniqueLink(window.location.href.split("createpartypage")[0] + "RSVP/" + props.partyID)
    }

        return (
            <div>
                <p>Clicky click and make a link:</p>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={generateLink}>
                    Generate link</Button>
                <TextField value={uniqueLink || ''}></TextField>

            </div>
        );
};

export default UniqueLink;

/* href={`/RSVP/${props.partyID}`} */