import React from "react";
import { render } from "@testing-library/react-native";
import { Image, TouchableOpacity } from "react-native";
import LoginIcon from "./LoginIcon";

describe("LoginIcon", () => {
  const mockImage = { uri: "https://example.com/google-icon.png" };

  it("renders without crashing", () => {
    const { UNSAFE_getByType } = render(<LoginIcon image={mockImage} />);
    expect(UNSAFE_getByType(TouchableOpacity)).toBeTruthy();
  });

  it("displays the image with correct resize mode", () => {
    const { UNSAFE_getByType } = render(<LoginIcon image={mockImage} />);
    const image = UNSAFE_getByType(Image);
    expect(image.props.resizeMode).toBe("contain");
  });

  it("renders image with correct source prop", () => {
    const { UNSAFE_getByType } = render(<LoginIcon image={mockImage} />);
    const image = UNSAFE_getByType(Image);
    expect(image.props.source).toEqual(mockImage);
  });

  it("applies correct styling to container", () => {
    const { UNSAFE_getByType } = render(<LoginIcon image={mockImage} />);
    const button = UNSAFE_getByType(TouchableOpacity);

    expect(button.props.className).toContain("rounded-full");
    expect(button.props.className).toContain("bg-white");
  });
});