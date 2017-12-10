import React from 'react';

import { NavLink } from 'react-router-dom';

class MobileNavigation extends React.Component {
    hideBavigation = () => {
        var nav = document.getElementById('mobile-navigation');
        nav.classList.remove('active');
        var burger = document.getElementById('burger');
        burger.classList.remove('active'); 
    }
    render() {
        return (
            <div id='mobile-navigation' className="mobile-navigation">
                <NavLink onClick={this.hideBavigation} to='/login'>Login</NavLink>
                <NavLink onClick={this.hideBavigation} to='/logout'>Logout</NavLink>
                <NavLink onClick={this.hideBavigation} to='/register'>Sign Up</NavLink>
                <NavLink onClick={this.hideBavigation} to='/dashboard'>Dashboard</NavLink>
            </div>
        )
    }
}

export default MobileNavigation;