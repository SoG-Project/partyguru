import React, {useEffect, useState} from 'react'
import axios from "axios";

import GuruImageDialog from "./GuruImageDialog";
import Button from "@material-ui/core/Button";





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
        setNewGuruImageAddress(guruImage)
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
            <Button style={{minWidth: "80px", minHeight: "40px"}} variant="contained" color="primary" onClick={handleClick}>Change Pic</Button>
            <GuruImageDialog confirmChanges={confirmChanges} newAddress={newGuruImageAddress} dialogOpen={dialogOpen}
                        handleChange={handleChange} handleClose={handleClose}
                        text={"Enter the new image URL"}/>
        </div>

            )





}

export default GuruImage