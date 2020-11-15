import React from 'react';

class TimePeriodStatisticsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const inlineStyle={
            backgroundColor: "DodgerBlue",  
            color: "#74e4ec",
            padding: "3px 6px",
            fontFamily: "Arial"
        };

        return (
            <div className="TimePeriodStatisticsComponent">
                <fieldset>
                    <legend style={inlineStyle}>Reported Time Statistics</legend>
                    <label name="week">Week</label><br/>
                    <label name="month">Month</label><br/>
                    <label name="quarter">Quarter</label><br/>
                    <label name="midYear">MidYear</label><br/>
                    <label name="year">Year</label><br/>
                  </fieldset>
            </div>
        );
    };

};

export default TimePeriodStatisticsComponent;