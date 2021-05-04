import React, {useState, useEffect} from 'react'
import {TextField} from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";



const GuruInfo = (props) =>{

    const id = props.id
    const [editMode, setEditMode] = useState(false)
    const [guruInfo, setGuruInfo] = useState({
        name: "", nick: "", bio: ""})
    const [editedGuruInfo, setEditedGuruInfo] = useState({
        name: "", nick: "", bio: ""})


    // Initially setting the state of the guruInfo object on render
    useEffect(() => {
        const newGuruInfo = {name: props.name, nick:props.nick, bio:props.bio}
        setGuruInfo(newGuruInfo);
        setEditedGuruInfo(newGuruInfo)
    }, [props]);


    //Turn editmode on or off

    const handleClick = () => {

        setEditMode(!editMode)
    }


    // Event handlers for changing the textfield inputs
    const handleNameChange = (event) => {
        const newGuruInfo= {
            ...editedGuruInfo, name: event.target.value
        }
        setEditedGuruInfo(newGuruInfo)
    }

    const handleNickChange = (event) => {
        const newGuruInfo= {
            ...editedGuruInfo, nick: event.target.value
        }
        setEditedGuruInfo(newGuruInfo)
    }

    const handleBioChange = (event) => {
        const newGuruInfo= {
            ...editedGuruInfo, bio: event.target.value
        }
        setEditedGuruInfo(newGuruInfo)
    }

    //Confirm changes to text fields
    const handleSubmit = () => {
        setGuruInfo(editedGuruInfo)
        setEditMode(!editMode)

        axios.put(`/api/gurus/${id}`, editedGuruInfo).then(response => {
            console.log(response.data)
        })

    }


    //return this if editmode is turned off
    if (editMode === false) return (
        <div className="infoEdit">
            <form>
                <TextField style={{marginBottom: '15px'}} InputLabelProps={{style: {fontSize: 15}}} inputProps={{style: {fontSize: 12}}} value={guruInfo.name || ''} label="Name" onChange={handleNameChange}  variant="outlined" disabled/>   <br/>
                <TextField style={{marginBottom: '15px'}} InputLabelProps={{style: {fontSize: 15}}} inputProps={{style: {fontSize: 12}}} value={guruInfo.nick || ''} label="Nick" onChange={handleNickChange} variant="outlined" disabled/>  <br/>
                <TextField style={{marginBottom: '1px'}} InputLabelProps={{style: {fontSize: 15}}} inputProps={{style: {fontSize: 12}}} value={guruInfo.bio || ''} multiline rows="13" fullWidth label="Bio" onChange={handleBioChange} variant="outlined" disabled/>   <br/>
            </form>
            <Button style={{minWidth: "80px", minHeight: "40px"}} variant="contained" color="primary" className="flexAlignThis" onClick={handleClick}>Edit</Button>
        </div>
    )

    //return this if editmode is turned on

    if (editMode === true) return (

        <div className="infoEdit">
            <form onSubmit={handleSubmit}>
            <TextField style={{marginBottom: '15px'}} InputLabelProps={{style: {fontSize: 15}}} inputProps={{style: {fontSize: 12, background:'white'}}} value={editedGuruInfo.name || '' } label="Name" onChange={handleNameChange}  variant="outlined"/> <br/>
            <TextField style={{marginBottom: '15px'}} InputLabelProps={{style: {fontSize: 15}}} inputProps={{style: {fontSize: 12, background:'white'}}} value={editedGuruInfo.nick || ''} label="Nick" onChange={handleNickChange} variant="outlined"/>  <br/>
            <TextField style={{marginBottom: '1px', background:'white'}}  InputLabelProps={{style: {fontSize: 15, background:'white'}}} inputProps={{style: {fontSize: 12, background:'white'}}} value={editedGuruInfo.bio || ''} multiline rows="12" fullWidth label="Bio" onChange={handleBioChange} variant="outlined"/>   <br/>
            </form>
            <Button style={{minWidth: "80px", minHeight: "40px"}} variant="contained" color="primary" className="flexAlignThis" onClick={handleSubmit}>Save</Button>

        </div>

    )

}

export default GuruInfo