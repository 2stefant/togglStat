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

// The context can pass value down in the component tree
// without explicitly threading it through every component.
//The consumer callback enables updating context from nested component.
export const ConnectionStatusContext = React.createContext({
    status: connectionStatus.notConnected,
    consumerCallback:  () => {}
});
