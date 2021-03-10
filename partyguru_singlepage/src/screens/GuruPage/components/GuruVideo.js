import React, {useState} from 'react'
import ReactPlayer from "react-player"


const GuruVideo = (props) =>{


    const handleClick = () => {


    }



    return (
        <div>
            <ReactPlayer url={props.video} controls width="500px"/>
            <button>Change Video URL</button>

        </div>
    )

}

export default GuruVideo