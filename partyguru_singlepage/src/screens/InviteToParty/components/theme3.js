import React, { Component } from "react";
import "./theme3.css";

//This kind of works but I can only swap between two different themes with this
const imagesPath = {
    flame: "https://kjeh.fi/iKTpb",
    space: "https://kjeh.fi/gLuYo", //can't use this yet
    basic: "https://i.pinimg.com/originals/59/2e/81/592e812f43f66758178347430b992436.png"
  }
  
  class Themeswap extends React.Component {
    state = {
      open: true
    }
    toggleImage = () => {
      this.setState(state => ({ open: !state.open }))
    }
  
    getImageName = () => this.state.open ? 'basic' : 'flame'
  
    render() {
      const imageName = this.getImageName();
      return (
        <div className="comptheme">
          <img src={imagesPath[imageName]} onClick={this.toggleImage} />
        </div>
      );
    }
  }
  export default Themeswap;