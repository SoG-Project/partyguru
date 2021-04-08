import React, {useEffect, useState} from 'react'
import {ToggleButton} from "@material-ui/lab";
import axios from "axios";
import {makeStyles} from "@material-ui/core";


// Styling for togglebutton color when selected
const useStyles = makeStyles({
    buttonColor: {
        "&.Mui-selected": {
            backgroundColor: "orange"
        }
    }
});


const GuruAvailability = (props) => {

    const classes = useStyles()
    const [availability, setAvailability] = useState(false)

    // Set the availability on render based on what was retrieved from the DB
    useEffect(() => {
        props.availability && setAvailability(props.availability)
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
            <ToggleButton className={classes.buttonColor} selected={availability} value={1} onChange={toggleAvailable} style={{marginBottom: '10px'}}>Available</ToggleButton>
            <ToggleButton className={classes.buttonColor} selected={!availability} value={2} onChange={toggleUnavailable}>Unavailable</ToggleButton>
            </div>
        </div>

    )

}

export default GuruAvailability