import React from "react";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import BasicDropdown from "../components/BasicDropdown";
import DebugPanel from "../components/DebugPanel";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import DurationCalculator from "../services/DurationCalculator";
import ConfigService from "../services/ConfigService";

const { alldays, dayInWeek, weekDaysShort } = require("@2stefant.org/alldays");
var TogglClient = require("toggl-api");
const config = ConfigService.getSingleton();
const calc = DurationCalculator.getSingleton();

/**
 * Demonstrates the following React concepts:
 * Basic error handling. 
 * Basic class component using local state.
 * Usage Context, Callbacks, Jsx.
 * Services for separate logic (ConfigService, DurationCalculator).
 * Reusable components (BasicDropdown, DebugPanel).
 * Usage of custom made npm package (alldays).
 * Usage of api wrapper versus Toggl-Api.
 * State-related rendering.
 */
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
      let num = ix + 1;
      let zero = num < 10 ? "0" : "";
      let week = `${zero}${num}, ${day}`;
      return { id: num, name: week, sunday: day };
    });

    return items;
  }

  jsxSundaysDropDown = (weeks) => {
    return <BasicDropdown
      idNameItems={weeks}
      title="Week"
      callBack={(item) => {

        let ix = item.id - 1;
        let week = item.id > 0 ? weeks[ix] : null;

        this.setState({ selectedWeek: week });

        if (week) {
          let monday = dayInWeek(week.sunday, 1);
          this.fillData(monday, week.sunday);
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

  verifyNeededProperties(apiKey, workspaceId, projectId) {
    return (apiKey && workspaceId && projectId)
      ? null
      : "Must provide values for: 1) Api token in '.env' file, 2) Default workspaceId, 3) Default projectId";
  }

  fillData = (from, to) => {
    const keys = config.getTogglKeys();
    const dv = config.getLocalStorageDefaultValues();

    let invalid = this.verifyNeededProperties(
      keys.apiKey,
      dv.defaultWorkspaceId,
      dv.defaultProjectId);

    if (invalid) {
      this.updateStateSummary(invalid, null);
      return;
    }

    var toggl = new TogglClient({ apiToken: keys.apiKey });

    var opts = {
      since: from,
      until: to,
      user_agent: dv.getUserAgent(),
      workspace_id: dv.defaultWorkspaceId,
      project_ids: dv.defaultProjectId,
    };

    this.updateStateSummary(null, null);
    this.updateStateWeek(null, null);
    const self = this;

    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        self.updateStateSummary(err, null);
        return;
      }

      self.updateStateSummary(null, data);
    });

    //Must send sunday to get data
    toggl.weeklyReport(opts, function (err, data) {

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
    let list = [...weekDaysShort(), "Total"];

    return <thead><tr>
      {list.map((day) => <th key={day}>{day}</th>)}
    </tr></thead>;
  }

  jsxWeekTableRows = (records) => {

    let values = records[0];
    return <tr key="0">
      {values.map((value, ix) => <td key={ix}>{calc.toDurationTime(value, true)}</td>)}
    </tr>
  };


  render() {
    const wd = this.state.weekData;

    return (
      <div className="WeeksView">
        <h2>Weeks
          <img src="/assets/calendar-week.svg" alt="" width="32" height="32" title="week"></img>
        </h2>
        {!this.context.status.isConnected ? null :
          <>
            {this.jsxSundaysDropDown(this.state.weeks)}
            {!this.state.error ? null : 
              <Alert key="danger" variant="danger">Error: {this.state.error}</Alert>
            }
            <br />
            {!this.state.weekTimeData || !this.state.weekTimeData.week_totals[0] ? null :
              <>
                <Table striped bordered hover>
                  {this.jsxTableHeaderWeekDays()}
                  <tbody>{this.jsxWeekTableRows([this.state.weekTimeData.week_totals])}</tbody>
                </Table>
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
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th key="id">#</th>
                      <th key="title">Title</th>
                      <th key="time">Time</th>
                    </tr>
                  </thead>
                  <tbody>{this.jsxSummaryTableRows(wd.data[0].items)}</tbody>
                </Table>
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
