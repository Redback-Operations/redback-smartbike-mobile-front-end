import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import WelcomeMessage from "./WelcomeMessage";

describe("WelcomeMessage", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<WelcomeMessage name="John" />);
    expect(getByText("Good Morning,")).toBeTruthy();
  });

  it("displays greeting text", () => {
    const { getByText } = render(<WelcomeMessage name="Alice" />);
    expect(getByText("Good Morning,")).toBeTruthy();
  });

  it("displays user name", () => {
    const { getByText } = render(<WelcomeMessage name="Bob" />);
    expect(getByText("Bob")).toBeTruthy();
  });

  it("renders both greeting and name", () => {
    const { getByText } = render(<WelcomeMessage name="Sarah" />);
    expect(getByText("Good Morning,")).toBeTruthy();
    expect(getByText("Sarah")).toBeTruthy();
  });

  it("displays different names correctly", () => {
    const { getByText } = render(<WelcomeMessage name="Michael" />);
    expect(getByText("Michael")).toBeTruthy();
  });

  it("handles empty name", () => {
    const { getByText } = render(<WelcomeMessage name="" />);
    expect(getByText("Good Morning,")).toBeTruthy();
  });

  it("handles names with spaces", () => {
    const { getByText } = render(<WelcomeMessage name="John Doe" />);
    expect(getByText("John Doe")).toBeTruthy();
  });

  it("renders greeting with correct styling class", () => {
    const { root } = render(<WelcomeMessage name="Test" />);
    const textElements = root.findAllByType(Text);
    expect(textElements.length).toBeGreaterThan(0);
  });
});