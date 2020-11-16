import React from "react";
import ErrorBoundary from "../Components/ErrorBoundary";
import CrashingComponent from "../Components/CrashingComponent";

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Settings</h2>
        <label>Last used workspace</label>
        <label>Your email address</label>
        <label>Toggl api key</label>
        <ErrorBoundary>
          <CrashingComponent/>
        </ErrorBoundary>
      </div>
    );
  }
}
export default SettingsView;
