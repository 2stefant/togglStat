import React from "react";
import ErrorBoundary from "../Components/ErrorBoundary";
import CrashingComponent from "../Components/CrashingComponent";
import axios from "axios"

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
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