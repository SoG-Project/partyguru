import { Link } from "react-router-dom"
import React from 'react'

//Screen for party page and it's contents
const PartyPage= () => {
    return(
        <div>
            <p>Page for party page: details, timetable, guru info etc</p>
            <Link to="/">Back to home</Link>
        </div>
    )
}
export default PartyPage