import React from 'react';
const { calendarMetrics } = require("@2stefant.org/alldays");

class TimePeriodStatisticsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          metrics: calendarMetrics(),
          statistics: props.statistics
        };
      }
    
    switchPeriod(period) {
        switch (period) {
          case "day": return this.state.metrics.day;
          case "week": return this.state.metrics.week;
          case "month": return this.state.metrics.month;
          case "quarter": return this.state.metrics.quarter;
          case "year": return this.state.metrics.year;
          default: throw Error("Invalid case in switchPeriod.");
        }
      }

      jsxHeaderStats= ()=>{
        return <label>
            Current Day: {this.switchPeriod("day")}
            , Week: {this.switchPeriod("week")}
            , Month: {this.switchPeriod("month")}
            , Quarter: {this.switchPeriod("quarter")}
            , Year: {this.switchPeriod("year")}
        </label>
    }

    render() {
        return (
        <div className="TimePeriodStatisticsComponent">
            {this.jsxHeaderStats()}
            <br />
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Reported Time Statistics</li>
                </ol>
            </nav>
            <label name="week">Week: {this.state.statistics.week}</label><br/>
            <label name="month">Month: {this.state.statistics.month}</label><br/>
            <label name="quarter">Quarter: {this.state.statistics.quarter}</label><br/>
            <label name="midYear">MidYear: {this.state.statistics.midYear}</label><br/>
            <label name="year">Year: {this.state.statistics.year}</label><br/>
        </div>
        );
    };

};

export default TimePeriodStatisticsComponent;