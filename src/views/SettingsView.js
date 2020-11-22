import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import CrashingComponent from "../hacks/CrashingComponent";
import axios from "axios";
import ConfigService from "../services/ConfigService";
import InputField from "../components/InputField";
import DebugPanel from "../components/DebugPanel";

const config=ConfigService.getSingleton();

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = config.getLocalStorageDefaultValues();
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
    
    config.setLocalStorageDefaultValues(this.state);

    this.refreshSaveResult("Default values stored.");
  };

  refreshSaveResult = (text) => {
    document.getElementById("saveResultLabel")
      .innerHTML = text;
  };

  handleChange = (e) => {
    
    let field=e.target.name;
    let value=e.target.value;

    if(field ==="debugMode"){
      value=e.target.checked ? "yes": "";
    }else{
      e.preventDefault();
    }

    this.setState({[field]: value});

    this.refreshSaveResult("");
  };

  jsxDebugContent =(defaultValues)=>{
    return (config.getTogglKeys().showDebugOption && defaultValues.debugMode) ? <>
    <DebugPanel/>
    <ErrorBoundary>
      <CrashingComponent />
    </ErrorBoundary>
    <br/>
    <label>{JSON.stringify(defaultValues)}</label>
    </>: null;
  }

  render() {
    const defaultValues = this.state;

    return (
      <div>
        <h2>Settings</h2>

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
          {config.getTogglKeys().showDebugOption ? 
            <><br/>
            <label>
              <input type="checkbox" 
                id="debugMode"
                name="debugMode"
                onChange={this.handleChange}
                checked={(defaultValues.debugMode) ? true: false }
              /> <span>Debug Mode</span>
            </label>
            </>: null
          }
          <br/>
          <br/>
          <label>
            <input type="submit" value="Save" 
            /> <span id="saveResultLabel"></span>
          </label>
        </form>
        
        {this.jsxDebugContent(defaultValues)}
      </div>
    );
  }
}
export default SettingsView;
