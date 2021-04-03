import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";
import './GuruPage.css';
import './components/GuruImage';
import GuruImage from "./components/GuruImage";
import GuruInfo from "./components/GuruInfo";
import GuruPartyPackages from "./components/GuruPartyPackages";
import GuruVideo from "./components/GuruVideo";
import { ToggleButton } from '@material-ui/lab';
import GuruAvailability from "./components/GuruAvailability";



const GuruPage = (props)=> {

    const [userProfile, setUserProfile] = useState({})

    let userID='605f83e71a24316b543c6fc7'


    // Initial useEffect on page load that gets the details of the correct guru
    useEffect(() => {

        const fetchData = async () => {
            axios.get(`/api/gurus/`).then(response => {
                console.log(response.data)
                const allGurus = response.data
                setUserProfile(allGurus.find(guru => guru._id === userID))
            })}
        fetchData();
        return () => {
            //
        };
    }, [userID]);





    return (
        <div className="guruGrid">
            <GuruImage guruImage={userProfile.image} guruID={userProfile._id}/>
            <GuruInfo  id={userProfile._id} bio={userProfile.bio} name={userProfile.name} nick={userProfile.nick} />
            <GuruPartyPackages guruID={userProfile._id}/>
            <GuruVideo video={userProfile.video} guruID={userProfile._id}/>
            <div>Calendar goes here</div>
            <GuruAvailability id={userProfile._id} availability={userProfile.availability}/>

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