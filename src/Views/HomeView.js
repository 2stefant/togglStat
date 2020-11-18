import React from "react";
import TimePeriodStatisticsComponent from "../components/TimePeriodStatisticsComponent";
import {ConnectionStatusContext, connectionStatus} from "../services/ConnectionStatusContext";
import ConfigService from "../services/ConfigService";
import ListComponent from "../components/ListComponent";
import moment from 'moment';

const config=ConfigService.getSingleton();
const TogglClient = require("toggl-api");

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        connectionError: null,
        projects: null,
        defaultValues: config.getLocalStorageDefaultValues()
    };
  }

  componentDidMount() {
    this.tryShowProjects();
  }

  switchPeriod(period) {
    let dt=new Date();

    switch(period) {
      case "day": return dt.getDate(); 
      case "week": return moment(dt).week(); 
      case "month": return dt.getMonth(); 
      case "year": return dt.getFullYear(); 
      default: throw "Invalid case in switchPeriod.";
    }
  }

  

  tryShowProjects = () => {
    var toggl = new TogglClient(
        { apiToken: config.getTogglKeys().apiKey });

    const wid=this.state.defaultValues.defaultWorkspaceId;
    const self = this;

    self.updateState(null,null);

    toggl.getWorkspaceProjects(wid, {}, function (err, projects) {
      console.log("PROJECTS ==== ");
      console.log(projects);

      if(!projects || err){
        console.log("Could not get projects");
        self.updateState(err,null);
        return;
      }

      self.updateState(null,projects);

    });
  }

  updateState = (err, data) => {
    this.setState({ 
        connectionError: err,
        projects: data 
    });
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <br/>
        <label>Current Day: {this.switchPeriod("day")}</label>
        <label>, Week: {this.switchPeriod("week")}</label>
        <label>, Month: {this.switchPeriod("month")}</label>
        <label>, Year: {this.switchPeriod("year")}</label>
        <br/>
        {this.context.status.isConnected ? <TimePeriodStatisticsComponent />: null}
        <br/>
        {!this.context.status.isConnected ? null
        : <>
          <label><b>Projects</b></label>
          {!this.state.projects ? null:
            <>
            <ListComponent title={"Projects"} 
              items={this.state.projects.map(_ =>{
                return {id: _.id, name: `${_.name}, actualHours=${_.actual_hours}`};
            })} hideTitle={true} />
            <br/>
            <label>{this.state.defaultValues.debugMode ? JSON.stringify(this.state.projects):null}</label>
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
