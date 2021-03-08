import react from "react"
import {Link} from "react-router-dom"

const InviteToParty = () => {
    
    return(
    <div>
        <Link to="/createpartypage">Back</Link>
        <h1>Party Package finalization 2/2</h1>
        <p>Personalize party invitations</p>
        <Link to="/createpartypage">Send Invites</Link>
    </div>
    )
}

export default InviteToParty