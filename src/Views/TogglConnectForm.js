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
        this.state = {
            apiKey: '',
            workspaceId: '4841928',
            userAgent: 'togglStat_stefan.lindepil@gmail.com',
            projectId: '164966905',
            workspaceName: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(event) {
    //     event.preventDefault();
    //     if(event.target.id){
    //         console.log(`id:${event.target.id}, value:${event.target.value}`);
    //         this.setState({[event.target.id]: event.target.value});
    //     }
    // }

    handleSubmit(event) {
        event.preventDefault();
        
        const inputs = event.target.getElementsByTagName("input");

        this.setState({
            apiKey: inputs.apiKey.value,
            workspaceId: inputs.workspaceId.value,
            userAgent: inputs.userAgent.value,
            projectId: inputs.projectId.value,
            workspaceName: null
        });

        var TogglClient = require('toggl-api');
        var toggl = new TogglClient({ apiToken: this.state.apiKey });

        this.getWorkSpaceInfo(toggl, this.state.workspaceId);
    }

    getWorkSpaceInfo(toggl, workspaceId) {

        let self = this;

        toggl.getWorkspaces(function (err, workspaces) {
            console.log("WORKSPACES ==== ");

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
            }
        });

    }

    createInputField = (name, id, value) => {
        return <div>
            <label>{name}:
                {/* <input id={id} type="text" value={value} onChange={this.handleChange} /> */}
                <input name={id} type="text" value={value} />
            </label>
        </div>;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.createInputField("ApiKey", "apiKey", this.state.apiKey)}
                {this.createInputField("WorkspaceId", "workspaceId", this.state.workspaceId)}
                {this.createInputField("ProjectId", "projectId", this.state.projectId)}
                {this.createInputField("UserAgent", "userAgent", this.state.userAgent)}
                <input type="submit" value="Submit" />
            </form>
        );
    };
};
export default TogglConnectForm;



