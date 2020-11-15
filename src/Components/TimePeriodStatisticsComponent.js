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
                    <label for="week">Week</label><br/>
                    <label for="month">Month</label><br/>
                    <label for="quarter">Quarter</label><br/>
                    <label for="midYear">MidYear</label><br/>
                    <label for="year">Year</label><br/>
                  </fieldset>
            </div>
        );
    };

};

export default TimePeriodStatisticsComponent;