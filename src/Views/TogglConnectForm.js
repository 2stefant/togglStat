import React from 'react';
import {ConnectionStatusContext, connectionStatus } from '../services/ConnectionStatusContext';
import WorkspaceDropdown from '../components/WorkspaceDropdown';
import ConfigService from "../services/ConfigService";
import BasicDropdown from '../components/BasicDropdown';
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
            workspaceName: null,
            connectionError: null,
            userData: null
            
        };
    }

    handleConnect = (event) => {
        event.preventDefault();
        this.setConnectionInfo(null,null, null);
        var toggl = new TogglClient(
            { apiToken: this.state.togglConfig.apiKey });

        const self = this;

        toggl.getUserData({}, function (err, userData) {
            console.log("USER DATA ====");

            if(!userData || err){
                console.log("Could not connect");
                self.setConnectionInfo(null,err,null);
                return;
            }
            console.log(userData);

            const { status, consumerCallback } = self.context;
            consumerCallback(connectionStatus.connected);

            //TODO remove ws
            self.setConnectionInfo(null,null, userData);

            /* Only propagate connection info up to parent
            if successfully retrieved the workspace. */
            //self.props.onConnect(self.state);
        });
    }

    handleDisconnect = (event) => {
        event.preventDefault();
        this.setConnectionInfo(null, null,null);
        const { status, consumerCallback } = this.context;
        consumerCallback(connectionStatus.notConnected);
    }

    /**
     * Update the local state of the component. 
     */
    setConnectionInfo = (ws, err, userData) => {
        this.setState({ 
            workspaceName: ws,
            connectionError: err,
            userData: userData 
        });
    }

    hidePartsOfKey(key){
        let len=key.length;
        if(len>1){ len=len/2; }

        return key.substring(0,len) + "**********";
    }

    tryShowDropdown = (userData) =>{
        if(!userData || !userData.workspaces) return null;

        let items = userData.workspaces.map(_ => {
            return { id: _.id, name: _.name };
        });

        return <BasicDropdown 
            idNameItems={items} 
            title="Workspace"
            callBack={() =>{ console.log("hello");}} 
        />
    }

    render() {
        const key=this.state.togglConfig.apiKey;
        const err=this.state.connectionError;
        const ud=this.state.userData;

        return (
            <>
            <form onSubmit={this.handleConnect}>
                <h2>Connect</h2>
                <div><label>
                    ApiKey: {this.hidePartsOfKey(key)}
                </label></div>
                <input disabled={ud} type="submit" value="Connect" />
                &ensp;&ensp;
                <button name="disconnect" 
                    disabled={!ud} 
                    onClick={this.handleDisconnect}
                >Disconnect</button>
            </form>
            <br/>
            {this.tryShowDropdown(ud)}
            <br/>
            {!ud ? null: JSON.stringify(ud)}
            <br/>
            <label>{(!err) ? null
                :" => Connection failure:\n" + JSON.stringify(err)}</label>
            <br/>
            </>
        )
    };
};
export default TogglConnectForm;
//TODO read https://goshakkk.name/submit-time-validation-react/

