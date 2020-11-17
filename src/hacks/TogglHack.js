import React,{ useState, useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import CrashingComponent from "../components/CrashingComponent";

const TogglHack = () => {
  const [count, setCount] = useState(0);

  const [fruit, setFruit] = useState("");

  const [problem, setProblem] = useState("");

  const [workspaces, setWorkspaces] = useState([{}]);

  const initialWorkspaceItem = { id: 0, name: " --- Select Workspace --- " };
  const [workspaceItems, setWorkspaceItems] = useState( [initialWorkspaceItem]);
  const [workspaceItem, setWorkspaceItem] = useState("");

  useEffect(() => {
    //document.title = `You clicked ${count} times`;
  });

  // Tweak our main app details variable, adding a "user_agent" string
  // A "user_agent" is a Toggl API requirement
  var appDetails = {
    togglApiKey: "TOKEN",
    togglWorkspaceId: "4841928",
    user_agent: "PROJECT_EMAIL@gmail.com",
    projectId: "164966905",
  };

  function toggl() {
    var TogglClient = require("toggl-api");
    var toggl = new TogglClient({ apiToken: appDetails.togglApiKey });


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
      user_agent: appDetails.user_agent,
      workspace_id: appDetails.togglWorkspaceId,
      project_ids: appDetails.projectId,
    };

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

    toggl.getProjectData(appDetails.projectId, function (err, projData) {
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

  return (
    <div className="Hack">
      <h3>=== Hack ===</h3>
      <button name="toggl" onClick={() => toggl()}>
        Toggl
      </button>
      <label>Press F12 in Chrome, check console log view.</label>
      <label>{workspaces ? JSON.stringify(workspaces) : "-"}</label>
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
    </div>
  );
};

export default TogglHack;
