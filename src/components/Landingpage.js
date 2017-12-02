import React from "react";
import { Link } from 'react-router-dom';

import LangSwitcher from "../containers/LangSwitcher";

const Landingpage = () => {
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

export default Landingpage;
