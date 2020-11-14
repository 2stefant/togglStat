import React from 'react';
import moment from 'moment';

class AppStateComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          togglConfig:{
            apiKey: '',
            workspaceId: '4841928',
            user_agent: 'togglStat_stefan.lindepil@gmail.com',
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

    showCurrentYear() {
        return new Date().getFullYear();
    }

    showCurrentMonth() {
        return new Date().getMonth();
    }

    showCurrentWeek() {
        return moment(new Date()).week();
    }    

    render(){
        return (
            <span className="AppStateComponent">
                AppState
            </span>
        );
    }
};

export default AppStateComponent;


