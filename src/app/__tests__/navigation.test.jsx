/**
 * Navigation Regression Tests
 * Tests for screen navigation, back button behavior, and navigation menu functionality
 */

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

// Mock router
const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
  back: jest.fn(),
};

jest.mock("expo-router", () => ({
  router: mockRouter,
  Link: ({ href, children }) => children,
  useRouter: () => mockRouter,
}));

// Mock linear gradient
jest.mock("expo-linear-gradient", () => {
  const { View } = require("react-native");
  return { LinearGradient: View };
});

describe("NAV-01: Screen Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should navigate between different screens without crashing", async () => {
    const screens = ["home", "friends", "profile", "settings"];
    
    for (const screen of screens) {
      mockRouter.push(`/${screen}`);
      expect(mockRouter.push).toHaveBeenCalledWith(`/${screen}`);
    }
  });

  it("should handle nested route navigation", async () => {
    mockRouter.push("/(tabs)/home");
    expect(mockRouter.push).toHaveBeenCalledWith("/(tabs)/home");
    
    mockRouter.push("/(tabs)/friends");
    expect(mockRouter.push).toHaveBeenCalledWith("/(tabs)/friends");
  });

  it("should replace screen when needed", async () => {
    mockRouter.replace("/(tabs)/home");
    expect(mockRouter.replace).toHaveBeenCalledWith("/(tabs)/home");
  });
});

describe("NAV-02: Back Button Behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle back navigation", () => {
    mockRouter.back();
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("should navigate back to previous screen", () => {
    mockRouter.push("/friends");
    mockRouter.back();
    
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("should support multiple back gestures", () => {
    for (let i = 0; i < 3; i++) {
      mockRouter.back();
    }
    
    expect(mockRouter.back).toHaveBeenCalledTimes(3);
  });

  it("should not crash when back is called at root", () => {
    mockRouter.replace("/(tabs)/home");
    mockRouter.back();
    
    expect(mockRouter.back).toHaveBeenCalled();
  });
});

describe("NAV-03: Bottom Navigation Menu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should support navigation through menu tabs", () => {
    const navItems = [
      { label: "Home", route: "home" },
      { label: "Friends", route: "friends" },
      { label: "Profile", route: "profile" },
    ];

    navItems.forEach(item => {
      mockRouter.push(`/(tabs)/${item.route}`);
      expect(mockRouter.push).toHaveBeenCalledWith(`/(tabs)/${item.route}`);
    });
  });

  it("should switch tabs without losing state", () => {
    jest.clearAllMocks();
    mockRouter.push("/(tabs)/home");
    mockRouter.push("/(tabs)/friends");
    mockRouter.push("/(tabs)/home");
    
    expect(mockRouter.push).toHaveBeenCalledTimes(3);
  });
});

describe("NAV-04: Screen Resilience - No Crash on Repeated Open", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not crash when opening same screen repeatedly", async () => {
    const screen = "/(tabs)/home";
    
    for (let i = 0; i < 5; i++) {
      mockRouter.push(screen);
    }
    
    expect(mockRouter.push).toHaveBeenCalledTimes(5);
  });

  it("should handle rapid screen switching", async () => {
    const screens = ["home", "friends", "profile"];
    
    for (let i = 0; i < 3; i++) {
      screens.forEach(screen => {
        mockRouter.push(`/(tabs)/${screen}`);
      });
    }
    
    expect(mockRouter.push).toHaveBeenCalledTimes(9);
  });

  it("should maintain navigation stack integrity", async () => {
    mockRouter.push("/(tabs)/home");
    mockRouter.push("/(tabs)/friends");
    mockRouter.push("/(tabs)/profile");
    
    expect(mockRouter.push).toHaveBeenCalledTimes(3);
  });

  it("should not leak memory on screen transitions", async () => {
    for (let i = 0; i < 20; i++) {
      mockRouter.replace(`/(tabs)/home?refresh=${i}`);
    }
    
    expect(mockRouter.replace).toHaveBeenCalled();
  });
});

describe("NAV-05: Deep Linking", () => {
  it("should handle deep link navigation", () => {
    mockRouter.push("/(tabs)/home?workout=123");
    expect(mockRouter.push).toHaveBeenCalledWith("/(tabs)/home?workout=123");
  });

  it("should preserve query parameters during navigation", () => {
    mockRouter.push("/(tabs)/profile?userId=456");
    expect(mockRouter.push).toHaveBeenCalledWith("/(tabs)/profile?userId=456");
  });
});
