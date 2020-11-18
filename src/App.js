import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import "./App.css"; //TODO remove content inside css file.
import {ConnectionStatusContext, connectionStatus} from './services/ConnectionStatusContext';
import ConfigService from "./services/ConfigService";

import HeaderComponent from "./components/HeaderComponent";

import HomeView from "./views/HomeView";
import ConnectView from "./views/ConnectView";
import WeeksView from "./views/WeeksView";
import MonthsView from "./views/MonthsView";
import SettingsView from "./views/SettingsView";
import AboutView from "./views/AboutView";

const config=ConfigService.getSingleton();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workspaceName: null,
      userInfo: null,
      projectInfo: null,
      projectSummary: null,
      connection: {
        status: connectionStatus.notConnected,
        consumerCallback: this.handleConnectionCallback
      }
    };
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
                // props => (<ConnectView config={keys} onConnect={this.handleTogglConnect} />)
                props => (<ConnectView config={config.getTogglKeys()} />)
              } />
              <Route path="/weeks" render={
                props => (<WeeksView config={config.getTogglKeys()} />)
              } />
              <Route path="/months" render={
                props => (<MonthsView config={config.getTogglKeys()} />)
              } />
              <Route path="/settings" component={SettingsView} />
              <Route path="/about" render={
                props => <AboutView title="togglStat" description="Statistics for reported time in Toggl." />
              }/>
              </Switch>
          </Router>
      </ConnectionStatusContext.Provider>
      </>
    );
  }
}
export default App;
