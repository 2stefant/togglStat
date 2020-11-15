import React from 'react';

export const connectionStatus={
    connected: {
        isConnected: true,
        background: "#eeeeee"
    },
    notConnected: {
        isConnected: false,
        background: "#94ec74"
    }
};


// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current settings.
export const ConnectionStatusContext = React.createContext(
    connectionStatus.notConnected);
