import React, { useState, useContext } from "react";
import Calendar from "react-calendar";

import BasicDropdown from "../components/BasicDropdown";
import DebugPanel from "../components/DebugPanel";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import DurationCalculator from "../services/DurationCalculator";
import ConfigService from "../services/ConfigService";

const { getMonthsShort, dayCurrentMetrics, dayMetrics } = require("@2stefant.org/alldays");
var TogglClient = require("toggl-api");
const config = ConfigService.getSingleton();
const calc = DurationCalculator.getSingleton();

/**
 * Demonstrates the following React concepts:
 * Arrow function component.
 * React hooks for state.
 * Basic error handling. 
 * Use context in function component.
 * Usage of custom made npm package (alldays).
 * Services for separate logic (ConfigService, DurationCalculator).
 * Reusable components (BasicDropdown, DebugPanel).
 * Usage of api wrapper versus Toggl-Api.
 * State-related rendering.
 */
const MonthsView = () => {
  
  const getIdNameMonths = () => {
    const months = getMonthsShort();
    const currentYear = dayCurrentMetrics().currentYear;

    let items = months.map((month, ix) => {

      let num = ix + 1;
      let firstDayInMonth = `${currentYear}-${num}-01`;
      let metrics = dayMetrics(firstDayInMonth);

      let zero = num < 10 ? "0" : "";
      let name = `${zero}${num} - ${month}`;

      return {
        id: num,
        name: name,
        start: metrics.monthStartDay, end: metrics.monthEndDay
      };
    });
    return items;
  }

  const [value, onChange] = useState(new Date());

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [months] = useState(getIdNameMonths());
  const [error, setError] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const ctx = useContext(ConnectionStatusContext);

  const jsxMonthsDropDown = (months) => {
    return <BasicDropdown
      idNameItems={months}
      title="Month"
      callBack={(item) => {

        let ix = item.id - 1;
        let month = item.id > 0 ? months[ix] : null;

        setSelectedMonth(month);

        if (month) {
          fillData(month.start, month.end);
        }
      }}
    />
  };

  const jsxSummaryTableRows = (items) => {
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

  const updateStateSummary = (err, data) => {
    setError(err);
    setWeekData(data);
  };

  const verifyNeededProperties = (apiKey, workspaceId, projectId) => {
    return (apiKey && workspaceId && projectId)
      ? null
      : "Must provide values for: 1) Api token in '.env' file, 2) Default workspaceId, 3) Default projectId";
  }

  const fillData = (from, to) => {
    const keys = config.getTogglKeys();
    const dv = config.getLocalStorageDefaultValues();

    let invalid = verifyNeededProperties(
      keys.apiKey,
      dv.defaultWorkspaceId,
      dv.defaultProjectId);

    if (invalid) {
      setError(invalid);
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

    updateStateSummary(null, null);

    toggl.summaryReport(opts, function (err, data) {

      if (err) {
        updateStateSummary(err, null);
        return;
      }

      updateStateSummary(null, data);
    });
  };

  return (
    <div className="MonthsView">
      <h2>Months</h2>
      {
        (!ctx.status.isConnected) ? null
          : <>
            {jsxMonthsDropDown(months)}
            {!error ? null : <label>Error: {error}</label>}
            <br />
            {!weekData || !weekData.data[0]
              ? !selectedMonth ? null : <label>No time reported</label> :
              <>
                <label>total_grand: {calc.toDurationTime(weekData.total_grand)}</label>
                <br />
                <label>project: {(!weekData.data[0].title) ? null : weekData.data[0].title.project}</label>
                <br />
                <label>time: {calc.toDurationTime(weekData.data[0].time)}</label>
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
                  <tbody>{jsxSummaryTableRows(weekData.data[0].items)}</tbody>
                </table>
                {!config.getLocalStorageDefaultValues().debugMode ? null
                  : <>
                    <DebugPanel></DebugPanel>
                    <label>Summary: {JSON.stringify(weekData)}</label>
                  </>
                }
              </>
            }
          </>
      }
      {/* <Calendar
        onChange={onChange}
        defaultValue={new Date()}
        showWeekNumbers={true}
        value={value}
      /> */}
    </div>
  );
};
export default MonthsView;
