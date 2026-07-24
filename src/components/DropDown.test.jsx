import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import DropDown from "./DropDown";

describe("DropDown", () => {
  const options = ["Easy", "Medium", "Hard"];

  it("displays the currently selected option", () => {
    const { getByText } = render(
      <DropDown
        options={options}
        selectedOption="Medium"
        handlePress={jest.fn()}
      />
    );

    expect(getByText("Medium")).toBeTruthy();
  });

  it("opens the dropdown and displays the available options", () => {
    const { getByText } = render(
      <DropDown
        options={options}
        selectedOption="Select..."
        handlePress={jest.fn()}
      />
    );

    fireEvent.press(getByText("Select..."));

    expect(getByText("Easy")).toBeTruthy();
    expect(getByText("Medium")).toBeTruthy();
    expect(getByText("Hard")).toBeTruthy();
  });

  it("calls handlePress when an option is selected", () => {
    const handlePress = jest.fn();

    const { getByText } = render(
      <DropDown
        options={options}
        selectedOption="Select..."
        handlePress={handlePress}
      />
    );

    fireEvent.press(getByText("Select..."));
    fireEvent.press(getByText("Hard"));

    expect(handlePress).toHaveBeenCalledWith("Hard");
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});