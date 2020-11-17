import ls from 'local-storage'

/**
 * Encapsulation of both dotenv configuration settings and local storage.
 */
var ConfigService = (function()
{
    var instance;
    var togglKeys;

    /**
    * Dotenv is a zero-dependency module that loads environment 
    * variables from a '.env' file into process.env. Storing configuration 
    * in the environment separate from code is based 
    * on The Twelve-Factor App methodology.
    * https://www.npmjs.com/package/dotenv
    */
    const readDotenvKeys = () => {
        var keys = {
            apiKey: process.env.REACT_APP_TOGGL_API_TOKEN,
            workspaceId: process.env.REACT_APP_TOGGL_WORKSPACE_ID,
            userAgent: process.env.REACT_APP_TOGGL_USER_AGENT,
            projectId: process.env.REACT_APP_TOGGL_PROJECT_ID,
        };
        //console.log(keys);

        return keys;
    };

    function createSingleton() {

        togglKeys = readDotenvKeys();

        return {
           

            /**
             * Retrieves constants from dotenv '.env' file.
             * @param  {string} defaultProjectId The string representation of an id.
             * @return {object} Containing several properties.
             */
            getToggleKeys: function() {
                return togglKeys;
            },

            /**
             * Creates a new toggl keys object.
             * @param  {string} keys Keys to clone, if null empty object is created.
             * @return {object} Containing several properties.
             */
            cloneTogglKeysObject(keys){

                return {
                  apiKey: keys ? keys.apiKey : null,
                  workspaceId: keys ? keys.workspaceId : null,
                  userAgent: keys ? keys.userAgent : null,
                  projectId: keys ? keys.projectId : null
                }
            },

            /**
             * Retrieves values from local storage.
             * @param  {string} defaultProjectId The string representation of a project id.
             * @return {object} Containing several properties.
             */
            getLocalStorageDefaultValues: function() {
                let result=this.createLocalStorageDefaultValues(
                    ls.get("defaultProjectId") || "",
                    ls.get("defaultWorkspaceId") || "",
                    ls.get("defaultEmail") || "",
                    ls.get("debugMode") || ""
                );
                //console.log(result);
            
                return result;
            },
            
            /**
             * Saves values to local storage.
             * @param  {string} values Containing several properties.
             */
            setLocalStorageDefaultValues: function(values){

                //console.log(defaultProjectId);
                ls.set("defaultProjectId",values.defaultProjectId);
                ls.set("defaultWorkspaceId",values.defaultWorkspaceId);
                ls.set("defaultEmail",values.defaultEmail);
                ls.set("debugMode",values.debugMode);
            },

              /**
             * Creates a new default values object.
             * @return {object} Containing several properties.
             */
            createLocalStorageDefaultValues(
                projectId, 
                workspaceId,
                email,
                debugMode){
                
                return {
                    defaultProjectId: projectId,
                    defaultWorkspaceId: workspaceId,
                    defaultEmail: email,
                    debugMode: debugMode
                };
            },
        }
    }

    return {
        /**
         * @return {object} The single instance of this service.
         */
        getSingleton: function () {
            if (!instance) {
                instance = createSingleton();
            }
            return instance;
        }
    };
})();
export default ConfigService;