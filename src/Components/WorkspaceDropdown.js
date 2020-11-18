import { useState, useEffect } from "react";
var TogglClient = require("toggl-api");

export const WorkspaceDropdown = ({togglApiKey}) => {
  const initialWorkspaceItem = { id: 0, name: " --- Select Workspace --- " };
  const [workspaceItems, setWorkspaceItems] = useState([initialWorkspaceItem]);
  const [workspaceItem, setWorkspaceItem] = useState(null);

  function fillData(apiToken) {
    if(!apiToken){
      setWorkspaceItems([initialWorkspaceItem]);
      return;
    }
    var toggl = new TogglClient({ apiToken: apiToken });

    toggl.getWorkspaces(function (err, workspaces) {
      console.log("WORKSPACES ==== ");
      console.log(workspaces);

      var items = workspaces.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });

      items.unshift(initialWorkspaceItem);
      // console.log(items);
      setWorkspaceItems(items);
    });
  }

  useEffect(() => {
    fillData(togglApiKey);  
  }, []); //Empty array - Make sure useEffect is run only once.
  

  return (
    <div>
      <p>Selected Workspace: {workspaceItem}</p>
      <label>
        Select workspace:
        <select
          value={workspaceItem}
          onChange={(event) => {
            event.preventDefault();
            let val = event.target.value;
            setWorkspaceItem(val);
            // console.log("change workspace");
          }}
        >
          {workspaceItems.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </label>
    </div>
  );
};
export default WorkspaceDropdown;
