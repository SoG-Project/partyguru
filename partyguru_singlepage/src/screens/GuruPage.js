import React from 'react';
import {Link} from "react-router-dom";
import './GuruPage.css';

const GuruPage = (props)=> {

    return (
        <div className="guruGrid">
            <div>
                <img src={'/images/will-smith.jpg'} alt={"will smith"} width={200} height={230}   />
            </div>
            <div>
                <h2>
                    Party Guru Info
                </h2>
                <p>
                    Name: Will Smith <br/>
                    Nick: TuoreMinecraftPrinssi<br/>
                    BIO: <br/>
                    Lorem ipsum dolor sit amet...
                </p>
            </div>
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