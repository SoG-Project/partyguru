import React, {useEffect, useState} from 'react'
import axios from "axios";
import {TextField} from "@material-ui/core";
import {Dialog} from "@material-ui/core";
import {DialogTitle, DialogContent, DialogContentText, DialogActions} from "@material-ui/core";
import {flexbox} from '@material-ui/system';
import GuruImageDialog from "./GuruImageDialog";




const GuruImage = (props) =>{



    const [guruImage, setGuruImage] = useState("")
    const [newGuruImageAddress, setNewGuruImageAddress] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)


    useEffect(() => {
        setGuruImage(props.guruImage)
        setNewGuruImageAddress(props.guruImage)
    }, [props]);

    const handleClick = () => {
        setDialogOpen(true)
    }


    const handleClose = () => {
        setDialogOpen(false)
    }

    const confirmChanges = (event) => {
        setGuruImage(newGuruImageAddress)
        axios.put(`/api/gurus/${(props.guruID)}`, {image: newGuruImageAddress}).then(response => {
            console.log(response.data)
        })
        setDialogOpen(false)
    }

    const handleChange = (event) => {
        setNewGuruImageAddress(event.target.value)
    }

   return (
        <div className="gImage">
            <img className="profilePic" src={guruImage} alt={"profilePic"}   />
            <button onClick={handleClick}>Change Pic</button>
            <GuruImageDialog confirmChanges={confirmChanges} newAddress={newGuruImageAddress} dialogOpen={dialogOpen}
                        handleChange={handleChange} handleClose={handleClose}
                        text={"Enter the new image URL"}/>
        </div>
    )




}

export default GuruImage