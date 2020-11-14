import React from 'react';

/*
Demonstractes the following React concepts:
 - Basic class component using state.
 - React form with submit logic.
 - Api interaction verus Toggl.com.
 - Error handling. TODO
*/
class TogglConnectForm extends React.Component {
    constructor(props) {
        super(props);

        let config=props.config;

        this.state = {
            togglConfig: {
                apiKey: config.apiKey,
                workspaceId: config.workspaceId,
                userAgent: config.userAgent,
                projectId: config.projectId,
            },
            workspaceName: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const inputs = event.target.getElementsByTagName("input");

        //Update the local state of the component.
        this.setState({
            togglConfig:{
                apiKey: inputs.apiKey.value,
                workspaceId: inputs.workspaceId.value,
                userAgent: inputs.userAgent.value,
                projectId: inputs.projectId.value,
            },
            workspaceName: null
        });

        var TogglClient = require("toggl-api");
        var toggl = new TogglClient({ apiToken: inputs.apiKey.value });
        this.getWorkSpaceInfo(toggl, inputs.workspaceId.value);
    }

    getWorkSpaceInfo(toggl, workspaceId) {

        let self = this;

        toggl.getWorkspaces(function (err, workspaces) {
            console.log("WORKSPACES ==== ");

            if(!workspaces){
                console.log("Could not connect");
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

                self.setState({ workspaceName: ws.name });

                /* Only propagate connection info up to parent
                if successfully retrieved the workspace. */
                self.props.onConnect(self.state.togglConfig);
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

    render() {
        let config=this.state.togglConfig;
        let ws=this.state.workspaceName;
        return (
            <>
            <form onSubmit={this.handleSubmit}>
                {this.createInputField("ApiKey", "apiKey", config.apiKey)}
                {this.createInputField("WorkspaceId", "workspaceId", config.workspaceId)}
                {this.createInputField("ProjectId", "projectId", config.projectId)}
                {this.createInputField("UserAgent", "userAgent", config.userAgent)}
                <input type="submit" value="Submit" />
            </form>
            <label>{(ws) ? `Connected to workspace ws: '${ws}'`: "Not connected"}</label>
            </>
        );
    };
};
export default TogglConnectForm;



