import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="left">
          <NavLink to='/' className="logo" alt=" "></NavLink>
        </div>
        <div className="right">
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/logout'>Logout</NavLink>
          <NavLink to='/register'>Sign Up</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </div>
      </header>
    )
  }
}

export default Header;