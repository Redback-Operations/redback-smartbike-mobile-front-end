import React from "react";
import { render } from "@testing-library/react-native";
import TodayRideSummaryCard from "./TodayRideSummaryCard";

describe("TodayRideSummaryCard", () => {
  it("displays the ride summary information", () => {
    const { getByText } = render(
      <TodayRideSummaryCard
        distanceKm={3.2}
        durationMin={17}
        avgSpeedKmh={11.3}
        caloriesKcal={220}
        terrain="Forest Trail"
        goalKm={5.0}
      />
    );

    expect(getByText("Today's Ride Summary")).toBeTruthy();
    expect(getByText("Forest Trail")).toBeTruthy();
    expect(getByText("64%")).toBeTruthy();
  });

  it("shows remaining distance when goal is not reached", () => {
    const { getByText } = render(
      <TodayRideSummaryCard
        distanceKm={3.2}
        goalKm={5.0}
      />
    );

    expect(getByText("1.8")).toBeTruthy();
  });

  it("shows goal reached message when distance reaches the goal", () => {
    const { getByText } = render(
      <TodayRideSummaryCard
        distanceKm={5.0}
        goalKm={5.0}
      />
    );

    expect(getByText("✅ Daily ride goal reached!")).toBeTruthy();
    expect(getByText("100%")).toBeTruthy();
  });
});