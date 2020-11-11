import React from 'react';
import ListComponent from './ListComponent'
import moment from 'moment';
// import { useHistory } from "react-router-dom";

function WeeksView() {

    // const history = useHistory();

    const tableHeaderWeekDays = moment.weekdaysShort().map(day => {
        return (
          <th key={day} className="week-day">
           {day}
          </th>
        );
     });

    const weeks = [
        {id: 1, name:'w23'}, 
        {id: 5, name:'w24'},
        {id: 8, name:'w27'},
    ];

    return (
        <div className="WeeksView">
            <ListComponent title={"Weeks"} items={weeks}/>
            <button name="months" onClick={navigateMonthsView}>Months</button>
            <table>
                <thead>
                    {tableHeaderWeekDays}
                </thead>
            </table>
        </div>);
};

const navigateMonthsView = () => {
    console.log("navigateMonthsView");
    // history.push('/months');
}

export default WeeksView;



