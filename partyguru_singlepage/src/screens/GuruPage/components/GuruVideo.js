import React, {useEffect, useState} from 'react'
import ReactPlayer from "react-player"
import axios from "axios";
import {Dialog, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


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
        axios.put(`/api/gurus/${(props.guruID)}`, {video: newGuruVideoAddress}).then(response => {
        })
        setDialogOpen(false)
    }


    return (
        <div>
            <ReactPlayer url={guruVideo} controls width="100%"/>
            {props.guruPage ? <Button style={{minWidth: "80px", minHeight: "40px"}} variant="contained" color="primary" className="orangeButton" onClick={handleClick}>Change Video URL</Button> : <div></div>}
            <Dialog maxWidth={'xs'} open={dialogOpen} onClose={handleClose}>
                <DialogTitle>{"Enter the new video url"}</DialogTitle>
                <TextField style={{marginBottom: '15px', marginRight:'5px', marginLeft:'5px'}} maxWidth value={newGuruVideoAddress || ''} label="url" onChange={handleChange}  variant="outlined" />
                <Button style={{minWidth: "80px", minHeight: "20px", marginBottom: '5px'}} variant="contained" color="primary" className="flexAlignThis" onClick={confirmChanges}>Save</Button>
            </Dialog>

        </div>
    )

}

export default GuruVideo