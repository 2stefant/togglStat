import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import moment from 'moment';

import "./App.css";

import HomeView from "./Views/HomeView";
import HeaderComponent from "./Components/HeaderComponent";
import TogglConnectForm from "./Views/TogglConnectForm";
import TogglOverview from "./Views/TogglOverview";
import WeeksView from "./Views/WeeksView";
import MonthsView from "./Views/MonthsView";
import AboutView from "./Views/AboutView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      togglConfig: {
        apiKey: "TOKEN",
        workspaceId: "4841928",
        userAgent: "togglStat_stefan.lindepil@gmail.com",
        projectId: "164966905",
      },
      workspaceName: null,
      userInfo: null,
      projectInfo: null,
      projectSummary: null,
      currentYear: this.showCurrentYear(),
      currentMonth: this.showCurrentMonth(),
      currentWeek: this.showCurrentWeek(),
    };

    this.handleTogglConnect=this.handleTogglConnect.bind(this);
  }

  showCurrentYear() {
    return new Date().getFullYear();
  }

  showCurrentMonth() {
    return new Date().getMonth();
  }

  showCurrentWeek() {
    return moment(new Date()).week();
  }

  handleTogglConnect(togglConfig){
    console.log("=== handleTogglConnect");
    
    //Update main state.
    this.setState({
      togglConfig:{
          apiKey: togglConfig.apiKey,
          workspaceId: togglConfig.workspaceId,
          userAgent: togglConfig.userAgent,
          projectId: togglConfig.projectId,
      }
    });
  }

  render() {
    return (
      <>
        <Router>
          <HeaderComponent />
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={"/"} className="nav-link">Home</Link></li>
              <li><Link to={"/connect"} className="nav-link">Connect</Link></li>
              {/* <li><Link to={"/overview"} className="nav-link">Overview</Link></li> */}
              <li><Link to={"/weeks"} className="nav-link">Weeks</Link></li>
              <li><Link to={"/months"} className="nav-link">Months</Link></li>
              <li><Link to={"/about"} className="nav-link">About</Link></li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/connect" render={
              props => (<TogglConnectForm config={this.state.togglConfig} onConnect={this.handleTogglConnect} />)
            } />
            <Route path="/weeks" component={WeeksView} />
            <Route path="/months" component={MonthsView} />
            <Route path="/about" component={AboutView} />
            {/* <Route path="/overview" component={TogglOverview} /> */}
            </Switch>
        </Router>
      </>
    );
  }
}
export default App;
