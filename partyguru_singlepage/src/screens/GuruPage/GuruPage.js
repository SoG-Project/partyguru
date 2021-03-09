import React from 'react';
import {Link} from "react-router-dom";
import './GuruPage.css';
import './components/GuruImage';

import GuruImage from "./components/GuruImage";
import GuruInfo from "./components/GuruInfo";

const GuruPage = (props)=> {

    return (
        <div className="guruGrid">
            <GuruImage/>
            <GuruInfo/>

            <div>
                <p>Party packages</p>
            </div>
            <div> 
                <p>Video</p>
            </div>
            <div>
                <Link to = "/partypage">Go to party page</Link>
            </div>
            <div>
                <Link to = "/">Back</Link>
            </div>
        </div>
    )
}
export default GuruPage