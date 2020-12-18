import React from 'react';
import SettingsView from "./SettingsView";
import ConnectView from "./ConnectView";

/**
 */
class ConnectOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            togglKeys: props.togglKeys
        };
    }

    render() {
        return (
            <>
                <ConnectView config={this.state.togglKeys} />
                <SettingsView/>
            </>
        )
    };
};
export default ConnectOverview;


