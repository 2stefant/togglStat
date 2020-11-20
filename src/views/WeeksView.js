import React from "react";
import ListComponent from "../components/ListComponent";
import moment from "moment";
import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import BasicDropdown from '../components/BasicDropdown';
const {alldays} = require("@2stefant.org/alldays");

class WeeksView extends React.Component {
  constructor(props) {
    super(props);
  }

  jsxSundaysDropDown = () =>{

    let days=alldays(7); 

    let items = days.map((day, ix) => {
        return { id: ix+1, name: `w${ix+1}, ${day}` };
    });

    return <BasicDropdown 
        idNameItems={items} 
        title="Sunday"
        callBack={() =>{ console.log("callBack-BasicDropdown-sundays");}} 
    />
  }

  render() {
    const weeks = [
      { id: 1, name: "w23" },
      { id: 5, name: "w24" },
      { id: 8, name: "w27" },
    ];

    const tableHeaderWeekDays = moment.weekdaysShort()
        .map((day) => {
            return (
                <th key={day} className="week-day">
                {day}
                </th>
            );
    });

    return (
      <div className="WeeksView">
        <h2>Weeks</h2>
        {!this.context.status.isConnected ? null: 
        <>
          <ListComponent title={"Weeks"} items={weeks} hideTitle={true}/>
          <table>
            <thead>
              <tr>{tableHeaderWeekDays}</tr>
            </thead>
          </table>
          {this.jsxSundaysDropDown()}
        </>
        }
      </div>
    );
  }
}
WeeksView.contextType = ConnectionStatusContext;
export default WeeksView;
