import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import moment from 'moment';

//import "./App.css"; //TODO remove content inside css file.
import {ConnectionStatusContext, connectionStatus} from './Services/ConnectionStatusContext';

import HeaderComponent from "./Components/HeaderComponent";

import HomeView from "./Views/HomeView";
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
    
    let _=conn.togglConfig;
    
    //Update main state.
    this.setState({
      togglConfig:{
          apiKey: _.apiKey,
          workspaceId: _.workspaceId,
          userAgent: _.userAgent,
          projectId: _.projectId,
      },
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
              <Route path="/about" component={AboutView} />
              {/* <Route path="/overview" component={TogglOverview} /> */}
              </Switch>
          </Router>
      </ConnectionStatusContext.Provider>
      </>
    );
  }
}
export default App;
