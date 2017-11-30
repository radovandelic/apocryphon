import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="left">
          <NavLink to='/landingpage' className="logo" alt=" "></NavLink>
        </div>
        <div className="right">
          <NavLink to='/landingpage'>Login</NavLink>
          <NavLink to='/landingpage'>Sign Up</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </div>
      </header>
    )
  }
}

export default Header;