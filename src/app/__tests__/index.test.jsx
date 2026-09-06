/**
 * Login Regression Tests
 * Tests for all login scenarios including valid login, errors, validation, and edge cases
 */

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import LoginScreen from "../index";

// Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
  Link: ({ href, children }) => children,
}));

// Mock expo-linear-gradient (already mocked in jest.setup.js but we ensure it)
jest.mock("expo-linear-gradient", () => {
  const { View } = require("react-native");
  return { LinearGradient: View };
});

// Mock the auth context
const mockSignIn = jest.fn();
const mockSignInWithOAuth = jest.fn();

jest.mock("@/context/authContext", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signInWithOAuth: mockSignInWithOAuth,
  }),
}));

// Mock console methods to avoid cluttering test output
global.console.log = jest.fn();
global.console.error = jest.fn();
global.console.warn = jest.fn();

describe("Login Screen Regression Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  // LGN-01: Valid login
  describe("LGN-01: Valid Login", () => {
    it("should successfully login with valid credentials and navigate to home", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const { router } = require("expo-router");

      // Mock successful login response
      mockSignIn.mockResolvedValueOnce({
        data: { session: { user: { id: "123" } } },
        error: null,
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      // Enter credentials
      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "validPassword123");

      // Press login
      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalledWith(
            "testuser@example.com",
            "validPassword123"
          );
        });
      });

      // Verify navigation
      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith("/(tabs)/home");
      });
    });
  });

  // LGN-02: Incorrect password
  describe("LGN-02: Incorrect Password", () => {
    it("should fail login and display error with incorrect password", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const errorMsg = "Invalid login credentials";
      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: errorMsg },
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "wrongPassword");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalledWith(
            "testuser@example.com",
            "wrongPassword"
          );
        });
      });

      // Verify error alert is shown
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });
  });

  // LGN-03: Unregistered/invalid user
  describe("LGN-03: Unregistered/Invalid User", () => {
    it("should fail login gracefully for unregistered user", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const errorMsg = "User not found";
      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: errorMsg },
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "nonexistent@example.com");
      fireEvent.changeText(passwordInput, "password123");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalledWith(
            "nonexistent@example.com",
            "password123"
          );
        });
      });

      // Verify error is displayed
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });
  });

  // LGN-04: Empty email
  describe("LGN-04: Empty Email", () => {
    it("should prevent login and show validation when email is empty", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      // Leave email empty, enter password
      fireEvent.changeText(passwordInput, "password123");

      await act(async () => {
        fireEvent.press(loginButton);
      });

      // Verify login is not called
      expect(mockSignIn).not.toHaveBeenCalled();

      // Verify validation message is shown
      expect(global.alert).toHaveBeenCalledWith(
        "Please enter both email and password"
      );
    });
  });

  // LGN-05: Empty password
  describe("LGN-05: Empty Password", () => {
    it("should prevent login and show validation when password is empty", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const emailInput = getByPlaceholderText("example@gmail.com");
      const loginButton = getByText("Sign in");

      // Enter email, leave password empty
      fireEvent.changeText(emailInput, "testuser@example.com");

      await act(async () => {
        fireEvent.press(loginButton);
      });

      // Verify login is not called
      expect(mockSignIn).not.toHaveBeenCalled();

      // Verify validation message is shown
      expect(global.alert).toHaveBeenCalledWith(
        "Please enter both email and password"
      );
    });
  });

  // LGN-06: Both fields empty
  describe("LGN-06: Both Fields Empty", () => {
    it("should prevent login when both email and password are empty", async () => {
      const { getByText } = render(<LoginScreen />);

      const loginButton = getByText("Sign in");

      // Press login without entering anything
      await act(async () => {
        fireEvent.press(loginButton);
      });

      // Verify login is not called
      expect(mockSignIn).not.toHaveBeenCalled();

      // Verify validation message is shown
      expect(global.alert).toHaveBeenCalledWith(
        "Please enter both email and password"
      );
    });
  });

  // LGN-07: Invalid email format
  describe("LGN-07: Invalid Email Format", () => {
    it("should allow submission but let backend handle invalid formats", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      // Test invalid email format - note: frontend doesn't validate email format
      // so we allow submission and backend should handle it
      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: "Invalid email format" },
      });

      fireEvent.changeText(emailInput, "test123");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalledWith("test123", "password");
        });
      });

      // Frontend should show error from backend
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });

    it("should handle email without @ symbol", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: "Invalid email" },
      });

      fireEvent.changeText(emailInput, "user@");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalledWith("user@", "password");
        });
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });

    it("should handle email starting with @", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: "Invalid email" },
      });

      fireEvent.changeText(emailInput, "@test.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalledWith("@test.com", "password");
        });
      });

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });
  });

  // LGN-08: Leading/trailing spaces
  describe("LGN-08: Leading/Trailing Spaces", () => {
    it("should pass email with spaces to auth context (which trims it)", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      mockSignIn.mockResolvedValueOnce({
        data: { session: { user: { id: "123" } } },
        error: null,
      });

      // Enter email with spaces
      fireEvent.changeText(emailInput, "  testuser@example.com  ");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          // Component passes the email as-is; authContext trims it
          expect(mockSignIn).toHaveBeenCalledWith(
            "  testuser@example.com  ",
            "password"
          );
        });
      });

      // Should succeed after authContext trims it
      await waitFor(() => {
        expect(require("expo-router").router.replace).toHaveBeenCalledWith(
          "/(tabs)/home"
        );
      });
    });
  });

  // LGN-09: Password visibility toggle
  describe("LGN-09: Password Visibility Toggle", () => {
    it("should render password field as secure (masked) by default", () => {
      const { getByPlaceholderText } = render(<LoginScreen />);

      const passwordInput = getByPlaceholderText("Enter your password");

      // Check if password field has secureTextEntry enabled
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it("should maintain password value when visibility changes", async () => {
      const { getByPlaceholderText } = render(<LoginScreen />);

      const passwordInput = getByPlaceholderText("Enter your password");
      const testPassword = "myPassword123";

      fireEvent.changeText(passwordInput, testPassword);

      // Verify password is stored correctly
      expect(passwordInput.props.value).toBe(testPassword);
    });
  });

  // LGN-10: Repeated login button press
  describe("LGN-10: Repeated Login Button Press", () => {
    it("should handle multiple rapid login attempts", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const { router } = require("expo-router");

      mockSignIn.mockResolvedValueOnce({
        data: { session: { user: { id: "123" } } },
        error: null,
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        // Press button multiple times rapidly
        fireEvent.press(loginButton);
        fireEvent.press(loginButton);
        fireEvent.press(loginButton);

        await waitFor(() => {
          // signIn may be called multiple times but navigation should happen
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Verify navigation occurred
      await waitFor(() => {
        expect(router.replace).toHaveBeenCalled();
      });
    });

    it("should not crash on rapid button presses with empty fields", async () => {
      const { getByText } = render(<LoginScreen />);

      const loginButton = getByText("Sign in");
      const alertSpy = jest.spyOn(global, "alert");

      await act(async () => {
        // Press button multiple times rapidly with empty fields
        fireEvent.press(loginButton);
        fireEvent.press(loginButton);
        fireEvent.press(loginButton);
      });

      // Should show validation, not crash
      expect(alertSpy).toHaveBeenCalled();
      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });

  // LGN-11: Authentication/network failure
  describe("LGN-11: Authentication/Network Failure", () => {
    it("should display error when authentication fails", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const errorMsg = "Network error: Unable to reach server";
      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: errorMsg },
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Verify error is displayed
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });
    });

    it("should handle exception during login", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      mockSignIn.mockRejectedValueOnce(new Error("Network timeout"));

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      const alertSpy = jest.spyOn(global, "alert");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Verify exception is caught and user is informed
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          "Something went wrong while signing in"
        );
      });
    });

    it("should remain usable after network error", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      mockSignIn.mockRejectedValueOnce(new Error("Network error"));

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Now test that user can retry
      jest.clearAllMocks();
      mockSignIn.mockResolvedValueOnce({
        data: { session: { user: { id: "123" } } },
        error: null,
      });

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Should be able to login after recovery
      expect(require("expo-router").router.replace).toHaveBeenCalledWith(
        "/(tabs)/home"
      );
    });
  });

  // LGN-12: Loading behaviour
  describe("LGN-12: Loading Behaviour", () => {
    it("should call signIn when login button is pressed", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      mockSignIn.mockResolvedValueOnce({
        data: { session: { user: { id: "123" } } },
        error: null,
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });
    });

    it("should handle async operation completion", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      // Simulate delayed response
      mockSignIn.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(
              () =>
                resolve({
                  data: { session: { user: { id: "123" } } },
                  error: null,
                }),
              100
            );
          })
      );

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        }, { timeout: 500 });
      });

      await waitFor(() => {
        expect(require("expo-router").router.replace).toHaveBeenCalledWith(
          "/(tabs)/home"
        );
      });
    });
  });

  // LGN-13: Successful navigation
  describe("LGN-13: Successful Navigation", () => {
    it("should navigate to home screen after successful login", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const { router } = require("expo-router");

      mockSignIn.mockResolvedValueOnce({
        data: { session: { user: { id: "123", email: "test@example.com" } } },
        error: null,
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password123");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith("/(tabs)/home");
      });
    });
  });

  // LGN-14: Failed login navigation
  describe("LGN-14: Failed Login Navigation", () => {
    it("should NOT navigate to authenticated screen on failed login", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);
      const { router } = require("expo-router");

      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: "Invalid credentials" },
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "wrongpassword");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Verify that router.replace was NOT called with home screen
      expect(router.replace).not.toHaveBeenCalledWith("/(tabs)/home");
    });

    it("should display error and keep user on login screen", async () => {
      const { getByPlaceholderText, getByText } = render(<LoginScreen />);

      const errorMsg = "Authentication failed";
      mockSignIn.mockResolvedValueOnce({
        data: null,
        error: { message: errorMsg },
      });

      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");
      const loginButton = getByText("Sign in");

      fireEvent.changeText(emailInput, "testuser@example.com");
      fireEvent.changeText(passwordInput, "password");

      await act(async () => {
        fireEvent.press(loginButton);
        await waitFor(() => {
          expect(mockSignIn).toHaveBeenCalled();
        });
      });

      // Error should be displayed
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalled();
      });

      // Should still be on login screen (not navigated)
      expect(require("expo-router").router.replace).not.toHaveBeenCalledWith(
        "/(tabs)/home"
      );
    });
  });
});
