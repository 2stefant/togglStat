import React from 'react';

class ProjectInfoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ProjectInfo">
                <h2>ProjectInfo</h2>
                <p>
                    <label>{!this.props.projectInfo ? "-" : this.props.projectInfo.name}</label>
                    <label>{!this.props.projectInfo ? "-" : this.props.projectInfo.actual_hours}</label>
                    <label>{!this.props.projectInfo ? "-" : this.props.projectInfo.created_at}</label>
                    <label>{!this.props.projectSummary ? "-" : this.props.projectSummary.total_grand}</label>
                    <label>{!this.props.projectSummary ? "-" : this.props.projectSummary.data[0].title.client}</label>
                </p>
            </div>
        );
    };

};

export default ProjectInfoComponent;



