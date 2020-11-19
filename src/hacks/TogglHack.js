import React,{ useState, useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import CrashingComponent from "./CrashingComponent";
import ConfigService from "../services/ConfigService";
import BasicDropdown from "../components/BasicDropdown";

const config=ConfigService.getSingleton();
var TogglClient = require("toggl-api");

/**
 * To perform plain calls towards Toggl.
 */
const TogglHack = () => {
  const [count, setCount] = useState(0);

  const [fruit, setFruit] = useState("");

  const [problem, setProblem] = useState("");

  const [workspaces, setWorkspaces] = useState([{}]);

  const initialWorkspaceItem = { id: 0, name: " --- Select Workspace --- " };
  const [workspaceItems, setWorkspaceItems] = useState( [initialWorkspaceItem]);
  const [workspaceItem, setWorkspaceItem] = useState("");

  function toggl() {

    const keys=config.getTogglKeys();
    var toggl = new TogglClient({ apiToken: keys.apiKey });
    const dv=config.getLocalStorageDefaultValues();

    toggl.getWorkspaces(function (err, workspaces) {
      console.log("WORKSPACES ==== ");
      console.log(workspaces);

      if(err){
        return;
      }

      var items=workspaces.map(item => {
        return {
            id: item.id,
            name: item.name        
        }
      });

      items.unshift(initialWorkspaceItem);
      console.log(items);
      setWorkspaceItems(items);

      setWorkspaces(workspaces);
    });

    var opts = {
      since: "2020-11-01",
      until: "2020-11-19",
      user_agent: dv.getUserAgent(),
      workspace_id: dv.defaultWorkspaceId,
      project_ids: dv.defaultProjectId,
    };

    toggl.getWorkspaceProjects(dv.defaultWorkspaceId, {actual_hours: true}, function (err, projects) {
      console.log("PROJECTS ==== ");
      console.log(projects);
    });

    toggl.summaryReport(opts, function (err, report) {
      console.log("SUMMARY ==== ");
      console.log(report);
    });

    toggl.detailedReport(opts, function (err, report) {
      console.log("DETAILED ==== ");
      console.log(report);
    });

    //Must send sunday to get data 2020-11-01
    toggl.weeklyReport(opts, function (err, report) {
      console.log("WEEKLY ==== ");
      console.log(report);
    });

    var startDate = "2020-11-01T10:11:12+01:00";
    var endDate = "2020-11-09T10:11:12+01:00";
    toggl.getTimeEntries(startDate, endDate, function (err, timeEntry) {
      console.log("TIME ENTRIES ====");
      console.log(timeEntry);
    });

    toggl.getProjectData(dv.defaultProjectId, function (err, projData) {
      console.log("PROJECT DATA ====");
      console.log(projData);
    });

    toggl.getUserData({}, function (err, userData) {
      console.log("USER DATA ====");
      console.log(userData);
    });

    // toggl.startTimeEntry({
    //   description: 'Some cool work',
    //   billable:    true
    // }, function(err, timeEntry) {
    //   // handle error

    //   // working 10 seconds
    //   setTimeout(function() {
    //     toggl.stopTimeEntry(timeEntry.id, function(err) {
    //       // handle error

    //       toggl.updateTimeEntry(timeEntry.id, {tags: ['finished']}, function(err) {
    //         toggl.destroy()
    //       });
    //     });
    //   }, 120000);
    // });
  }

  const handleFruitChange = (event) => {
    event.preventDefault();
    let val=event.target.value;
    console.log(val);
    setFruit(val);
  }

  const tryHomeMadeNpmPackage =() =>{

    const alldays = require("@2stefant.org/alldays");

    let days=alldays();
    var str=JSON.stringify(days);
    console.log(str);

    return str;
  }

  return (
    <div className="Hack">
      <button name="toggl" onClick={() => toggl()}>Toggl</button>
      <label>Press F12 in Chrome, check console log view.</label>
      <label>WORKSPACES: {workspaces ? JSON.stringify(workspaces) : "-"}</label>
      <hr />
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => {
            setCount(count + 1); 
            console.log("click counter");
        }}>Click me</button>
      </div>
      <hr />
      <div>
        <p>Error inside function</p>
        <button onClick={() => {
            try {
                let msg="Error intentionally thrown";
                console.log(msg);
                throw msg; 
            } catch (error) {
                setProblem(error);
            }
        }}>Throw now</button>
        {(problem ? <label>{problem}</label>:"No problem yet...")}
      </div>
      <hr />
      <div>
        <p><b>Error boundary component</b></p>
        <ErrorBoundary>
            <CrashingComponent></CrashingComponent>
        </ErrorBoundary>          
      </div>
      <hr />
      <div>
        <p>Selected Fruit: {fruit}</p>
        <label>
          Select Fruit:
          <select value={fruit} onChange={(ev) => {
                  handleFruitChange(ev); 
                  console.log("handleChangeSelect fruit");
              }}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
      </div>

      <hr />
      <div>
        <BasicDropdown idNameItems={[
          {id:1, name: "one"},
          {id:2, name: "two"}]} title="Car" selectedId={6} 
          callBack={(selectedItem) =>{
            console.log("callback up from dropdown")
            console.log(selectedItem);
          }}/>
      </div>

      <hr />
      <div>
        <p>Selected Workspace: {workspaceItem}</p>
        <label>
          Select workspace:
          <select value={workspaceItem} onChange={(event) => {
                  event.preventDefault();
                  let val=event.target.value;
                  setWorkspaceItem(val);
                  console.log("change workspace");
              }}>
            {workspaceItems.map(
                (item) => <option key={item.id} 
                value={`id=${item.id}, name=${item.name}`}>{item.name}</option>)} 
          </select>
        </label>
      </div>

      <hr />
      <div>
        <p>Use home made npm package: {tryHomeMadeNpmPackage()}</p>
      </div>
    </div>
  );
};

export default TogglHack;
