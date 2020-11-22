import React, { useState, useContext } from "react";
import axios from "axios";

import TogglHack from "../hacks/TogglHack";
import ErrorBoundary from "../components/ErrorBoundary";

import ConfigService from "../services/ConfigService";
const config = ConfigService.getSingleton();

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
      <button name="axios" onClick={axiosCallDemonstration}>Axios Demonstration</button>
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
