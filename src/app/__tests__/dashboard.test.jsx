import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "@/context/themeContext";
import Dashboard from "../dashboard";

const renderDashboard = () =>
  render(
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );

describe("Dashboard screen", () => {
  it("renders the header and defaults to the Overview tab", () => {
    const { getByText } = renderDashboard();
    expect(getByText("SmartBike VR — Analytics Hub")).toBeTruthy();
    expect(getByText("Sessions per week")).toBeTruthy();
  });

  it("switches to the Performance tab without crashing", () => {
    const { getByTestId, getByText, queryByText } = renderDashboard();

    fireEvent.press(getByTestId("dashboard-tab-Performance"));

    expect(getByText("Avg speed trend over time")).toBeTruthy();
    expect(queryByText("Sessions per week")).toBeNull();
  });

  it("switches to the Engagement tab without crashing", () => {
    const { getByTestId, getByText } = renderDashboard();

    fireEvent.press(getByTestId("dashboard-tab-Engagement"));

    expect(getByText("Session frequency heatmap")).toBeTruthy();
  });

  it("switches to the System Health tab without crashing", () => {
    const { getByTestId, getByText } = renderDashboard();

    fireEvent.press(getByTestId("dashboard-tab-System Health"));

    expect(getByText("MQTT delay over time")).toBeTruthy();
  });

  it("toggles dark mode from the header button", () => {
    const { getByTestId } = renderDashboard();
    const toggle = getByTestId("dashboard-theme-toggle");

    // Toggling should not throw and the button should remain interactive.
    fireEvent.press(toggle);
    fireEvent.press(toggle);
  });
});
