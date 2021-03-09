import React, {useState} from 'react'


const GuruInfo = (props) =>{

    const [editMode, setEditMode] = useState(false)

    const handleClick = () => {

        console.log("sad")
    }



    return (
        <div className="info">
            <p>
                <b>Guru Info:</b><br/>
                Name: Will Smith <br/>
                Nick: TuoreMinecraftPrinssi<br/>
                BIO: <br/>
                Lorem ipsum dolor sit amet... <br/>
                <button onClick={handleClick}>Edit</button>

            </p>
        </div>
    )

}

export default GuruInfo