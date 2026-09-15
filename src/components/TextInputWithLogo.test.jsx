import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TextInput, View } from "react-native";
import TextInputWithLogo from "./TextInputWithLogo";

describe("TextInputWithLogo", () => {
  const mockLogo = <View testID="mock-logo" />;
  const mockSetData = jest.fn();
  const mockData = {};

  beforeEach(() => {
    mockSetData.mockClear();
  });

  it("renders without crashing", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    expect(UNSAFE_getByType(TextInput)).toBeTruthy();
  });

  it("displays the logo component", () => {
    const { getByTestId } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    expect(getByTestId("mock-logo")).toBeTruthy();
  });

  it("displays placeholder text", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter password"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="password"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    expect(textInput.props.placeholder).toBe("Enter password");
  });

  it("updates data when text is entered", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    fireEvent.changeText(textInput, "test@example.com");
    expect(mockSetData).toHaveBeenCalledWith({
      ...mockData,
      email: "test@example.com",
    });
  });

  it("applies secure text entry when secure prop is true", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter password"
        secure={true}
        data={mockData}
        setData={mockSetData}
        id="password"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    expect(textInput.props.secureTextEntry).toBe(true);
  });

  it("does not apply secure text entry when secure prop is false", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    expect(textInput.props.secureTextEntry).toBe(false);
  });

  it("changes border color to brand-purple on focus", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    fireEvent(textInput, "focus");
    
    const container = UNSAFE_getByType(View);
    expect(container.props.className).toContain("border-brand-purple");
  });

  it("changes border color back to gray-400 on blur", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    fireEvent(textInput, "focus");
    fireEvent(textInput, "blur");
    
    const container = UNSAFE_getByType(View);
    expect(container.props.className).toContain("border-gray-400");
  });

  it("displays existing data value", () => {
    const existingData = { email: "existing@example.com" };
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={existingData}
        setData={mockSetData}
        id="email"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    expect(textInput.props.value).toBe("existing@example.com");
  });

  it("disables autoCapitalize", () => {
    const { UNSAFE_getByType } = render(
      <TextInputWithLogo
        logo={mockLogo}
        placeholder="Enter email"
        secure={false}
        data={mockData}
        setData={mockSetData}
        id="email"
      />
    );
    const textInput = UNSAFE_getByType(TextInput);
    expect(textInput.props.autoCapitalize).toBe("none");
  });
});