import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import WorkoutCard from "./WorkoutCard";

describe("WorkoutCard", () => {
  const defaultProps = {
    title: "Morning Ride",
    image: "🚴",
    bgColor: "#123456",
    handlePress: jest.fn(),
    isSelected: false,
    setSelectedWorkout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the workout title", () => {
    const { getByText } = render(<WorkoutCard {...defaultProps} />);

    expect(getByText("Morning Ride")).toBeTruthy();
  });

  it("calls handlePress when the workout card is pressed", () => {
    const handlePress = jest.fn();

    const { getByText } = render(
      <WorkoutCard {...defaultProps} handlePress={handlePress} />
    );

    fireEvent.press(getByText("Morning Ride"));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});