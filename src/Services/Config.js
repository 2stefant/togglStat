import ls from 'local-storage'

/*
https://www.npmjs.com/package/dotenv
Dotenv is a zero-dependency module that loads environment 
variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
*/
export const readConfig = () => {
    var keys = {
    togglApiKey: process.env.REACT_APP_TOGGL_API_TOKEN,
    togglWorkspaceId: process.env.REACT_APP_TOGGL_WORKSPACE_ID,
    user_agent: process.env.REACT_APP_TOGGL_USER_AGENT,
    projectId: process.env.REACT_APP_TOGGL_PROJECT_ID,
    };
    //console.log(keys);
};

export const getLocalStorageDefaultValues = () => {
    const result={
        defaultProjectId: ls.get("defaultProjectId") || ""
    };
    //console.log(result);

    return result;
};

export const setLocalStorageDefaultValues = (defaultProjectId) => {
    console.log(defaultProjectId);
    ls.set("defaultProjectId",defaultProjectId);
};
