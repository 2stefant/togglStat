import React from "react";
import ListComponent from "../components/ListComponent";
import moment from "moment";
import { ConnectionStatusContext } from "../services/ConnectionStatusContext";
import BasicDropdown from '../components/BasicDropdown';

class WeeksView extends React.Component {
  constructor(props) {
    super(props);
  }

  getAllSundays(){
    const start=moment().startOf('year'); //first day of year
    //console.log(start.format('YYYY-MM-DD'));

    const end = moment().startOf('days'); //today
    //console.log(end.format('YYYY-MM-DD'));

    //calculate only Sunday
    const dailyInfo = [true, false, false, false, false, false, false]
    const sundayIndex=0;
    let totalDays = 0;
    var sundays=[];
  
    dailyInfo.forEach((info, index) => {
      if (info === true) {
          let current = start.clone();
          
          if (current.isoWeekday() <= index) {
            current = current.isoWeekday(index);
          } else {
            current.add(1, 'weeks').isoWeekday(index);
          }

          while (current.isSameOrBefore(end)) {
            let mom=current.day(7 + index);
            
            let sun=mom.format('YYYY-MM-DD');
            sundays.push(sun);
            //console.log(sun);
            totalDays += 1;
          }
        }
      });

      return sundays;
  }

  

  jsxSundaysDropDown = () =>{

    let items = this.getAllSundays().map((day, ix) => {
        return { id: ix+1, name: `${day} - Week X` };
    });

    return <BasicDropdown 
        idNameItems={items} 
        title="Sunday-Week"
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
