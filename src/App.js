import React, { Component } from 'react';
import { Level, Languages } from './containers';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class App extends Component {
  render = () => {
    var { level, language } = this.props;     // redux
    var currentWordImage = {
      backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O4U1BhYSDu4aPavo_237sC0w0r2eDgVKHVjkDPFhjvnywFDn)"
    }
    return (
      <div className="app">
        <header className="header">
        <div className="left">
          <img className="logo" alt=" "></img>
          <a href='/' className="name">apocryphon</a>
        </div>
        <a href='/' className="right">
          Login
        </a>
        </header>

        <div className="content">
          <div className="left">
            <button className="button word active">whatifthewordissooofuckinglongwillthelayoutbreak</button>
            <button className="button word">deride</button>
            <button className="button word">diligent</button>
            <button className="button word">elated</button>
            <button className="button word">eloquent</button>
            <button className="button word">embezzle</button>
            <button className="button word">erudite</button>
            <button className="button word">erudite</button>
            <button className="button word">feral</button>
            <button className="button word">extol</button>
          </div>
          <div className="center">
            <div className="title">Some title</div>
            <h1 className="current-word">DEMURE</h1>
            <img style={currentWordImage} className="current-image" alt="" ></img>
            <input id="current-word-guess"  className="input" placeholder="add the translated word"></input>
            <div className="buttons">
              <button type="button" className="button hint">Need a hint?</button>
              <button type="button submit" className="button">Submit</button>
            </div>
          </div>
          <div className="right">
            <Languages />
            <Level />
            right sidebar
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {  // redux
  return {                          // redux
    language: state.language,        // redux
    level: state.level        // redux
  }
}

App = connect(                      // redux
  mapStateToProps,                  // redux
  null                              // redux
)(App)                              // redux

export default App;