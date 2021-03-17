import react, { useState } from "react"
import {Link} from "react-router-dom"
import "./InviteToParty.css"


const handleSubmit = () => {
    return(0)
}

const handleChange = (event) => {

}

const InviteToParty = () => {
    
    const[description, changeDescription] = useState("Please input a party description that will be included in the party invitations by email.");

    return(
    <div>
        <Link to="/createpartypage">Back</Link>
        <div class="mainheader">
            <h1>Party Package finalization 2/2</h1>
            <p>Personalize party invitations</p>
        </div>
        
        
        <div class="partydescription">
            <h1>Party description</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" value={description}/>
                </label>
            </form>
        </div>
        <Link to="/partypage">Send Invites and go to party page</Link>
    </div>
    )
}

export default InviteToParty