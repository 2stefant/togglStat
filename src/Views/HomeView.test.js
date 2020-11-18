import { render, screen } from "@testing-library/react";
import {
  ConnectionStatusContext,
  connectionStatus,
} from "../services/ConnectionStatusContext";
import HomeView from "./HomeView";

describe("HomeView", () => {
  test("should show Home", () => {
    render(<HomeView />);
    let text = "Home";
    let elem = screen.getByText(text);
    expect(elem).toBeInTheDocument(text);
  });

  const baseTestFlow = (isConnected, text) => {
    let conn = {
      status: isConnected
        ? connectionStatus.connected
        : connectionStatus.notConnected,
      consumerCallback: null,
    };

    render(
      <ConnectionStatusContext.Provider value={conn}>
        <HomeView />
      </ConnectionStatusContext.Provider>
    );

    let elem = screen.getByText(text);
    expect(elem).toBeInTheDocument(text);
  };

  test("should show Statistics, mock Context", () => {
    baseTestFlow(true, "Reported Time Statistics");
  });
});
