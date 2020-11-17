import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import CrashingComponent from "../components/CrashingComponent";
import axios from "axios";
import ConfigService from "../services/ConfigService";

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      defaultValues: null
    }
  }

  componentDidMount() {

    this.setState({
      defaultValues: ConfigService.getSingleton().getLocalStorageDefaultValues()
    });

    // axios.get("https://jsonplaceholder.typicode.com/users/1")
    // .then(response => {
    //   console.log(response.data)
    //   this.setState({
    //     name: response.data.name,
    //     email: response.data.email
    //   });
    // })
    // .catch(error => {
    //   console.log(error)
    // })
  }

  render() {
    return (
      <div>
        <h2>Settings</h2>
        <span>{this.state.name} - {this.state.email}</span>
        <label>Last used workspace</label>
        <label>Your email address</label>
        <label>Toggl api key</label>
        <ErrorBoundary>
          <CrashingComponent/>
        </ErrorBoundary>
        <label>{JSON.stringify(this.state.defaultValues)}</label>
      </div>
    );
  }
}
export default SettingsView;
