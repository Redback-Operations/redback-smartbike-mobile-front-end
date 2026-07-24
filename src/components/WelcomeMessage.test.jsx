import React from "react";
import { render } from "@testing-library/react-native";
import WelcomeMessage from "./WelcomeMessage";

describe("WelcomeMessage", () => {
  it("displays the morning greeting", () => {
    const { getByText } = render(
      <WelcomeMessage name="Wasim" />
    );

    expect(getByText("Good Morning,")).toBeTruthy();
  });

  it("displays the user's name", () => {
    const { getByText } = render(
      <WelcomeMessage name="Wasim" />
    );

    expect(getByText("Wasim")).toBeTruthy();
  });
});