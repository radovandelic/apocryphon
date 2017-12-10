import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Header extends Component {
  openMobileNavigation = () => {
    var nav = document.getElementById('mobile-navigation');
    nav.classList.toggle('active'); 
    var burger = document.getElementById('burger');
    burger.classList.toggle('active'); 
  }
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
        <div id='burger' className="burger" onClick={this.openMobileNavigation} >
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      </header>
    )
  }
}

export default Header;