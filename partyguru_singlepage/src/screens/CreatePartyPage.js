import React from 'react';
import {Link} from "react-router-dom";
import "./CreatePartyPage.css"

const CreatePartyPage = () => {
    return(
        <div>
          <div className ="partyguruinfobox">
            <h1>Party Guru</h1>
            <p>
                Our Party Gurus host the most awesome parties for partiers of any age.<br/>
                Parties are hosted on the Discord voice application and in various games <br/>
                available in our selection. <br/>
                Choose your package and get partying. Do it now!
            </p>
          </div>
          
          <div>Schedule</div>
          <div class="schedulebox">
            <div>Minecraft</div>
            <div>Birthday Cheer</div>
            <div>Minecraft mod 1</div>
            <div>Eat cake</div>
            <div>Minecraft mod 2</div>
          </div>
          <div>Available activities</div>
          <div class="schedulebox">
            <div>Minecraft</div>
            <div>Birthday Cheer</div>
            <div>Minecraft mod 1</div>
            <div>Eat cake</div>
            <div>Minecraft mod 2</div>
          </div>
          <div>
          <Link to ="/invitetoparty">To invitation creation</Link> 
          </div>
          </div>
    )
}

export default CreatePartyPage