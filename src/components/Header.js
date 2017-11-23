import React, {Component} from "react";

class Header extends Component{
    render (){
        return (
        <header className="header">
        <div className="left">
          <img className="logo" alt=" "></img>
        </div>
        <a href='/' className="right">
          Login
        </a>
        </header>
        ) 
    }
}

export default Header;