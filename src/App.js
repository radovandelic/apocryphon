import React, { Component } from 'react';
import Header from "./components/Header";
import MobileNavigation from './containers/MobileNavigation';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Register from './containers/Register';
import Lesson from "./containers/Lesson";
import Landingpage from "./components/Landingpage";
import Dashboard from "./containers/Dashboard";

import { Route } from 'react-router-dom';

class App extends Component {
  render = () => {
    return (
      <div className="app">
        <Header />
        <MobileNavigation />
        <Route exact path='/' component={Landingpage} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/register' component={Register} />
        <Route path='/lesson/:stage/:level' component={Lesson} />
        <Route path='/dashboard' component={Dashboard} />
      </div>
    )
  }
}

export default App;