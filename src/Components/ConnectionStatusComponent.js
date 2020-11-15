import React from 'react';

import {ConnectionStatusContext} from '../Services/ConnectionStatusContext';

class ConnectionStatusComponent extends React.Component {
  render() {
    let props = this.props;
    let ctx = this.context;
    
    return (
      <label {...props} style={{backgroundColor: ctx.background}}>
          {ctx.isConnected ? "Connected": "Not connected"}
      </label>
    );
  }
}
ConnectionStatusComponent.contextType = ConnectionStatusContext;
export default ConnectionStatusComponent;