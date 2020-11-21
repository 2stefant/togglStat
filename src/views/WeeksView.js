import React from "react";
import moment from "moment";

import BasicDropdown from "../components/BasicDropdown";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";

import DurationCalculator from "../services/DurationCalculator";
import ConfigService from "../services/ConfigService";
const config = ConfigService.getSingleton();

const { alldays } = require("@2stefant.org/alldays");
var TogglClient = require("toggl-api");

class WeeksView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: this.getDropdownItems(),
      rawData: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fillWeekData();
  }

  getDropdownItems(){
    let days = alldays(7);

    let items = days.map((day, ix) => {
      return { id: ix+1, name: `w${ix + 1}, ${day}`, sunday: day };
    });

    return items;
  }


  jsxSundaysDropDown = (weeks) => {

    return (
      <BasicDropdown
        idNameItems={weeks}
        title="Sunday"
        callBack={(item) => {
          // ev.preventDefault();
          console.log("callBack-BasicDropdown-sundays");

          const ix=item.id - 1
          const week=weeks[ix];

          this.setState({
            selectedWeek: week
          });

          this.fillWeekData(week.sunday);
        }}
      />
    );
  };

  jsxSummaryTableRows = (items) => {

    const calc=DurationCalculator.getSingleton();

    const rows = items.map((item, ix) => {

      let dur=calc.toDuration(item.time);

      return { id: ix, title: item.title.time_entry, time: dur.toTime() };
    });

    return(
    <>
      {rows.map((row) => 
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.title}</td>
          <td>{row.time}</td>
        </tr>
      )}
    </>)
  };

  fillWeekData = (from) => {
    const keys = config.getTogglKeys();
    var toggl = new TogglClient({ apiToken: keys.apiKey });
    const dv = config.getLocalStorageDefaultValues();

    if(!from){
      from="2020-11-01"
    }

    var opts = {
      since: from,
      until: "2020-12-31",
      user_agent: dv.getUserAgent(),
      workspace_id: dv.defaultWorkspaceId,
      project_ids: dv.defaultProjectId,
    };

    const self = this;
    self.updateState(null, null);

    toggl.summaryReport(opts, function (err, data) {
      console.log("SUMMARY ==== ");
      console.log(data);

      if (!data || err) {
        let info = "Could not get summary";
        console.log(info);
        if (!err) err = info;
          self.updateState(err, null);
        return;
      }

      self.updateState(null, data);
    });
  };

  updateState = (err, data) => {
    this.setState({
      weekData: data,
      error: err,
    });
  };

  render() {
    const tableHeaderWeekDays = moment.weekdaysShort().map((day) => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });

    const wd = this.state.weekData;

    return (
      <div className="WeeksView">
        <h2>Weeks</h2>
        {!this.context.status.isConnected ? null : (
          <>
            <table>
              <thead>
                <tr>{tableHeaderWeekDays}</tr>
              </thead>
            </table>
            <br />
            {this.jsxSundaysDropDown(this.state.weeks)}

            {!wd ? null : (
              <>
                <label>total_grand: {wd.total_grand}</label>
                <br />
                <label>project: {wd.data[0].title.project}</label>
                <br />
                <label>time: {wd.data[0].time}</label>
                <br />
                <br />
                <table>
                  <thead>
                    <tr>
                      <th key="id">Id</th>
                      <th key="title">Title</th>
                      <th key="time">Time</th>
                    </tr>
                  </thead>
                  <tbody>{this.jsxSummaryTableRows(wd.data[0].items)}</tbody>
                </table>
                <hr />
                <label>Summary: {JSON.stringify(wd)}</label>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
WeeksView.contextType = ConnectionStatusContext;
export default WeeksView;
