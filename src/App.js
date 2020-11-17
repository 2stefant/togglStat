import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import moment from 'moment';

//import "./App.css"; //TODO remove content inside css file.
import {ConnectionStatusContext, connectionStatus} from './services/ConnectionStatusContext';
import ConfigService from "./services/ConfigService";

import HeaderComponent from "./components/HeaderComponent";

import HomeView from "./views/HomeView";
import TogglConnectForm from "./views/TogglConnectForm";
import TogglOverview from "./views/TogglOverview";
import WeeksView from "./views/WeeksView";
import MonthsView from "./views/MonthsView";
import SettingsView from "./views/SettingsView";
import AboutView from "./views/AboutView";


class App extends React.Component {
  constructor(props) {
    super(props);

    let keys=ConfigService.getSingleton()
      .getToggleKeys();

    this.state = {
      togglConfig: ConfigService.getSingleton()
        .cloneTogglKeysObject(keys),
      workspaceName: null,
      userInfo: null,
      projectInfo: null,
      projectSummary: null,
      currentYear: this.showCurrentYear(),
      currentMonth: this.showCurrentMonth(),
      currentWeek: this.showCurrentWeek(),
      connection: {
        status: connectionStatus.notConnected,
        consumerCallback: this.handleConnectionCallback
      }
    };
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

  handleConnectionCallback = (newStatus) => {
    console.log("=== handleConnectionCallback");
    console.log(newStatus);
    
    this.setState({
      connection: {
        status: newStatus,
        consumerCallback: this.handleConnectionCallback
      }
    });
  }

  handleTogglConnect = (conn) => {
    console.log("=== handleTogglConnect");
    console.log(conn);
    
    //Update main state.
    this.setState({
      togglConfig: ConfigService.getSingleton()
        .cloneTogglKeysObject(conn.togglConfig),
      workspaceName: conn.workspaceName,
      connection: {
        status: connectionStatus.connected,
        consumerCallback: this.handleConnectionCallback
      }
    });
  }

  render() {
    return (
      <>
        <ConnectionStatusContext.Provider value={this.state.connection}>
          <Router>
              <HeaderComponent />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={"/"} className="nav-link">Home</Link></li>
                <li><Link to={"/connect"} className="nav-link">Connect</Link></li>
                {/* <li><Link to={"/overview"} className="nav-link">Overview</Link></li> */}
                <li><Link to={"/weeks"} className="nav-link">Weeks</Link></li>
                <li><Link to={"/months"} className="nav-link">Months</Link></li>
                <li><Link to={"/settings"} className="nav-link">Settings</Link></li>
                <li><Link to={"/about"} className="nav-link">About</Link></li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route path="/connect" render={
                props => (<TogglConnectForm config={this.state.togglConfig} onConnect={this.handleTogglConnect} />)
              } />
              <Route path="/weeks" render={
                props => (<WeeksView config={this.state.togglConfig} />)
              } />
              <Route path="/months" render={
                props => (<MonthsView config={this.state.togglConfig} />)
              } />
              <Route path="/settings" component={SettingsView} />
              <Route path="/about" render={
                props => <AboutView title="togglStat" description="Statistics for reported time in Toggl." />
              }/>
              {/* <Route path="/overview" component={TogglOverview} /> */}
              </Switch>
          </Router>
      </ConnectionStatusContext.Provider>
      </>
    );
  }
}
export default App;
