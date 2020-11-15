import React from 'react';

import {ConnectionStatusContext} from '../Services/ConnectionStatusContext';

class ConnectionStatusComponent extends React.Component {
  render() {
    let status = this.context.status;
    
    return (
      <label style={{backgroundColor: status.background}}>
          {status.isConnected ? "Connected": "Not connected"}
          <br/>
      </label>
    );
  }
}
ConnectionStatusComponent.contextType = ConnectionStatusContext;
export default ConnectionStatusComponent;