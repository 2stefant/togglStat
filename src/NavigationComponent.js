import React from 'react';
// import { useHistory } from "react-router-dom";

function NavigationComponent() {

    // const history = useHistory();

    return (
        <div className="NavigationComponent">
            <h2>Navigation</h2>
            <button name="weeks" onClick={navigateWeeksView}>Weeks</button>
            <button name="months" onClick={navigateMonthsView}>Months</button>
        </div>);
};

const navigateWeeksView = () => {
    console.log("navigateWeeksView");
    // history.push('/weeks');
}

const navigateMonthsView = () => {
    console.log("navigateMonthsView");
    // history.push('/months');
}

export default NavigationComponent;



