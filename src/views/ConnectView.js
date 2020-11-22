import React from 'react';
import {ConnectionStatusContext, connectionStatus } from '../services/ConnectionStatusContext';
import ConfigService from "../services/ConfigService";
import BasicDropdown from '../components/BasicDropdown';
const config=ConfigService.getSingleton();
const TogglClient = require("toggl-api");

/**
 * Demonstrates the following React concepts:
 * React form with submit logic.
 * Basic error handling. 
 * Basic class component using local state.
 * Usage Context, Callbacks, Jsx.
 * Updates Context state via consumer callback.
 * Error boundary, subcomponents.
 * Services for separate logic.
 * Reusable components (BasicDropdown).
 * Usage of api wrapper versus Toggl-Api.
 * State-related rendering.
 */
class ConnectView extends React.Component {
    static contextType = ConnectionStatusContext;

    constructor(props) {
        super(props);

        this.state = {
            togglConfig: props.config,
            connectionError: null,
            userData: null,
            defaultValues: config.getLocalStorageDefaultValues()
        };
    }

    handleConnect = (event) => {
        event.preventDefault();
        this.setConnectionInfo(null, null);
        var toggl = new TogglClient(
            { apiToken: this.state.togglConfig.apiKey });

        const self = this;

        toggl.getUserData({}, function (err, userData) {

            if(!userData || err){
                self.setConnectionInfo(err,null);
                return;
            }

            const { consumerCallback } = self.context;
            consumerCallback(connectionStatus.connected);

            self.setConnectionInfo(null, userData);
        });
    }

    handleDisconnect = (event) => {
        event.preventDefault();
        this.setConnectionInfo(null,null);
        const { consumerCallback } = this.context;
        consumerCallback(connectionStatus.notConnected);
    }

    setConnectionInfo = (err, userData) => {
        this.setState({ 
            connectionError: err,
            userData: userData 
        });
    }

    hidePartsOfKey(key){
        if(!key || key.length<1){
            return ""
        }

        let len=key.length;
        if(len>1){ len=parseInt(len * 1/3); }

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
            selectedId={this.state.defaultValues.defaultWorkspaceId}
            callBack={() =>{ 
                //TODO future save to local storage.
                //console.log("callBack-BasicDropdown");
            }} 
        />
    }

    render() {
        const key=this.state.togglConfig.apiKey;
        const err=this.state.connectionError;
        const ud=this.state.userData;
        const isConnected = this.context.status==connectionStatus.connected;

        return (
            <>
            <form onSubmit={this.handleConnect}>
                <h2>Connect</h2>
                <div><label>
                    ApiKey: {this.hidePartsOfKey(key)}
                </label></div>
                <input disabled={isConnected} type="submit" value="Connect" />
                &ensp;&ensp;
                <button name="disconnect" 
                    disabled={!isConnected} 
                    onClick={this.handleDisconnect}
                >Disconnect</button>
                 {!ud ? null: 
                <>
                    &ensp;&ensp;
                    <label>{ud.email}</label>
                    &ensp;&ensp;
                    <label>{ud.fullname}</label>
                </>
            }
            </form>
            <br/>
            {isConnected ? this.tryShowDropdown(ud): null}
            <br/>
            {ud && this.state.defaultValues.debugMode 
                ? JSON.stringify(ud): null
            }
            <br/>
            <label>{!err ? null
                :" => Connection failure:\n" + JSON.stringify(err)}</label>
            <br/>
            </>
        )
    };
};
export default ConnectView;
//TODO read https://goshakkk.name/submit-time-validation-react/

