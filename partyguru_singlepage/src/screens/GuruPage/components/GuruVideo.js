import React, {useState} from 'react'
import ReactPlayer from "react-player"


const GuruVideo = (props) =>{


    const handleClick = () => {


    }



    return (
        <div>
            <ReactPlayer url={props.video} controls width="100%"/>
            <button>Change Video URL</button>

        </div>
    )

}

export default GuruVideo