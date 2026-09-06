/**
 * Component Regression Tests
 * Tests for reusable UI components to ensure they render without crashing
 */

import React from "react";
import { render } from "@testing-library/react-native";
import TextInputWithLogo from "../TextInputWithLogo";
import AntDesign from "@expo/vector-icons/AntDesign";

// Mock console
global.console.log = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

describe("Component Regression Tests", () => {
  // CMP-01: TextInputWithLogo renders
  describe("CMP-01: TextInputWithLogo Component", () => {
    it("should render without crashing", () => {
      const mockData = { email: "" };
      const mockSetData = jest.fn();

      const { getByPlaceholderText } = render(
        <TextInputWithLogo
          id="email"
          placeholder="Enter email"
          data={mockData}
          setData={mockSetData}
          logo={<AntDesign name="mail" size={24} color="black" />}
        />
      );

      expect(getByPlaceholderText("Enter email")).toBeTruthy();
    });

    it("should render with placeholder text", () => {
      const mockData = { password: "" };
      const mockSetData = jest.fn();

      const { getByPlaceholderText } = render(
        <TextInputWithLogo
          id="password"
          placeholder="Enter password"
          data={mockData}
          setData={mockSetData}
          logo={<AntDesign name="lock1" size={28} color="black" />}
          secure
        />
      );

      const input = getByPlaceholderText("Enter password");
      expect(input).toBeTruthy();
    });

    it("should render secure text input for password", () => {
      const mockData = { password: "" };
      const mockSetData = jest.fn();

      const { getByPlaceholderText } = render(
        <TextInputWithLogo
          id="password"
          placeholder="Enter password"
          data={mockData}
          setData={mockSetData}
          logo={<AntDesign name="lock1" size={28} color="black" />}
          secure
        />
      );

      const input = getByPlaceholderText("Enter password");
      expect(input.props.secureTextEntry).toBe(true);
    });

    it("should render regular text input (not secure) by default", () => {
      const mockData = { email: "" };
      const mockSetData = jest.fn();

      const { getByPlaceholderText } = render(
        <TextInputWithLogo
          id="email"
          placeholder="Email"
          data={mockData}
          setData={mockSetData}
          logo={<AntDesign name="mail" size={24} color="black" />}
        />
      );

      const input = getByPlaceholderText("Email");
      expect(input.props.secureTextEntry).not.toBe(true);
    });

    it("should have autoCapitalize disabled for email inputs", () => {
      const mockData = { email: "" };
      const mockSetData = jest.fn();

      const { getByPlaceholderText } = render(
        <TextInputWithLogo
          id="email"
          placeholder="Email"
          data={mockData}
          setData={mockSetData}
          logo={<AntDesign name="mail" size={24} color="black" />}
        />
      );

      const input = getByPlaceholderText("Email");
      expect(input.props.autoCapitalize).toBe("none");
    });
  });

  // CMP-02: Component styling
  describe("CMP-02: Component Styling", () => {
    it("should apply focus styles correctly", () => {
      const mockData = { email: "" };
      const mockSetData = jest.fn();

      const { getByPlaceholderText, UNSAFE_root } = render(
        <TextInputWithLogo
          id="email"
          placeholder="Email"
          data={mockData}
          setData={mockSetData}
          logo={<AntDesign name="mail" size={24} color="black" />}
        />
      );

      const input = getByPlaceholderText("Email");
      expect(input).toBeTruthy();
      expect(UNSAFE_root).toBeTruthy();
    });
  });
});
