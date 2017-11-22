import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Level, Languages } from './containers';
import { connect } from 'react-redux';

class App extends Component {
  render = () => {
    var { level, language } = this.props;     // redux
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Your current language: {language}</h1>
          <div className="App-title">Your current level: {level}</div>
        </header>
        <div className="App-intro">
          <Languages />
          <Level />
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