import React from "react";
import { Text } from "react-native";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, useTheme } from "@/context/themeContext";

function Probe() {
  const { theme, isDark, toggleTheme } = useTheme();
  return (
    <Text testID="probe" onPress={toggleTheme}>
      {theme}-{String(isDark)}
    </Text>
  );
}

describe("ThemeContext", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("defaults to light theme", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    expect(getByTestId("probe").props.children.join("")).toBe("light-false");
  });

  it("toggles to dark and persists the choice", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    await act(async () => {
      fireEvent.press(getByTestId("probe"));
    });

    expect(getByTestId("probe").props.children.join("")).toBe("dark-true");
    await waitFor(async () => {
      expect(await AsyncStorage.getItem("app-theme")).toBe("dark");
    });
  });

  it("restores a previously saved dark preference on mount", async () => {
    await AsyncStorage.setItem("app-theme", "dark");

    const { getByTestId } = render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("probe").props.children.join("")).toBe("dark-true");
    });
  });

  it("throws when useTheme is used outside a ThemeProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
    spy.mockRestore();
  });
});
