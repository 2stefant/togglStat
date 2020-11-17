import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import CrashingComponent from "../components/CrashingComponent";
import axios from "axios";
import ConfigService from "../services/ConfigService";
import InputField from "../components/InputField";

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ConfigService.getSingleton().getLocalStorageDefaultValues();
  }

  componentDidMount() {
    // this.setState({
    //   defaultValues: ConfigService.getSingleton().getLocalStorageDefaultValues()
    // });
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

  handleSubmit = (e) => {
    e.preventDefault();
    
    ConfigService.getSingleton()
      .setLocalStorageDefaultValues(this.state);

    this.refreshSaveResult("Default values saved.");
  };

  refreshSaveResult = (text) => {
    document.getElementById("saveResultLabel")
      .innerHTML = text;
  };

  handleChange = (e) => {
    
    let field=e.target.name;
    let value=e.target.value;

    if(field ==="debugMode"){
      console.log(e.target.checked)
      value=e.target.checked ? "yes": "";
    }else{
      e.preventDefault();
    }

    this.setState({[field]: value});

    this.refreshSaveResult("");
  };

  render() {
    const defaultValues = this.state;

    return (
      <div>
        <h2>Settings</h2>
        <ErrorBoundary>
          <CrashingComponent />
        </ErrorBoundary>
        <label>{JSON.stringify(defaultValues)}</label>

        <form onSubmit={this.handleSubmit}>
          <InputField id="defaultWorkspaceId"
            title="Default Workspace Id"
            value={defaultValues.defaultWorkspaceId}
            handleChange={this.handleChange}
          />

          <InputField id="defaultProjectId"
            title="Default Project Id"
            value={defaultValues.defaultProjectId}
            handleChange={this.handleChange}
          />
          <br/>
          <InputField id="defaultEmail"
            title="Default Email (needed as 'user_agent' attribute when accessing Toggl Api)"
            value={defaultValues.defaultEmail}
            handleChange={this.handleChange}
          />
          <br/>
          <label>
            <input type="checkbox" 
              id="debugMode"
              name="debugMode"
              onChange={this.handleChange}
              checked={(defaultValues.debugMode) ? true: false }
            /><span>Debug Mode</span>
          </label>
          <br/>

          <input type="submit" value="Save" />
        </form>
        <label id="saveResultLabel"></label>
      </div>
    );
  }
}
export default SettingsView;
