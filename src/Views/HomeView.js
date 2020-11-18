import React from "react";
import TimePeriodStatisticsComponent from "../components/TimePeriodStatisticsComponent";
import { ConnectionStatusContext } from "../services/ConnectionStatusContext";

class HomeView extends React.Component {
  render() {
    const { status, consumerCallback } = this.context;
    console.log(status);
    const content=(status.isConnected) 
      ? <TimePeriodStatisticsComponent />
      : null;

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
