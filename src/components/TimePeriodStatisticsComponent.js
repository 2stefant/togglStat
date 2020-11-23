import React from 'react';

class TimePeriodStatisticsComponent extends React.Component {

    render() {
        return (
            <div className="TimePeriodStatisticsComponent">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Reported Time Statistics</li>
                    </ol>
                </nav>
                <label name="week">Week</label><br/>
                <label name="month">Month</label><br/>
                <label name="quarter">Quarter</label><br/>
                <label name="midYear">MidYear</label><br/>
                <label name="year">Year</label><br/>
            </div>
        );
    };

};

export default TimePeriodStatisticsComponent;