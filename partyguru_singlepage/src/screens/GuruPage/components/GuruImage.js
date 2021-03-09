import React from 'react'

const GuruImage = (props) =>{

    return (
        <div>
            <img className="profilePic" src={'/images/will-smith.jpg'} alt={"will smith"} width={200} height={200}   />
            <button>Change Pic</button>
        </div>
    )

}

export default GuruImage