import React, {useEffect, useState} from 'react'
import ReactPlayer from "react-player"
import GuruDialog from "./GuruImageDialog";
import axios from "axios";
import {Dialog, DialogActions, DialogTitle, TextField} from "@material-ui/core";


const GuruVideo = (props) =>{

    const [guruVideo, setGuruVideo] = useState("")
    const [newGuruVideoAddress, setNewGuruVideoAddress] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)


    useEffect(() => {
        setGuruVideo(props.video)
        setNewGuruVideoAddress(props.video)
    }, [props]);

    const handleClick = () => {
        setDialogOpen(true)
    }


    const handleClose = () => {
        setDialogOpen(false)
    }

    const handleChange = (event) => {
        setNewGuruVideoAddress(event.target.value)
    }

    const confirmChanges = (event) => {
        setGuruVideo(newGuruVideoAddress)
        axios.put(`/api/gurus/${parseInt(props.guruID)}`, {video: newGuruVideoAddress}).then(response => {
            console.log(response.data)
        })
        setDialogOpen(false)
    }


    return (
        <div>
            <ReactPlayer url={guruVideo} controls width="100%"/>
            <button className="orangeButton" onClick={handleClick}>Change Video URL</button>
            <Dialog maxWidth={'xs'} open={dialogOpen} onClose={handleClose}>
                <DialogTitle>{"Enter the new video url"}</DialogTitle>
                <TextField maxWidth value={newGuruVideoAddress || ''} label="url" onChange={handleChange}  variant="outlined" />
                <button onClick={confirmChanges}>Save</button>




            </Dialog>

        </div>
    )

}

export default GuruVideo