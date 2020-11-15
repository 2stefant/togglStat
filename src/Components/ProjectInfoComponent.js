import React from 'react';

class ProjectInfoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let pi=this.props.projectInfo;
        let ps=this.props.projectSummary;

        return (
            <div className="ProjectInfo">
                <h2>ProjectInfo</h2>
                <p>
                    <label>{!pi ? "-" : pi.name}</label>
                    <label>{!pi ? "-" : pi.actual_hours}</label>
                    <label>{!pi ? "-" : pi.created_at}</label>
                    <label>{!ps ? "-" : ps.total_grand}</label>
                    <label>{!ps ? "-" : ps.data[0].title.client}</label>
                </p>
            </div>
        );
    };

};

export default ProjectInfoComponent;



