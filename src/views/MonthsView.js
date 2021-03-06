import React, { useState, useContext } from "react";
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import BasicDropdown from "../components/BasicDropdown";
import DebugPanel from "../components/DebugPanel";

import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import DurationCalculator from "../services/DurationCalculator";
import ConfigService from "../services/ConfigService";

const { monthsShort, calendarMetrics, calendarBoundary } = require("@2stefant.org/alldays");
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
    const months = monthsShort();
    const currentYear = calendarMetrics().year;

    let items = months.map((month, ix) => {

      let num = ix + 1;
      let firstDayInMonth = `${currentYear}-${num}-01`;
      let startDay = calendarBoundary(firstDayInMonth, true, "month");
      let endDay = calendarBoundary(firstDayInMonth, false, "month");

      let zero = num < 10 ? "0" : "";
      let name = `${zero}${num} - ${month}`;

      return {
        id: num,
        name: name,
        start: startDay, end: endDay
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
      <h2>Months
        <img src="/assets/calendar3.svg" alt="" width="32" height="32" title="month"></img>
      </h2>
      {
        (!ctx.status.isConnected) ? null
          : <>
            {jsxMonthsDropDown(months)}
            {!error ? null : 
              <Alert key="danger" variant="danger">Error: {error}</Alert>
            }
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
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th key="id">#</th>
                      <th key="title">Title</th>
                      <th key="time">Time</th>
                    </tr>
                  </thead>
                  <tbody>{jsxSummaryTableRows(weekData.data[0].items)}</tbody>
                </Table>
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
    </div>
  );
};
export default MonthsView;
