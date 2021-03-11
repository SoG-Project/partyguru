import React, {useState, useEffect} from 'react'
import {TextField} from "@material-ui/core";


const GuruInfo = (props) =>{


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


    const handleClick = () => {
        setEditMode(!editMode)
    }


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

    const handleSubmit = (event) => {
        event.preventDefault()
        setGuruInfo(editedGuruInfo)
        setEditedGuruInfo(guruInfo)
        setEditMode(!editMode)

    }


    if (editMode === false) return (
        <div className="info">
            <p>
                <b>Guru Info:</b><br/>
                Name: {guruInfo.name} <br/>
                Nick: {guruInfo.nick}<br/>
                BIO: <br/>
                {guruInfo.bio} <br/>
                <button onClick={handleClick}>Edit</button>

            </p>
        </div>
    )

    if (editMode === true) return (

        <div>
            <form onSubmit={handleSubmit}>
            <TextField value={editedGuruInfo.name} label="name" onChange={handleNameChange}/> <br/>
            <TextField value={editedGuruInfo.nick} label="nick" onChange={handleNickChange}/> <br/>
            <TextField value={editedGuruInfo.bio} multiline label="bio" onChange={handleBioChange}/>  <br/>
            <button type="submit">Save</button>
            </form>

        </div>

    )

}

export default GuruInfo