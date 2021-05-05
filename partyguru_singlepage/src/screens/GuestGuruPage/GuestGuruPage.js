import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GuestGuruPage.css";
import GuruImage from "../GuruPage/components/GuruImage";
import Typography from "@material-ui/core/Typography";
import GuruVideo from "../GuruPage/components/GuruVideo";
import GuestGuruCheckboxes from "./components/GuestGuruCheckboxes";
import {Button} from "@material-ui/core";


const GuestGuruPage = (props) => {

    const [thisGuru, setThisGuru] = useState()

    useEffect( () => {
        const guruID = window.location.href.split("/ourgurus/").pop()
        axios.get(`/api/gurus/${guruID}`).then((response) => {
            setThisGuru(response.data[0])
        })
    }, [])


    if (thisGuru) return (
        <div className="mainContainer">
            <div className={"guruGuestGrid"}>
                <GuruImage guruImage={thisGuru.image} guruID={thisGuru._id} name={thisGuru.name} nick={thisGuru.nick}/>
                <div>
                    <h2>About {thisGuru.name}:</h2>
                    <Typography style={{fontSize:"1.5rem"}}>
                    {thisGuru.bio}
                    </Typography>
                    <img style={{marginTop: "20px"}}className={"sogImg"} src="https://sog.gg/wp-content/uploads/2019/08/SOG_logo_black-01.png"/>
                </div>
                <GuruVideo video={thisGuru.video} guruID={thisGuru._id}/>
                <GuestGuruCheckboxes guruID={thisGuru._id} guruName={thisGuru._id}/>
                <div className="link">
                    <Button
                        style={{minWidth: "80px", minHeight: "40px", marginTop: "40px", marginBottom: "40px"}}
                        variant="contained"
                        color="primary"
                        href={"/"}
                    >
                        Create a party with {thisGuru.name}!
                    </Button>
                </div>


            </div>

        </div>
    )
    return (<div>Loading...</div>)



};
export default GuestGuruPage;
