import React from "react";

import BasicDropdown from "../components/BasicDropdown";
import DebugPanel from "../components/DebugPanel";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import DurationCalculator from "../services/DurationCalculator";
import ConfigService from "../services/ConfigService";

const { alldays, getDayWeeksRelative, getDayRelative} = require("@2stefant.org/alldays");
var TogglClient = require("toggl-api");
const config = ConfigService.getSingleton();
const calc = DurationCalculator.getSingleton();

class WeeksView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: this.getIdNameSundays(),
      selectedWeek: null,
      error: null,
      weekData: null,
      weekTimeData: null
    };
  }

  getIdNameSundays() {
    let days = alldays(7);

    let items = days.map((day, ix) => {
      return { id: ix + 1, name: `w${ix + 1}, ${day}`, sunday: day };
    });

    return items;
  }

  jsxSundaysDropDown = (weeks) => {
    return <BasicDropdown
      idNameItems={weeks}
      title="Sunday"
      callBack={(item) => {

        let ix = item.id - 1;
        let week = item.id > 0 ? weeks[ix] : null;

        this.setState({ selectedWeek: week });

        if (week) {
          let mondayBefore = getDayRelative(week.sunday, -6);
          this.fillData(mondayBefore, week.sunday);
        }
      }}
    />
  };

  jsxSummaryTableRows = (items) => {
    const rows = items.map((item, ix) => {
      return {
        id: ix, title: item.title.time_entry,
        time: calc.toDurationTime(item.time)
      };
    });

    return <>
      {rows.map((row) =>
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.title}</td>
          <td>{row.time}</td>
        </tr>
      )}
    </>
  };

  fillData = (from, to) => {
    const keys = config.getTogglKeys();
    var toggl = new TogglClient({ apiToken: keys.apiKey });
    const dv = config.getLocalStorageDefaultValues();

    var opts = {
      since: from,
      until: to,
      user_agent: dv.getUserAgent(),
      workspace_id: dv.defaultWorkspaceId,
      project_ids: dv.defaultProjectId,
    };

    const self = this;
    self.updateStateSummary(null, null);
    self.updateStateWeek(null, null);

    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        self.updateStateSummary(err, null);
        return;
      }

      self.updateStateSummary(null, data);
    });

    //Must send sunday to get data
    toggl.weeklyReport(opts, function (err, data) {
      console.log("WEEKLY ==== ");
      console.log(data);
      console.log(err);

      if (err) {
        self.updateStateWeek(err, null);
        return;
      }

      self.updateStateWeek(null, data);
    });


  };

  updateStateSummary = (err, data) => {
    this.setState({
      error: err,
      weekData: data,
    });
  };

  updateStateWeek = (err, data) => {
    this.setState({
      error: err,
      weekTimeData: data,
    });
  };

  jsxTableHeaderWeekDays = () => {
    let list = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Total"];

    return <thead><tr>
      {list.map((day) => <th key={day}>{day}</th>)}
    </tr></thead>;
  }

  jsxWeekTableRows = (records) => {

    console.log("weektablerows");
    console.log(records);
    let values=records[0];
    console.log(values);

    return <tr key="0">
      {values.map((value, ix) => <td key={ix}>{calc.toDurationTime(value, true)}</td>)}
    </tr>
  };


  render() {
    const wd = this.state.weekData;

    return (
      <div className="WeeksView">
        <h2>Weeks</h2>
        {!this.context.status.isConnected ? null :
          <>
            {this.jsxSundaysDropDown(this.state.weeks)}
            {!this.state.error ? null : <label>Error: {this.state.error}</label>}
            <br />
            {!this.state.weekTimeData ? null :
              <>
                <table>
                  {this.jsxTableHeaderWeekDays()}
                  <tbody>{this.jsxWeekTableRows([this.state.weekTimeData.week_totals])}</tbody>
                </table>
              </>
            }
            <br />
            {!wd || !wd.data[0]
              ? !this.state.selectedWeek ? null : <label>No time reported</label> :
              <>
                <label>total_grand: {calc.toDurationTime(wd.total_grand)}</label>
                <br />
                <label>project: {(!wd.data[0].title) ? null : wd.data[0].title.project}</label>
                <br />
                <label>time: {calc.toDurationTime(wd.data[0].time)}</label>
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
                {!config.getLocalStorageDefaultValues().debugMode ? null
                  : <>
                    <DebugPanel></DebugPanel>
                    <label>Summary: {JSON.stringify(wd)}</label>
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
WeeksView.contextType = ConnectionStatusContext;
export default WeeksView;
