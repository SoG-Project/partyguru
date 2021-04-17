//Former component for hiding the component, not needed atm
import React, { Component } from "react";
import defaulttheme from './Images/defaulttheme.png';
import flametheme from './Images/flametheme.png';
import spacetheme from './Images/spacetheme.png';

class Theme1 extends Component {
  constructor() {
    super();
    this.state = {
      showHideTheme: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    switch (name) {
      case "showHideTheme":
        this.setState({ showHideTheme: !this.state.showHideTheme });
        break;
    }
  }

  render() {
    const { showHideTheme} = this.state;
    return (
      <div>
        <table>
          {showHideTheme && (
            <img src={defaulttheme}/>
            
          )}
          <tr>
            <td>
              <button onClick={() => this.hideComponent("showHideTheme")}>
                Show this theme
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Theme1;