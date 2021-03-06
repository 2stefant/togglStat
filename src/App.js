import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {ConnectionStatusContext, connectionStatus} from './services/ConnectionStatusContext';
import ConfigService from "./services/ConfigService";

import ConnectionStatusComponent from './components/ConnectionStatusComponent';
import DebugPanel from './components/DebugPanel';
import ErrorBoundary from "./components/ErrorBoundary";

import HomeView from "./views/HomeView";
import ConnectOverview from "./views/ConnectOverview";
import WeeksView from "./views/WeeksView";
import MonthsView from "./views/MonthsView";
import AboutView from "./views/AboutView";
import DebugView from "./views/DebugView";

const config=ConfigService.getSingleton();

/**
 * Demonstractes the following React concepts:
 * Basic class component using local state.
 * Usage of Router, Context, Callbacks, Jsx.
 * Error boundary, subcomponents.
 * The HeaderComponent contains another 
 * ConnectionStatusComponent which uses an example for inline styling.
 */
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
    this.setState({
      connection: {
        status: newStatus,
        consumerCallback: this.handleConnectionCallback
      }
    });
  }

  isDebugMode = () =>
    config.getLocalStorageDefaultValues()
      .debugMode ;

  jsxDebugContent =()=>{
    return <>
       <DebugPanel/>
        <ErrorBoundary>
          <Route path="/debug" render={
            props => <DebugView 
              title="Debug" 
              description="Debug features not to be used in production." />
            }/>
        </ErrorBoundary>
    </>;
  }

  render() {
    return (
      <>
        <ConnectionStatusContext.Provider value={this.state.connection}>
          <Router>
            <header>
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark  fixed-top">
                <span className="navbar-brand"><strong>togglStat</strong></span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExample10">
                  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li><Link to={"/"} className="nav-link active">Home</Link></li>
                    <li><Link to={"/weeks"} className="nav-link">Weeks</Link></li>
                    <li><Link to={"/months"} className="nav-link">Months</Link></li>
                  </ul>
                  <ul className="navbar-nav">
                    <li className="navbar-text"><ConnectionStatusComponent/></li>
                    <li><Link to={"/connect"} className="nav-link">Connect</Link></li>
                    <li><Link to={"/about"} className="nav-link">About</Link></li>
                    {this.isDebugMode() 
                      ? <li><Link to={"/debug"} className="nav-link">Debug</Link></li>
                      : null
                    }
                  </ul>
                </div>
              </nav>
              <br/>
            </header>

            <main class="flex-shrink-0">
              <div class="container">
              <br/> 
              <br/> 

                <Switch>
                  <Route exact path="/" component={HomeView} />
                  <Route path="/weeks" component={WeeksView} />
                  <Route path="/months" component={MonthsView}/>
                  <Route path="/connect" render={
                    props => (<ConnectOverview togglKeys={config.getTogglKeys()} />)
                  } />
                  <Route path="/about" render={
                    props => <AboutView title="togglStat" 
                    description="Statistics for reported time in Toggl." />
                  }/>
                  {this.isDebugMode() 
                    ? <Route path="/debug" render={
                        props => <DebugView title="Debug" 
                          description="Debug features not to be used in production." />
                      }/>
                    : null
                  }
                </Switch>
              </div>
            </main>
          </Router>
          
          <footer class="footer mt-auto py-3 bg-light">
            <div class="container">
              <span class="text-muted">Place sticky footer content here.</span>
            </div>
          </footer>
      </ConnectionStatusContext.Provider>
      </>
    );
  }
}
export default App;

