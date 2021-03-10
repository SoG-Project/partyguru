import React, {useState} from 'react'


const GuruInfo = (props) =>{

    const [editMode, setEditMode] = useState(false)
    const [bio, setBio] = useState("Lorem ipsum dolor sit amet...")

    const handleClick = () => {

    }



    return (
        <div className="info">
            <p>
                <b>Guru Info:</b><br/>
                Name: {props.name} <br/>
                Nick: {props.nick}<br/>
                BIO: <br/>
                {props.bio} <br/>
                <button onClick={handleClick}>Edit</button>

            </p>
        </div>
    )

}

export default GuruInfo