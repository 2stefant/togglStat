import React from 'react';
import UserInfoComponent from '../components/UserInfoComponent';
import ProjectInfoComponent from '../components/ProjectInfoComponent';

/*
Demonstractes the following React concepts:
 - Basic class component using state.
 - Functions, react sub components.
 - Sub component gets state via props.
 - Api interaction verus Toggl.com.
*/
class TogglOverview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          togglConfig:{
            apiKey: 'TOKEN',
            workspaceId: '4841928',
            user_agent: 'PROJECT__EMAIL@gmail.com',
            projectId: '164966905'
          },
          workspaceName:null,
          userInfo: null,
          projectInfo: null,
          projectSummary: null,
          currentYear: this.showCurrentYear(),
          currentMonth: this.showCurrentMonth(),
          currentWeek: this.showCurrentWeek(),
        };
    }
  
    getSummary(){
        let config=this.state.togglConfig;
        var toggl=this.connectWithToggl(config);

        this.getWorkSpaceInfo(toggl, config.workspaceId);
        this.getUserInfo(toggl)
        this.getProjectInfo(toggl, config.projectId);

        var opts = {
            since: "2020-11-01",
            until: "2020-11-19",
            user_agent: config.user_agent,
            workspace_id: config.workspaceId,
            project_ids: config.projectId
        };

        this.getProjectSummary(toggl,opts);
        this.getReportDetails(toggl, opts, config.projectId);
    }

    connectWithToggl(config) {
        var TogglClient = require('toggl-api');
        var toggl = new TogglClient({ apiToken: config.apiKey });

        return toggl;
    }

    getWorkSpaceInfo(toggl, workspaceId) {
        let self=this;

        toggl.getWorkspaces(function (err, workspaces) {
            console.log("WORKSPACES ==== ");

            var ws=null
            for (let index = 0; index < workspaces.length; index++) {
                
                var item= workspaces[index];
                if(item.id == workspaceId){
                    ws=item;
                }
            }
            if(ws!=null){
                console.log("workspace id:" + workspaceId);
                console.log(ws);
    
                self.setState({workspaceName: ws.name})
            }
        });
    }

    getUserInfo(toggl) {
        let self=this;

        toggl.getUserData({}, function(err, userData) {
            console.log("USER DATA ====")
            console.log(userData);
            self.setState({userInfo: userData});
        });
    }

    getProjectInfo(toggl, projectId) {
        let self=this;

        toggl.getProjectData(projectId, function(err, projData) {
            console.log("PROJECT DATA ====")
            console.log(projData);
            self.setState({projectInfo: projData});
        });
    }

    getProjectSummary(toggl, opts) {
        let self=this;

        toggl.summaryReport(opts, function (err, report) {
            console.log("SUMMARY ==== ");
            console.log(report);
            console.log(report.total_grand/1000/60/60);
            console.log(report.data[0].title.project);
            console.log("client:" + report.data[0].title.client);

            self.setState({projectSummary: report});
        });
    }

    getReportDetails(toggl, opts, projectId) {
        toggl.detailedReport(opts, function (err, report) {
            console.log("DETAILED ==== ");
            console.log(report);
            console.log(report.data.length);
            console.log(report.total_grand);
        });

        //Must send sunday to get data 2020-11-01
        toggl.weeklyReport(opts, function (err, report) {
            console.log("WEEKLY ==== ");
            console.log(report);
            console.log("daily hours (and sum last):");
            report.week_totals.forEach(element => {
                console.log(element);    
            });
        });

        var startDate="2020-11-01T10:11:12+01:00";
        var endDate="2020-11-09T10:11:12+01:00";
        toggl.getTimeEntries(startDate, endDate, function(err, timeEntries) {
            console.log("TIME ENTRIES ====")
            console.log(timeEntries);

            for (var te of timeEntries) 
            {
                if(te.pid==projectId){
                    console.log(te.description + " duration:" + te.duration );
                }
            }

        });
    }

    render(){
        return (
            <div className="TogglOverview">
                <h3>Toggle Overview</h3>
                <button name="getTogglSummary" onClick={() => this.getSummary()}>Toggl</button>
                <UserInfoComponent userInfo={this.state.userInfo} workspaceName={this.state.workspaceName}/>
                <ProjectInfoComponent projectInfo={this.state.projectInfo} 
                    projectSummary={this.state.projectSummary} />
            </div>
        );
    }
};
export default TogglOverview;



