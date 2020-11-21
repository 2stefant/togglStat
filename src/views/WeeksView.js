import React from "react";
import moment from "moment";

import BasicDropdown from "../components/BasicDropdown";
import DebugPanel from "../components/DebugPanel";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import DurationCalculator from "../services/DurationCalculator";
import ConfigService from "../services/ConfigService";

const { alldays,getDayWeeksRelative, getDayRelative } = require("@2stefant.org/alldays");
var TogglClient = require("toggl-api");
const config = ConfigService.getSingleton();
const calc = DurationCalculator.getSingleton();

class WeeksView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: this.getIdNameSundays(),
      error: null,
      weekData: null,
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
        const ix = item.id - 1
        const sunday = weeks[ix].sunday;
        let mondayBefore=getDayRelative(sunday,-6);
        this.fillWeekData(mondayBefore, sunday);
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

  fillWeekData = (from, to) => {
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
    self.updateState(null, null);

    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        console.log(err);
        self.updateState(err, null);
        return;
      }

      console.log(data);

      self.updateState(null, data);
    });
  };

  updateState = (err, data) => {
    this.setState({
      error: err,
      weekData: data,
    });
  };

/*
    const tableHeaderWeekDays = moment.weekdaysShort().map((day) => {
      return (
        <th key={day} className="week-day">
          {day}
        </th>
      );
    });

 */

  render() {
    const wd = this.state.weekData;

    return (
      <div className="WeeksView">
        <h2>Weeks</h2>
        {!this.context.status.isConnected ? null: 
        <>
            {this.jsxSundaysDropDown(this.state.weeks)}
            {!this.state.error ? null : <label>Error: {this.state.error}</label>}

            {!wd ? null :
              <>
                <label>total_grand: {calc.toDurationTime(wd.total_grand)}</label>
                <br />
                <label>project: {(!wd.data[0].title) ? null: wd.data[0].title.project}</label>
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
