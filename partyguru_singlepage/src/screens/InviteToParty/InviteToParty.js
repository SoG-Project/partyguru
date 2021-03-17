import react, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import "./InviteToParty.css"
import axios from 'axios'
import { response } from "express"





const InviteToParty = () => {
    
    //VAIHTAA DESCRIPTION-KENTÄN TILAA. TÄHÄN KIRJOITETAAN EMAILIN SISÄLTÖ
    const[description, changeDescription] = useState("Please input a party description that will be included in the party invitations by email.");

    useEffect(() => {
        //KAATAA KOODIN
        const partypack = getData()
        console.log(partypack, ' was passed from getData')
        //TARKOITUS LAITTAA DESCRIPTION TEKSTIKENTÄN TEKSTIKSI ALUSSA
        //changeDescription(partypack.description)
      }, [])
    
    const getData = () => {
        let id=1;
        axios.get(`/api/parties/${id}`).then(response => {
        
        //setState(response.data);
        const {partypack} = response.data
        
        
        
        changeDescription(response.data.description)
        console.log(response.data);
        //return(partypack)
        //return(response.data)
    })
    }

    const handleChange = (event) => {
        changeDescription(event.target.value)
    }

    const handleSubmit = () => {
        return(0)
    }

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
                    <input type="text" /*value={description}*/ onChange={handleChange}/>
                </label>
            </form>
        </div>
        <Link to="/partypage">Send Invites and go to party page</Link>
    </div>
    )
}

export default InviteToParty