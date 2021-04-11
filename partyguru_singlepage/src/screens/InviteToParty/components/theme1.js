import React, { Component } from "react";

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
            /*Struggling to get my preview from the InviteToParty here,
            have to use props I think */
            <div>Tähän tulee siisti teema</div>
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