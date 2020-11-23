import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import CrashingComponent from "../hacks/CrashingComponent";
import ConfigService from "../services/ConfigService";
import InputField from "../components/InputField";
import DebugPanel from "../components/DebugPanel";

const config=ConfigService.getSingleton();
/**
 * Demonstrates the following React concepts:
 * Usage of local storage both read and write.
 * Demonstration of when Error boundary takes care of an error (only seen in debug mode).
 * Basic class component using local state.
 * Usage Context, Callbacks, Jsx.
 * Services for separate logic (ConfigService).
 * Reusable components (BasicDropdown, DebugPanel, ErrorBoundary, InputField).
 * State-related rendering.
 */
class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = config.getLocalStorageDefaultValues();
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

          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Default Workspace Id</span>
            </div>
            <input id="defaultWorkspaceId" 
              name="defaultWorkspaceId" 
              defaultValue={defaultValues.defaultWorkspaceId}
              type="text" 
              class="form-control" 
              onChange={this.handleChange}
              placeholder="Copy id from dropdown in the Connect View" 
              aria-label="Default Workspace Id" 
              aria-describedby="basic-addon1" />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Default Project Id</span>
            </div>
            <input id="defaultProjectId" 
              name="defaultProjectId" 
              defaultValue={defaultValues.defaultProjectId}
              type="text" 
              class="form-control" 
              onChange={this.handleChange}
              placeholder="Copy id from one of the projects in the Home View" 
              aria-label="Default Project Id" 
              aria-describedby="basic-addon1" />
          </div>
        
          {!config.getTogglKeys().showDebugOption ? null:
            <><br/>
            <label>
              <div className="input-group-prepend">
                <div className="input-group-text">
                <input type="checkbox" 
                  id="debugMode"
                  name="debugMode"
                  onChange={this.handleChange}
                  checked={(defaultValues.debugMode) ? true: false }
                />
                Debug Mode
                </div>
                
              </div>
            </label>
            </>
          }
          <br/>
          <br/>
          <label>
            <input type="submit" className="btn btn-outline-primary" value="Save" 
            /> <span id="saveResultLabel"></span>
          </label>
        </form>
        
        {this.jsxDebugContent(defaultValues)}
      </div>
    );
  }
}
export default SettingsView;
