import React from "react";
import { render } from "@testing-library/react-native";
import { Image } from "react-native";
import Avatar from "./Avatar";

describe("Avatar", () => {
  it("renders without crashing", () => {
    const { root } = render(<Avatar size={50} />);
    expect(root).toBeTruthy();
  });

  it("renders Image component", () => {
    const { root } = render(<Avatar size={50} />);
    const images = root.findAllByType(Image);
    expect(images.length).toBeGreaterThan(0);
  });

  it("sets correct height size", () => {
    const { root } = render(<Avatar size={60} />);
    const image = root.findByType(Image);
    expect(image.props.style.height).toBe(60);
  });

  it("sets correct width size", () => {
    const { root } = render(<Avatar size={60} />);
    const image = root.findByType(Image);
    expect(image.props.style.width).toBe(60);
  });

  it("renders with different sizes", () => {
    const { root: root1 } = render(<Avatar size={40} />);
    const image1 = root1.findByType(Image);
    expect(image1.props.style.height).toBe(40);
  });

  it("renders with large size", () => {
    const { root } = render(<Avatar size={150} />);
    const image = root.findByType(Image);
    expect(image.props.style.height).toBe(150);
  });

  it("renders with small size", () => {
    const { root } = render(<Avatar size={30} />);
    const image = root.findByType(Image);
    expect(image.props.style.height).toBe(30);
  });

  it("applies rounded-full class", () => {
    const { root } = render(<Avatar size={50} />);
    const image = root.findByType(Image);
    expect(image.props.className).toContain("rounded-full");
  });

  it("loads avatar image source", () => {
    const { root } = render(<Avatar size={50} />);
    const image = root.findByType(Image);
    expect(image.props.source).toBeTruthy();
  });

  it("has matching height and width", () => {
    const { root } = render(<Avatar size={75} />);
    const image = root.findByType(Image);
    expect(image.props.style.height).toBe(image.props.style.width);
  });

  it("height and width are numbers", () => {
    const { root } = render(<Avatar size={55} />);
    const image = root.findByType(Image);
    expect(typeof image.props.style.height).toBe("number");
    expect(typeof image.props.style.width).toBe("number");
  });
});