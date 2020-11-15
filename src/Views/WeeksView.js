import React from "react";
import ListComponent from "../Components/ListComponent";
import moment from "moment";
import { ConnectionStatusContext } from "../Services/ConnectionStatusContext";

class WeeksView extends React.Component {
constructor(props) {
super(props);
}

  navigateMonthsView = () => {
    console.log("navigateMonthsView");
  };

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

    const ctx = this.context;
    console.log(ctx);
    let content = <label>-</label>;

    if (ctx.isConnected) {
      content = (
        <>
          <ListComponent title={"Weeks"} items={weeks} hideTitle={true}/>
          <button name="months" onClick={() => this.navigateMonthsView()}>
            Months
          </button>
          <table>
            <thead>
              <tr>{tableHeaderWeekDays}</tr>
            </thead>
          </table>
          )
        </>
      );
    }

    return (
      <div className="WeeksView">
        <h2>Weeks</h2>
        {content}
      </div>
    );
  }
}

WeeksView.contextType = ConnectionStatusContext;
export default WeeksView;
