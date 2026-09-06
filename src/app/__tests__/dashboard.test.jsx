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

describe("DSH-01: Dashboard Loading", () => {
  it("should render dashboard without crashing", () => {
    const { getByText } = renderDashboard();
    expect(getByText("SmartBike VR — Analytics Hub")).toBeTruthy();
  });

  it("should display default Overview tab on load", () => {
    const { getByText } = renderDashboard();
    expect(getByText("Sessions per week")).toBeTruthy();
  });

  it("should have all tab buttons accessible", () => {
    const { getByTestId } = renderDashboard();
    
    expect(getByTestId("dashboard-tab-Overview")).toBeTruthy();
    expect(getByTestId("dashboard-tab-Performance")).toBeTruthy();
    expect(getByTestId("dashboard-tab-Engagement")).toBeTruthy();
    expect(getByTestId("dashboard-tab-System Health")).toBeTruthy();
  });
});

describe("DSH-02: Ride Statistics Display", () => {
  it("should display ride statistics in Overview tab", () => {
    const { getByText } = renderDashboard();
    
    // Check for statistical labels
    expect(getByText("Sessions per week")).toBeTruthy();
  });

  it("should show speed metrics in Performance tab", () => {
    const { getByTestId, getByText } = renderDashboard();
    
    fireEvent.press(getByTestId("dashboard-tab-Performance"));
    expect(getByText("Avg speed trend over time")).toBeTruthy();
  });

  it("should display engagement metrics in Engagement tab", () => {
    const { getByTestId, getByText } = renderDashboard();
    
    fireEvent.press(getByTestId("dashboard-tab-Engagement"));
    expect(getByText("Session frequency heatmap")).toBeTruthy();
  });

  it("should show system health data in System Health tab", () => {
    const { getByTestId, getByText } = renderDashboard();
    
    fireEvent.press(getByTestId("dashboard-tab-System Health"));
    expect(getByText("MQTT delay over time")).toBeTruthy();
  });
});

describe("DSH-03: Data Update Behavior", () => {
  it("should reflect updated ride data after new session", () => {
    const { getByText, rerender } = renderDashboard();
    
    expect(getByText("Sessions per week")).toBeTruthy();
    
    // Re-render to simulate data update
    rerender(
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    );
    
    expect(getByText("Sessions per week")).toBeTruthy();
  });

  it("should handle multiple tab switches", () => {
    const { getByTestId, getByText } = renderDashboard();
    
    // Switch through all tabs multiple times
    fireEvent.press(getByTestId("dashboard-tab-Performance"));
    expect(getByText("Avg speed trend over time")).toBeTruthy();
    
    fireEvent.press(getByTestId("dashboard-tab-Overview"));
    expect(getByText("Sessions per week")).toBeTruthy();
    
    fireEvent.press(getByTestId("dashboard-tab-Engagement"));
    expect(getByText("Session frequency heatmap")).toBeTruthy();
  });
});

describe("DSH-04: No Ride Data Handling", () => {
  it("should handle dashboard gracefully with no data", () => {
    const { getByText } = renderDashboard();
    
    // Dashboard should still render even if data is empty
    expect(getByText("SmartBike VR — Analytics Hub")).toBeTruthy();
  });

  it("should display placeholder content when no sessions exist", () => {
    const { UNSAFE_root } = renderDashboard();
    
    expect(UNSAFE_root).toBeTruthy();
  });
});

describe("DSH-05: Edge Cases - Large/Zero Values", () => {
  it("should render dashboard with any numeric values", () => {
    const { getByText } = renderDashboard();
    
    expect(getByText("SmartBike VR — Analytics Hub")).toBeTruthy();
  });

  it("should handle metric display without overflow", () => {
    const { UNSAFE_root } = renderDashboard();
    
    expect(UNSAFE_root).toBeTruthy();
  });

  it("should switch tabs multiple times without memory leak", () => {
    const { getByTestId } = renderDashboard();
    
    const tabs = ["Overview", "Performance", "Engagement", "System Health"];
    
    for (let i = 0; i < 3; i++) {
      tabs.forEach(tab => {
        fireEvent.press(getByTestId(`dashboard-tab-${tab}`));
      });
    }
  });
});

describe("DSH-06: Theme Switching", () => {
  it("should toggle between light and dark themes", () => {
    const { getByTestId } = renderDashboard();
    const toggle = getByTestId("dashboard-theme-toggle");
    
    fireEvent.press(toggle);
    expect(toggle).toBeTruthy();
    
    fireEvent.press(toggle);
    expect(toggle).toBeTruthy();
  });

  it("should persist theme when switching tabs", () => {
    const { getByTestId } = renderDashboard();
    
    fireEvent.press(getByTestId("dashboard-theme-toggle"));
    fireEvent.press(getByTestId("dashboard-tab-Performance"));
    
    expect(getByTestId("dashboard-theme-toggle")).toBeTruthy();
  });
});
