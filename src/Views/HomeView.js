import React from "react";
import TimePeriodStatisticsComponent from "../Components/TimePeriodStatisticsComponent";
import { ConnectionStatusContext } from "../Services/ConnectionStatusContext";

class HomeView extends React.Component {
  render() {
    const ctx = this.context;
    console.log(ctx);
    const content=(ctx.isConnected) 
      ? <TimePeriodStatisticsComponent />
      : <label>-</label>;

    return (
      <div>
        <h2>Home</h2>
        {content}
      </div>
    );
  }
}
HomeView.contextType = ConnectionStatusContext;
export default HomeView;
