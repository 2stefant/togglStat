import React, { useState } from "react";
import axios from "axios";

import TogglHack from "../hacks/TogglHack";
import ErrorBoundary from "../components/ErrorBoundary";

import ConfigService from "../services/ConfigService";
const config = ConfigService.getSingleton();


/**
 * Demonstrates the following React concepts:
 * Axios example call, since Toggl provided an excellent api wrapper already.
 * Arrow function component.
 * React hooks for state.
 * Basic error handling. 
 * Lots of demonstration examples developed during learning the Toggl-api.
 * Reusable components (ErrorBoundary).
 * Usage of api wrapper versus Toggl-Api.
 * Debug mode.
 * State-related rendering.
 */
const DebugView = ({ title, description }) => {

  const [axiosData, setAxiosData] = useState(null);

  const jsxDebugContent = () => {
    return config.getLocalStorageDefaultValues().debugMode ? (
      <>
        <ErrorBoundary>
          <TogglHack />
        </ErrorBoundary>
      </>
    ) : null;
  };

  const axiosCallDemonstration = () => {
    
    setAxiosData("...................................");

    axios.get("https://jsonplaceholder.typicode.com/users/1")
      .then(response => {
        setAxiosData(`Name: '${response.data.name}', Email: '${response.data.email}'`);
      })
      .catch(error => {
        setAxiosData(`Error: '${error}'`);
      })
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <br />
      <button name="axios" className="btn btn-outline-info" onClick={axiosCallDemonstration}>Axios Demonstration</button>
      <br />
      {!axiosData ? null: <label>Axios call result: {axiosData}</label>}
      <br />
      {!config.getLocalStorageDefaultValues()
        .debugMode ? null : (
          <ErrorBoundary>
            <TogglHack />
          </ErrorBoundary>
        )}
    </div>
  );
};
export default DebugView;
