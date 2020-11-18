import React from 'react';
import {ConnectionStatusContext, connectionStatus } from '../services/ConnectionStatusContext';
import WorkspaceDropdown from '../components/WorkspaceDropdown';
import ConfigService from "../services/ConfigService";
const config=ConfigService.getSingleton();
const TogglClient = require("toggl-api");

/*
Demonstractes the following React concepts:
 - Basic class component using local state.
 - Event propagation up to parent.
 - React form with submit logic.
 - Api interaction verus Toggl.com.
 - Error handling. TODO
*/
class TogglConnectForm extends React.Component {
    static contextType = ConnectionStatusContext;

    constructor(props) {
        super(props);

        this.state = {
            togglConfig: props.config,
            tryConnect: false,
            workspaceName: null,
            connectionError: null
        };
    }

    handleConnect = (event) => {
        event.preventDefault();
        
        this.setState({tryConnect: true});
        //var toggl = new TogglClient({ apiToken: this.state.togglConfig.apiKey });
        //this.getWorkSpaceInfo(toggl, wId);
    }

    handleDisconnect = (event) => {
        event.preventDefault();
        this.setConnectionInfo(null, null);
        const { status, consumerCallback } = this.context;
        consumerCallback(connectionStatus.notConnected);
    }

    /**
     * Update the local state of the component. 
     */
    setConnectionInfo = (ws, err) => {
        this.setState({ 
            workspaceName: ws,
            connectionError: err 
        });
    }

    getWorkSpaceInfo = (toggl, workspaceId) => {

        const self = this;

        self.setConnectionInfo(null,null);

        toggl.getWorkspaces(function (err, workspaces) {
            console.log("WORKSPACES ==== ");

            if(!workspaces){
                console.log("Could not connect");
                console.log(err);
                self.setConnectionInfo(null,err);
                return;
            }

            var ws = null
            for (let index = 0; index < workspaces.length; index++) {

                var item = workspaces[index];
                if (item.id == workspaceId) {
                    ws = item;
                }
            }
            if (ws != null) {
                console.log("workspace id:" + workspaceId);
                console.log(ws);

                self.setConnectionInfo(ws.name,null);

                /* Only propagate connection info up to parent
                if successfully retrieved the workspace. */
                self.props.onConnect(self.state);
            }
        });
    }

    createResultSection=(ws, err) => {

        return (ws && !err) 
        ? <>
            <label>{(ws) ? `Connected to workspace: '${ws}'`: null}</label>
            <button name="disconnect" onClick={this.handleDisconnect}>Disconnect</button>
          </>
        : <label>{(err) ? JSON.stringify(err) : null}</label>;
    }

    hidePartsOfKey(key){
        let len=key.length;
        if(len>1){
            len=len/2;
        }

        return key.substring(0,len) + "**********";
    }

    render() {
        const key=this.state.togglConfig.apiKey;
        return (
            <>
            <form onSubmit={this.handleConnect}>
                <h2>Connect</h2>
                <div>
                    <label>ApiKey: {this.hidePartsOfKey(key)}</label>
                </div>
                <input type="submit" value="Connect" />
                <WorkspaceDropdown togglApiKey={this.state.tryConnect ? key: null}></WorkspaceDropdown>
            </form>
            {this.createResultSection(
                this.state.workspaceName, this.state.connectionError)}
            </>
        )
    };
};
export default TogglConnectForm;
//TODO read https://goshakkk.name/submit-time-validation-react/

