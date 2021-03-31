import React, {useEffect, useState} from 'react'
import {ToggleButton} from "@material-ui/lab";


const GuruAvailability = () => {

    const [availability, setAvailability] = useState(false)

    const toggleAvailable = () => {
        if(availability === false)
        setAvailability(true)
    }

    const toggleUnavailable = () => {
        if(availability === true)
        setAvailability(false)
    }


    return (
        <div>

            <h2>Toggle your availability:</h2>
            <div className="buttonGrid">
            <ToggleButton selected={availability} onChange={toggleAvailable} style={{marginBottom: '10px'}}>Available</ToggleButton>
            <ToggleButton selected={!availability} onChange={toggleUnavailable}>Unavailable</ToggleButton>
            </div>

        </div>

    )

}

export default GuruAvailability