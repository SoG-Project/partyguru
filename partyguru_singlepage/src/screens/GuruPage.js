import React from 'react';
import './GuruPage.css';




const GuruPage = (props)=> {



    return (
        <div className="guruGrid">
            <div>
                <img src={'/images/will-smith.jpg'} alt={"will smith"} width={200} height={230}   />

            </div>
            <div>
                Name: Will Smith <br/>
                Nick: TuoreMinecraftPrinssi<br/>
                BIO: <br/>
                Lorem ipsum dolor sit amet...

            </div>
            <div>
                party packages
            </div>
            <div> Video</div>


        </div>
    )
}
export default GuruPage