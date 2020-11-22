import React from "react";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import ConfigService from "../services/ConfigService";

import ListComponent from "../components/ListComponent";
import DebugPanel from '../components/DebugPanel';
import TimePeriodStatisticsComponent from "../components/TimePeriodStatisticsComponent";
const { dayCurrentMetrics } = require("@2stefant.org/alldays");

const config = ConfigService.getSingleton();
const TogglClient = require("toggl-api");

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMetrics: dayCurrentMetrics(),
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
      case "day": return this.state.currentMetrics.currentDay;
      case "week": return this.state.currentMetrics.currentWeek;
      case "month": return this.state.currentMetrics.currentMonth;
      case "quarter": return this.state.currentMetrics.currentQuarter;
      case "year": return this.state.currentMetrics.currentYear;
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

  render() {
    return (
      <div>
        <h2>Home</h2>
        <br />
        <label>Current Day: {this.switchPeriod("day")}</label>
        <label>, Week: {this.switchPeriod("week")}</label>
        <label>, Month: {this.switchPeriod("month")}</label>
        <label>, Quarter: {this.switchPeriod("quarter")}</label>
        <label>, Year: {this.switchPeriod("year")}</label>
        <br />
        {this.context.status.isConnected ? <TimePeriodStatisticsComponent /> : null}
        <br />
        {!this.state.error ? null : <label>Error: {JSON.stringify(this.state.error)}</label>}
        <br />
        {!this.context.status.isConnected ? null
          : <>
            {!this.state.projects ? <label>No projects</label> :
              <>
                <ListComponent title={"Projects"}
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
