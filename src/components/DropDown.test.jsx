import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { act } from "@testing-library/react-native";
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

  it("opens the dropdown and displays the available options", async () => {
    const { getByText } = render(
      <DropDown
        options={options}
        selectedOption="Select..."
        handlePress={jest.fn()}
      />
    );

    act(() => {
      fireEvent.press(getByText("Select..."));
    });

    await waitFor(() => {
      expect(getByText("Easy")).toBeTruthy();
      expect(getByText("Medium")).toBeTruthy();
      expect(getByText("Hard")).toBeTruthy();
    });
  });

  it("calls handlePress when an option is selected", async () => {
    const handlePress = jest.fn();
    const { getByText } = render(
      <DropDown
        options={options}
        selectedOption="Select..."
        handlePress={handlePress}
      />
    );

    act(() => {
      fireEvent.press(getByText("Select..."));
    });

    await waitFor(() => {
      fireEvent.press(getByText("Hard"));
    });

    expect(handlePress).toHaveBeenCalledWith("Hard");
  });
});