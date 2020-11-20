import React from "react";

import TogglHack from "../hacks/TogglHack";
import ErrorBoundary from "../components/ErrorBoundary";

import ConfigService from "../services/ConfigService";
const config = ConfigService.getSingleton();

const DebugView = ({ title, description }) => {
  const jsxDebugContent = () => {
    return config.getLocalStorageDefaultValues().debugMode ? (
      <>
        <ErrorBoundary>
          <TogglHack />
        </ErrorBoundary>
      </>
    ) : null;
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
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
