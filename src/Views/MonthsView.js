import React, { useState } from 'react';
import Calendar from 'react-calendar';
import ListComponent from '../Components/ListComponent'

/*
Demonstractes the following React concepts:
 - Arrow function component.
 - React hooks for state.
 */
const MonthsView = () => {

    const [value, onChange] = useState(new Date());

    const months = [
        { id: 1, name: 'jan' },
        { id: 5, name: 'feb' },
        { id: 8, name: 'oct' },
    ];

    const navigateWeeksView = () => {
        console.log("navigateWeeksView");
    }

    return (
        <div className="Months">
            <ListComponent title={"Months"} items={months} />
            <button name="weeks" onClick={navigateWeeksView}>Weeks</button>
            <div>
                <Calendar
                    onChange={onChange} defaultValue={new Date()} showWeekNumbers={true}
                    value={value}
                />
            </div>
        </div>);
};

export default MonthsView;



