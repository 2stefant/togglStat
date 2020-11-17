import React from 'react';
import {ConnectionStatusContext, connectionStatus } from '../services/ConnectionStatusContext';
import WorkspaceDropdown from '../components/WorkspaceDropdown';
import ConfigService from "../services/ConfigService";

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
            togglConfig: ConfigService.getSingleton()
                .cloneTogglKeysObject(props.config),
            workspaceName: null,
            connectionError: null
        };
    }

    handleConnect = (event) => {
        event.preventDefault();
        const inputs = event.target.getElementsByTagName("input");

        const wId=inputs.workspaceId.value;
        const token=inputs.apiKey.value;

        //Update the local state of the component.
        this.setState({
            togglConfig:{
                apiKey: token,
                workspaceId: wId,
                userAgent: inputs.userAgent.value,
                projectId: inputs.projectId.value,
            },
            workspaceName: null,
            connectionError: null,
        });

        var TogglClient = require("toggl-api");
        var toggl = new TogglClient({ apiToken: token });
        this.getWorkSpaceInfo(toggl, wId);
    }

    handleDisconnect = (event) => {
        event.preventDefault();
        console.log("handleDisconnect");
        this.setConnectionInfo(null, null);

        const { status, consumerCallback } = this.context;
        consumerCallback(connectionStatus.notConnected);
    }

    //Update the local state of the component.
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

    createInputField = (name, id, value) => {
        return <div>
            <label>{name}:
                <input name={id} type="text" defaultValue={value} />
            </label>
        </div>;
    }

    createResultSection=(ws, err) => {

        return (ws && !err) 
        ? <>
            <label>{(ws) ? `Connected to workspace: '${ws}'`: null}</label>
            <button name="disconnect" onClick={this.handleDisconnect}>Disconnect</button>
            <WorkspaceDropdown togglApiKey={this.state.togglConfig.apiKey}></WorkspaceDropdown>
          </>
        : <label>{(err) ? JSON.stringify(err) : null}</label>;
    }

    render() {
        let ws=this.state.workspaceName;
        let err=this.state.connectionError;

        let _=this.state.togglConfig;

        return (
            <>
            <form onSubmit={this.handleConnect}>
                <h2>Connect</h2>
                {this.createInputField("ApiKey", "apiKey", _.apiKey)}
                {this.createInputField("WorkspaceId", "workspaceId", _.workspaceId)}
                {this.createInputField("ProjectId", "projectId", _.projectId)}
                {this.createInputField("UserAgent", "userAgent", _.userAgent)}
                <input type="submit" value="Connect" />
            </form>
            {this.createResultSection(ws, err)}
            </>
        )
    };
};
export default TogglConnectForm;
//TODO read https://goshakkk.name/submit-time-validation-react/

