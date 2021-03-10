import React from 'react'

const GuruImage = (props) =>{

    return (
        <div>
            <img className="profilePic" src={props.guruImage} alt={"will smith"} width={300} height={300}   />
            <button>Change Pic</button>
        </div>
    )

}

export default GuruImage