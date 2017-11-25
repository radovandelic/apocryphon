import React, { Component } from "react";

class LangSwitcher extends Component {
  render() {
    return (
        <div className="language_switcher">
          <div className="description">Choose Your Origin Language.</div>
            <img className="flag" src="http://www.mmseabg.com/images/djmediatools/3-statiya-001/United-Globe.png" />
          <div className="select">
            <select>
              <option value="dutch">Dutch</option>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>
        </div>

         );
  }
}

export default LangSwitcher;
