import React from "react";
import { render } from "@testing-library/react-native";
import Connect from "./Connect";

describe("Connect - Regression Tests", () => {
  describe("Component Rendering", () => {
    it("renders without crashing", () => {
      const { root } = render(<Connect />);
      expect(root).toBeDefined();
    });

    it("renders LinearGradient wrapper", () => {
      const { getByTestId } = render(<Connect />);
      const gradient = getByTestId("connect-gradient");
      expect(gradient).toBeDefined();
    });

    it("renders connect container", () => {
      const { getByTestId } = render(<Connect />);
      const container = getByTestId("connect-container");
      expect(container).toBeDefined();
    });

    it("renders connect header", () => {
      const { getByTestId } = render(<Connect />);
      const header = getByTestId("connect-header");
      expect(header).toBeDefined();
    });

    it("renders Text with 'Connect' label", () => {
      const { getByText } = render(<Connect />);
      const connectText = getByText("Connect");
      expect(connectText).toBeDefined();
    });

    it("renders MaterialIcons icon", () => {
      const { getByTestId } = render(<Connect />);
      const icon = getByTestId("connect-icon");
      expect(icon).toBeDefined();
    });
  });

  describe("Text Styling - Regression", () => {
    it("text remains white color", () => {
      const { getByText } = render(<Connect />);
      const connectText = getByText("Connect");
      expect(connectText.props.className).toContain("text-white");
    });

    it("text is bold", () => {
      const { getByText } = render(<Connect />);
      const connectText = getByText("Connect");
      expect(connectText.props.className).toContain("font-bold");
    });

    it("text is centered", () => {
      const { getByText } = render(<Connect />);
      const connectText = getByText("Connect");
      expect(connectText.props.className).toContain("text-center");
    });
  });

  describe("Layout Structure - Regression", () => {
    it("maintains flex row layout for header", () => {
      const { getByTestId } = render(<Connect />);
      const headerView = getByTestId("connect-header");
      expect(headerView.props.className).toContain("flex");
      expect(headerView.props.className).toContain("flex-row");
    });

    it("maintains items-center alignment", () => {
      const { getByTestId } = render(<Connect />);
      const headerView = getByTestId("connect-header");
      expect(headerView.props.className).toContain("items-center");
    });

    it("maintains justify-between spacing", () => {
      const { getByTestId } = render(<Connect />);
      const headerView = getByTestId("connect-header");
      expect(headerView.props.className).toContain("justify-between");
    });

    it("maintains aspect-square ratio", () => {
      const { getByTestId } = render(<Connect />);
      const container = getByTestId("connect-container");
      expect(container.props.className).toContain("aspect-square");
    });

    it("maintains padding of 4", () => {
      const { getByTestId } = render(<Connect />);
      const container = getByTestId("connect-container");
      expect(container.props.className).toContain("p-4");
    });
  });

  describe("Props Stability - Regression", () => {
    it("component exports as default", () => {
      expect(Connect).toBeDefined();
    });

    it("component receives no required props", () => {
      const { root } = render(<Connect />);
      expect(root).toBeDefined();
    });
  });

  describe("Accessibility - Regression", () => {
    it("text label is readable", () => {
      const { getByText } = render(<Connect />);
      const connectText = getByText("Connect");
      expect(connectText.props.children).toBe("Connect");
    });

    it("icon component is rendered", () => {
      const { getByTestId } = render(<Connect />);
      const icon = getByTestId("connect-icon");
      expect(icon).toBeDefined();
    });
  });
});