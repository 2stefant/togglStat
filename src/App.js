import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';

import HomeView from './Views/HomeView';
import HeaderComponent from './Components/HeaderComponent';
import AppStateComponent from './Components/AppStateComponent';
import TogglConnectForm from './Views/TogglConnectForm';
import TogglOverview from './Views/TogglOverview';
import WeeksView from './Views/WeeksView';
import MonthsView from './Views/MonthsView';
import AboutView from './Views/AboutView';

function App() {
  return (
    <>
      <AppStateComponent />
      <Router>
        <HeaderComponent/>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li><Link to={'/'} className="nav-link">Home</Link></li>
          <li><Link to={'/connect'} className="nav-link">Connect</Link></li>
          <li><Link to={'/overview'} className="nav-link">Overview</Link></li>
          <li><Link to={'/weeks'} className="nav-link">Weeks</Link></li>
          <li><Link to={'/months'} className="nav-link">Months</Link></li>
          <li><Link to={'/about'} className="nav-link">About</Link></li>
        </ul>
        </nav>
        <hr />
        <Switch>
            <Route exact path='/' component={HomeView} />
            <Route path='/connect' component={TogglConnectForm } />
            <Route path='/overview' component={TogglOverview} />
            <Route path='/weeks' component={WeeksView} />
            <Route path='/months' component={MonthsView} />
            <Route path='/about' component={AboutView} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
