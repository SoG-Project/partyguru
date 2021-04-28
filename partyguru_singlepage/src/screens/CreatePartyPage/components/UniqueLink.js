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
                Voit kokeilla kans näitä ID:itä RSVP sivun urlissa: 605f8bcd8dfd970aa770584b - 605f8bcd8dfd970aa770584a - 606f3b274136e65a35f41d1d

            </div>
        );
};

export default UniqueLink;

/* href={`/RSVP/${props.partyID}`} */