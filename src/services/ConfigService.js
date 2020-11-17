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
             * @return {object} Containing several properties: defaultProjectId
             */
            getToggleKeys: function() {
                return togglKeys;
            },

            /**
             * Retrieves values from local storage.
             * @param  {string} defaultProjectId The string representation of an id.
             * @return {object} Containing several properties: defaultProjectId
             */
            getLocalStorageDefaultValues: function() {
                const result={
                    defaultProjectId: ls.get("defaultProjectId") || ""
                };
                //console.log(result);
            
                return result;
            },
            
            /**
             * Saves values to local storage.
             * @param  {string} defaultProjectId The string representation of an id.
             */
            setLocalStorageDefaultValues: function(defaultProjectId){
                //console.log(defaultProjectId);
                ls.set("defaultProjectId",defaultProjectId);
            }
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