import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import "./CreateNewGuru.css";
import {CircularProgress, Dialog, TextField, Typography} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";


const CreateNewGuru = (props) => {
    const [userProfile, setUserProfile] = useState({});
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()



    const createNewGuruPage = () => {

        axios.get(`/api/gurus/`).then((response) => {

            if (response.data.some(guru => guru.useauthid === user.sub )) {
                alert("You are already a party guru!")

            } else axios.post(`/api/gurus/`,{name: name, nick:"", email:"", partyreservations:[], useauthid:user.sub, availability: false,
                video: "https://www.youtube.com/watch?v=EfnG4zstVjU", image: "https://sog.gg/wp-content/uploads/2019/08/SOG_logo_black-01.png", bio: "" }).then(response => {
                console.log(response.data)
                history.push("/gurupage/")
            });

        });
    }

    if (isAuthenticated) return (
        <div className="mainContainer">
        <div className="creationBox">
            <div>
                <h1>Create a new Guru profile</h1>
                <TextField style={{width:250}} value={name ||""} onChange={(e)=> setName(e.target.value)} label="Name"  variant="outlined" />
                <TextField style={{width:250}} type="password" value={password||""} onChange={(e)=> setPassword(e.target.value)} label="Password"  variant="outlined" />
                <Button variant="contained" color="primary" style={{minWidth: "80px", minHeight: "40px"}} onClick={createNewGuruPage}>
                    Create
                </Button>
                <img className={"sogImg"} src="https://sog.gg/wp-content/uploads/2019/08/SOG_logo_black-01.png"/>

            </div>

        </div>
        </div>
    )
    if (isLoading) return (
        <div
            style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                margin:"4%",
            }}
        >
            {/*This area is rendered while the package has not been fetched, usually for a very brief amount of time*/}
            <Typography variant="h4">Page loading...</Typography>
            <CircularProgress
                color="secondary"
                disableShrink
                size="15vh"
                style={{ margin: "3%" }}
            />
            <Typography variant="h4">
                If you see this page for an extended period of time something has
                likely gone wrong.
            </Typography>
        </div>
    )


};
export default CreateNewGuru;
