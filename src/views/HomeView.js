import React from "react";
import Alert from 'react-bootstrap/Alert';

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import ConfigService from "../services/ConfigService";

import ListComponent from "../components/ListComponent";
import DebugPanel from '../components/DebugPanel';
import TimePeriodStatisticsComponent from "../components/TimePeriodStatisticsComponent";
const { calendarMetrics } = require("@2stefant.org/alldays");

const config = ConfigService.getSingleton();
const TogglClient = require("toggl-api");

/**
 * Demonstrates the following React concepts:
 * Basic class component using local state.
 * Usage Context, Callbacks, Jsx.
 * Error boundary, subcomponents.
 * Services for separate logic.
 * Reusable components (ListComponent).
 * Usage of api wrapper versus Toggl-Api.
 * Usage of custom made npm package (alldays).
 * State-related rendering.
 */
class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: calendarMetrics(),
      error: null,
      projects: null,
      defaultValues: config.getLocalStorageDefaultValues()
    };
  }

  componentDidMount() {
    this.tryShowProjects();
  }

  switchPeriod(period) {
    switch (period) {
      case "day": return this.state.metrics.day;
      case "week": return this.state.metrics.week;
      case "month": return this.state.metrics.month;
      case "quarter": return this.state.metrics.quarter;
      case "year": return this.state.metrics.year;
      default: throw Error("Invalid case in switchPeriod.");
    }
  }

  verifyNeededProperties = (apiKey, workspaceId) => {
    return (apiKey && workspaceId)
      ? null
      : "Must 1) Define Api-token in '.env' file, 2. Perform Connect, 3) Copy and set default workspaceId.";
  }

  tryShowProjects = () => {
    const apiKey = config.getTogglKeys().apiKey;
    const wid = this.state.defaultValues.defaultWorkspaceId;

    let invalid = this.verifyNeededProperties(apiKey, wid);

    if (invalid) {
      this.updateState(invalid, null);
      return;
    } else {
      this.updateState(null, null);
    }

    var toggl = new TogglClient({ apiToken: apiKey });

    const self = this;

    toggl.getWorkspaceProjects(wid, {}, function (err, projects) {

      if (!projects || err) {
        self.updateState(err, null);
        return;
      }

      self.updateState(null, projects);

    });
  }

  updateState = (err, data) => {
    this.setState({
      error: err,
      projects: data
    });
  }

  jsxHeaderStats= ()=>{
        return <label>
          Current Day: {this.switchPeriod("day")}
          , Week: {this.switchPeriod("week")}
          , Month: {this.switchPeriod("month")}
          , Quarter: {this.switchPeriod("quarter")}
          , Year: {this.switchPeriod("year")}
        </label>
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <br />
        {this.jsxHeaderStats()}
        <br />
        {this.context.status.isConnected ? <TimePeriodStatisticsComponent /> : null}
        <br />
        {!this.state.error ? null : 
              <Alert key="danger" variant="danger">Error: {JSON.stringify(this.state.error)}</Alert>
        }
        <br />
        {!this.context.status.isConnected ? null
          : <>
            {!this.state.projects ? <label>No projects</label> :
              <>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Projects</li>
                  </ol>
                </nav>
                <ListComponent 
                  items={this.state.projects.map(_ => {
                    return { id: _.id, name: `projectId=${_.id}, ${_.name}, actualHours=${_.actual_hours}` };
                  })} />
                <br />
                {
                  !this.state.defaultValues.debugMode ? null :
                    <>
                      <DebugPanel />
                      <label>Projects: {JSON.stringify(this.state.projects)}</label>
                    </>
                }
              </>
            }
          </>
        }
      </div>
    );
  }
}
HomeView.contextType = ConnectionStatusContext;
export default HomeView;
