import React, { Component } from "react";
import { Link } from 'react-router-dom';

import LangSwitcher from "./LangSwitcher";

class Landingpage extends Component {
  render() {
    return (
      <div className="content landingPg_app">
        <div className="langSwitcher_boxes">
          <LangSwitcher direction="origin" />
          <LangSwitcher direction="target" />
        </div>
        <div className="landingPg_btn">
          <div>
            <Link to='/dashboard'>
              <button className="lpButton button">Start</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landingpage;
