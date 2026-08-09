import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "@/context/themeContext";
import { AuthContext } from "@/context/authContext";
import Settings from "../settings";

jest.mock("expo-router", () => ({
  router: { push: jest.fn(), replace: jest.fn() },
}));

// authContext.tsx eagerly creates a Supabase client from env vars on import;
// stub it out so the test only depends on the AuthContext value we provide.
jest.mock("@/lib/supabase", () => ({ supabase: {} }));

const renderSettings = (authValue = { user: { username: "rider1" }, loading: false }) =>
  render(
    <ThemeProvider>
      <AuthContext.Provider value={authValue}>
        <Settings />
      </AuthContext.Provider>
    </ThemeProvider>
  );

describe("Settings screen", () => {
  it("shows a loading spinner while auth is resolving", () => {
    const { queryByText } = renderSettings({ user: null, loading: true });
    expect(queryByText("Settings")).toBeNull();
  });

  it("renders the Dark Mode toggle, off by default", () => {
    const { getByText, getByTestId } = renderSettings();
    expect(getByText("Dark Mode")).toBeTruthy();
    expect(getByTestId("settings-dark-mode-switch").props.value).toBe(false);
  });

  it("flips the Dark Mode switch on press", () => {
    const { getByTestId } = renderSettings();
    const toggle = getByTestId("settings-dark-mode-switch");

    fireEvent(toggle, "valueChange", true);

    expect(getByTestId("settings-dark-mode-switch").props.value).toBe(true);
  });

  it("still renders the existing navigation items", () => {
    const { getByText } = renderSettings();
    expect(getByText("My Profile")).toBeTruthy();
    expect(getByText("Logout")).toBeTruthy();
  });
});
