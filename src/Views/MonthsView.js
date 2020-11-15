import { render } from "@testing-library/react";
import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import ListComponent from "../Components/ListComponent";
import { ConnectionStatusContext } from "../Services/ConnectionStatusContext";

/*
Demonstractes the following React concepts:
 - Arrow function component.
 - React hooks for state.
 - Use context in function component.
 */
const MonthsView = () => {
  const [value, onChange] = useState(new Date());

  const ctx = useContext(ConnectionStatusContext);
  console.log(ctx);
  let content = <label>-</label>;

  const months = [
    { id: 1, name: "jan" },
    { id: 5, name: "feb" },
    { id: 8, name: "oct" },
  ];

  const navigateWeeksView = () => {
    console.log("navigateWeeksView");
  };

  if (ctx.isConnected) {
    content = (
      <>
        <ListComponent title={"Months"} items={months} hideTitle={true} />
        <button name="weeks" onClick={navigateWeeksView}>Weeks</button>
        <div>
          <Calendar
            onChange={onChange}
            defaultValue={new Date()}
            showWeekNumbers={true}
            value={value}
          />
        </div>
      </>
    );
  }

  return (
    <div className="MonthsView">
      <h2>Months</h2>
      {content}
    </div>
  );
};
export default MonthsView;
