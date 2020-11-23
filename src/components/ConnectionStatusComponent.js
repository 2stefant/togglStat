import React from "react";

import {ConnectionStatusContext} from "../services/ConnectionStatusContext";

class ConnectionStatusComponent extends React.Component {
  render() {
    let status = this.context.status;
    
    const text=status.isConnected ? "Connected": "Disconnected";
    const coloring=`badge badge-${status.isConnected ? "success": "warning"}`;
    return (
      <span class={coloring}>{text}</span>
    );
  }
}
ConnectionStatusComponent.contextType = ConnectionStatusContext;
export default ConnectionStatusComponent;