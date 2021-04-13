import React, { Component } from "react";
/*This seemed like a good option for the theme select
unfortunately didn't render the images but might look into this later*/

class Theme2 extends Component {
constructor(){
  super();

  this.onClickForward = this.onClickForward.bind(this)
  this.onClickBack = this.onClickBack.bind(this)

  const img0 = require ('./Images/defaulttheme.png');
  const img1 = require ('./Images/flametheme.png');
  const img2 = require ('./Images/spacetheme.png')

  this.state = {
    index: 0,
    imgList: [img0, img1, img2]
  }
}

onClickForward(){
  if (this.state.index + 1 === this.state.imgList.length) {
    this.setState({
      index: 0
    })
  } else {
    this.setState({
      index: this.state.index + 1
    })
  }
}
onClickBack(){
  if (this.state.index - 1 === -1) {
    this.setState({
      index: this.state.imgList.length - 1
    })
  } else {
    this.setState({
      index: this.state.index -1
    })
  }
}

render(){

  return(
    <div>
      <img src={this.state.imgList[this.state.index]} alt="" /><br />
      <button onClick={this.onClickBack}>Back</button>
      <button onClick={this.onClickForward}>Forward</button>
    </div>
  )
}

}

export default Theme2;