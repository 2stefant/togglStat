import React from "react";
import TimePeriodStatisticsComponent from "../components/TimePeriodStatisticsComponent";
import {ConnectionStatusContext, connectionStatus} from "../services/ConnectionStatusContext";
import ConfigService from "../services/ConfigService";
import moment from 'moment';

const config=ConfigService.getSingleton();
const TogglClient = require("toggl-api");

class HomeView extends React.Component {

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

  render() {
    let status = this.context.status;
    console.log(status);
    const content=(status.isConnected) 
      ? <TimePeriodStatisticsComponent />
      : null;

    return (
      <div>
        <h2>Home</h2>
        <br/>
        <label>Current Day: {this.switchPeriod("day")}</label>
        <label>, Week: {this.switchPeriod("week")}</label>
        <label>, Month: {this.switchPeriod("month")}</label>
        <label>, Year: {this.switchPeriod("year")}</label>
        <br/>
        <TimePeriodStatisticsComponent />
      </div>
    );
  }
}
HomeView.contextType = ConnectionStatusContext;
export default HomeView;
