import React from "react";
import "./theme3.css";
import flametheme from './Images/flametheme.png';
import defaulttheme from './Images/defaulttheme.png';
import spacetheme from './Images/spacetheme.png';
//This kind of works but I can only swap between two different themes with this

const imagesPath = {
    flame: flametheme,
    space: spacetheme, //can't use this
    basic: defaulttheme
  }
  
  class Themeswap extends React.Component {
    state = {
      open: true
    }
    toggleImage = () => {
      this.setState(state => ({ open: !state.open }))
    }
  
    getImageName = () => this.state.open ? 'basic' : 'flame' //Only possible to toggle between two different images with this
  
    render() {
      const imageName = this.getImageName();
      return (
        <div className="comptheme">
          <img alt="Theme 3" src={imagesPath[imageName]} onClick={this.toggleImage} />
        </div>
      );
    }
  }
  export default Themeswap;