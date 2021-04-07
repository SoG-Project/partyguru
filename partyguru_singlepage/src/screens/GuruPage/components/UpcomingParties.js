import React, {useEffect, useState} from 'react'
import {ToggleButton} from "@material-ui/lab";
import axios from "axios";
import {makeStyles} from "@material-ui/core";


// Styling for togglebutton color when selected
const UpcomingParties = (props) => {

    const [parties, setParties] = useState([])
    const [nameArray, setNameArray] = useState([])


    useEffect(() => {


        axios.get('/api/parties').then(response => {
           setParties(response.data.filter(party => party.guruid === props.guruID))
        })


    }, [props.guruID]);




    return (
        <div className="upcomingParties">
            <ul>
                {parties.map((party, index) => <li key={party._id}>  Date:{party.datetime}
                    Package: {(party.packageid)} Guests: {party.num_attendees} </li>
                )}
            </ul>
        </div>
    )

}

export default UpcomingParties