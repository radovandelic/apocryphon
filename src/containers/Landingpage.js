import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import LangSwitcher from "./LangSwitcher";

class Landingpage extends Component {
  render() {
    var { languages } = this.props;           
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

const mapStateToProps = state => {
  return {
      languages: state.languages
  }
}
Landingpage = connect(
  mapStateToProps,
  null
)(Landingpage)

export default Landingpage;
