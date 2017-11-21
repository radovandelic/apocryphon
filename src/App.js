import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Level, Languages } from './containers';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    var { language } = this.props     // redux
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Your current language: {language}</h1>
        </header>
        <p className="App-intro">
          <Languages />
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {  // redux
  return {                          // redux
    language: state.language        // redux
  }
}

App = connect(                      // redux
  mapStateToProps,                  // redux
  null                              // redux
)(App)                              // redux

export default App;