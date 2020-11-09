const WeekList = (props) => {

    // Tweak our main app details variable, adding a "user_agent" string
    // A "user_agent" is a Toggl API requirement
    var appDetails = {
        togglApiKey: 'TOKEN',
        togglWorkspaceId: '4841928',
        user_agent: 'togglStat_stefan.lindepil@gmail.com',
        projectId: '164966905'
    };


    function toggl() {
        var TogglClient = require('toggl-api');
        var toggl = new TogglClient({ apiToken: appDetails.togglApiKey });

        toggl.getWorkspaces(function (err, workspaces) {
            console.log("WORKSPACES ==== ");
            console.log(workspaces);
        });

        var opts = {
            since: "2020-11-01",
            until: "2020-11-19",
            user_agent: appDetails.user_agent,
            workspace_id: appDetails.togglWorkspaceId,
            project_ids: appDetails.projectId
        };

        toggl.summaryReport(opts, function (err, report) {
            console.log("SUMMARY ==== ");
            console.log(report);
        });

        toggl.detailedReport(opts, function (err, report) {
            console.log("DETAILED ==== ");
            console.log(report);
        });

        //Must send sunday to get data 2020-11-01
        toggl.weeklyReport(opts, function (err, report) {
            console.log("WEEKLY ==== ");
            console.log(report);
        });

        var startDate="2020-11-01T10:11:12+01:00";
        var endDate="2020-11-09T10:11:12+01:00";
        toggl.getTimeEntries(startDate, endDate, function(err, timeEntry) {
            console.log("TIME ENTRIES ====")
            console.log(timeEntry);
        });

        toggl.getProjectData(appDetails.projectId, function(err, projData) {
            console.log("PROJECT DATA ====")
            console.log(projData);
        });

        toggl.getUserData({}, function(err, userData) {
            console.log("USER DATA ====")
            console.log(userData);
        });


        // toggl.startTimeEntry({
        //   description: 'Some cool work',
        //   billable:    true
        // }, function(err, timeEntry) {
        //   // handle error

        //   // working 10 seconds
        //   setTimeout(function() {
        //     toggl.stopTimeEntry(timeEntry.id, function(err) {
        //       // handle error

        //       toggl.updateTimeEntry(timeEntry.id, {tags: ['finished']}, function(err) {
        //         toggl.destroy()
        //       });
        //     });
        //   }, 120000);
        // });



    }



    return (
        <div className="WeekList">
            <h3>WeekList</h3>
            <button name="toggl" onClick={() => toggl()}>Toggl</button>
        </div>
    );
};

export default WeekList;



