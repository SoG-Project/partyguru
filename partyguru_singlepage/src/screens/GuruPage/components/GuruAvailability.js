import React, {useEffect, useState} from 'react'
import {ToggleButton} from "@material-ui/lab";
import axios from "axios";


const GuruAvailability = (props) => {

    const [availability, setAvailability] = useState(false)

    // Set the availability on render based on what was retrieved from the DB
    useEffect(() => {
        props.availability && setAvailability(props.availability[0])
    }, [props]);


    const toggleAvailable = () => {
        if(availability === false) {
            setAvailability(true)
            axios.put(`/api/gurus/${props.id}`, {availability: true}).then(response => {
                console.log(response.data)
            })
        }
    }

    const toggleUnavailable = () => {
        if(availability === true) {
            setAvailability(false)
            axios.put(`/api/gurus/${props.id}`, {availability: false}).then(response => {
                console.log(response.data)
            })
        }
    }
    
    return (

        <div className="availability">
            <h2>Toggle your availability:</h2>
            <div className="buttonGrid">
            <ToggleButton selected={availability} onChange={toggleAvailable} style={{marginBottom: '10px'}}>Available</ToggleButton>
            <ToggleButton selected={!availability} onChange={toggleUnavailable}>Unavailable</ToggleButton>
            </div>
        </div>

    )

}

export default GuruAvailability