import React, { Component } from 'react';
import Header from "./components/Header";
import Lesson from "./containers/Lesson";
import Landingpage from "./containers/Landingpage";
import Dashboard from "./containers/Dashboard";

import { Route } from 'react-router-dom';

/* translate('en', 'de', 'hello', (err, data) => {
  
}) */

class App extends Component {
  render = () => {
    return (
      <div className="app">
        <Header />
        <Route path='/landingpage' component={Landingpage} />
        <Route path='/lesson/:stage/:level' component={Lesson} />
        <Route path='/dashboard' component={Dashboard} />
      </div>
    )
  }
}

export default App;