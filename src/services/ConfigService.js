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
            showDebugOption: 
                (process.env.REACT_APP_SHOW_DEBUG_OPTION) 
                ? true: false,
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
            getTogglKeys: function() {
                return togglKeys;
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

                /*Override debugMode if .env says not 
                to show debug option at all.*/
                if(!this.getTogglKeys().showDebugOption){
                    result.debugMode=false;
                }
            
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
                    debugMode: debugMode,
                    getUserAgent: () => {return `togglStat_${email}`;}
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