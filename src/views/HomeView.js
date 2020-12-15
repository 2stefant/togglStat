import React from "react";
import Alert from 'react-bootstrap/Alert';

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import ConfigService from "../services/ConfigService";

import ListComponent from "../components/ListComponent";
import DebugPanel from '../components/DebugPanel';
import TimePeriodStatisticsComponent from "../components/TimePeriodStatisticsComponent";
import DurationCalculator from "../services/DurationCalculator";

const { calendarMetrics } = require("@2stefant.org/alldays");
const calc = DurationCalculator.getSingleton();
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
      error: null,
      projects: null,
      defaultValues: config.getLocalStorageDefaultValues(),
      statistics: this.buildEmptyStats(),
      statsReady: false
    };
  }

  componentDidMount() {

    if(!this.context.status.isConnected){
      return;
    }

    const apiKey = config.getTogglKeys().apiKey;
    const dv=this.state.defaultValues;

    let invalid = this.verifyNeededProperties(apiKey, dv.defaultWorkspaceId);

    if (invalid) {
      this.updateProjects(invalid, null);
      return;
    } else {
      this.updateProjects(null, null);
    }

    var toggl = new TogglClient({ apiToken: apiKey });

    this.fillData(toggl, dv.defaultWorkspaceId);
    this.fillStatistics(
      toggl, 
      dv.defaultWorkspaceId, 
      this.state.defaultValues.defaultProjectId, 
      dv.getUserAgent());
  }

  buildEmptyStats(err=null){
    return {
      week: "",
      month: "",
      quarter: "",
      midYear: "",
      year:"",
      error: err
    };
  }

  fillStatistics = (toggl, workspaceId, projectId, userAgent) => {

    var metrics=calendarMetrics();

    var opts = {
      since: null,
      until: null,
      user_agent: userAgent,
      workspace_id: workspaceId,
      project_ids: projectId,
    };

    const stats=this.buildEmptyStats();
    this.setState({statistics: stats});
    const self=this;

    /* WEEK */
    opts.since=metrics.weekStartDay;
    opts.until=metrics.weekEndDay;
    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        stats.err=err;
        this.setState({statistics: stats});
        return;
      }

      if(data){
        stats.week=calc.toDurationTime(data.total_grand);
        self.setState({statistics: stats});
      }
    });

    /* MONTH */
    opts.since=metrics.monthStartDay;
    opts.until=metrics.monthEndDay;
    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        stats.err=err;
        this.setState({statistics: stats});
        return;
      }

      if(data){
        stats.month=calc.toDurationTime(data.total_grand);
        self.setState({statistics: stats});
      }
    });
    
    /* QUARTER */
    opts.since=metrics.quarterStartDay;
    opts.until=metrics.quarterEndDay;
    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        stats.err=err;
        this.setState({statistics: stats});
        return;
      }

      if(data){
        stats.quarter=calc.toDurationTime(data.total_grand);
        self.setState({statistics: stats});
      }
    });

      /* MIDYEAR */
      opts.since=metrics.yearStartDay;
      opts.until="2020-07-01";
      console.log(opts);
      toggl.summaryReport(opts, function (err, data) {
  
        if (err) {
          stats.err=err;
          this.setState({statistics: stats});
          return;
        }
  
        if(data){
          stats.midYear=calc.toDurationTime(data.total_grand);
          self.setState({statistics: stats});
        }
      });

    /* YEAR */
    opts.since=metrics.yearStartDay;
    opts.until=metrics.yearEndDay;

    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        stats.err=err;
        this.setState({statistics: stats});
        return;
      }

      if(data){
        stats.year=calc.toDurationTime(data.total_grand);
        self.setState({statistics: stats});
        self.setState({statsReady: true});
      }
    });

  };

  verifyNeededProperties = (apiKey, workspaceId) => {
    return (apiKey && workspaceId)
      ? null
      : "Must 1) Define Api-token in '.env' file, 2. Perform Connect, 3) Copy and set default workspaceId.";
  }

  fillData = (toggl, workspaceId) => {
    const self = this;
    toggl.getWorkspaceProjects(workspaceId, {}, function (err, projects) {
      if (!projects || err) {
        self.updateProjects(err, null);
        return;
      }
      self.updateProjects(null, projects);
    });
  }

  updateProjects = (err, data) => {
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
        {!this.state.statsReady ? null : 
          <TimePeriodStatisticsComponent statistics={this.state.statistics}/>      
        }
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
