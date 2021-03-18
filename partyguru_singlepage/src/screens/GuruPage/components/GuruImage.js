import React, {useEffect, useState} from 'react'
import axios from "axios";
import {TextField} from "@material-ui/core";
import {Dialog} from "@material-ui/core";
import {DialogTitle} from "@material-ui/core";


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


    const handleChange = (event) => {
        setNewGuruImageAddress(event.target.value)
    }

   return (
        <div>
            <img className="profilePic" src={guruImage} alt={"will smith"} width={300} height={300}   />
            <button onClick={handleClick}>Change Pic</button>
            <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>Get rekt</DialogTitle>
            </Dialog>
        </div>
    )




}

export default GuruImage