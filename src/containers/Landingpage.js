import React, { Component } from "react";
import Header from "../components/Header";
import LangSwitcher from "./LangSwitcher";

class Landingpage extends Component {
  render() {
    return (
      <div className="app landingPg_app">
        <Header />
        <div className="langSwitcher_boxes">
          <LangSwitcher />
          <LangSwitcher />
        </div>
        <div className="landingPg_btn">
          <input type="button" class="lpButton button" value="SUBMIT" />
        </div>
      </div>
    );
  }
}

export default Landingpage;
