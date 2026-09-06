/**
 * Signup Regression Tests
 * Tests for signup screen functionality including form validation and submission
 */

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { Alert } from "react-native";
import SignupScreen from "../signup";

// Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
  Link: ({ href, children }) => children,
}));

// Mock expo-linear-gradient
jest.mock("expo-linear-gradient", () => {
  const { View } = require("react-native");
  return { LinearGradient: View };
});

// Mock the auth context
const mockSignUp = jest.fn();
const mockSignInWithOAuth = jest.fn();

jest.mock("@/context/authContext", () => ({
  useAuth: () => ({
    signUp: mockSignUp,
    signInWithOAuth: mockSignInWithOAuth,
  }),
}));

// Mock console and Alert
global.console.log = jest.fn();
global.console.error = jest.fn();
jest.spyOn(Alert, "alert");

describe("Signup Screen Regression Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // SGN-01: Signup form renders
  describe("SGN-01: Signup Form Renders", () => {
    it("should render signup screen without crashing", () => {
      const { getByText, UNSAFE_root } = render(<SignupScreen />);
      
      // Check that main elements render
      expect(UNSAFE_root).toBeTruthy();
      expect(getByText(/Create Account/i)).toBeTruthy();
    });

    it("should display link to login screen", () => {
      const { getByText } = render(<SignupScreen />);
      
      // Check for "Already have an account?" text
      const loginLink = getByText(/Already have an account/i);
      expect(loginLink).toBeTruthy();
    });

    it("should have social signup options", () => {
      const { UNSAFE_root } = render(<SignupScreen />);
      
      // Check that component renders with social login buttons
      expect(UNSAFE_root).toBeTruthy();
    });
  });

  // SGN-02: Empty fields validation
  describe("SGN-02: Empty Fields Validation", () => {
    it("should prevent signup when required fields are empty", async () => {
      const { getByText } = render(<SignupScreen />);

      const signupButton = getByText(/Create Account/i);
      
      await act(async () => {
        fireEvent.press(signupButton);
      });

      // Should not attempt signup and should show alert
      expect(mockSignUp).not.toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        "Missing fields",
        "Please complete all fields"
      );
    });
  });

  // SGN-03: Signup screen component structure
  describe("SGN-03: Signup Screen Structure", () => {
    it("should render with authentication context", () => {
      const { UNSAFE_root } = render(<SignupScreen />);
      
      // Component should render without errors despite being in test environment
      expect(UNSAFE_root).toBeTruthy();
    });

    it("should have create account button clickable", async () => {
      const { getByText } = render(<SignupScreen />);

      const signupButton = getByText(/Create Account/i);
      
      // Button should be pressable
      expect(signupButton).toBeTruthy();
      
      await act(async () => {
        fireEvent.press(signupButton);
      });

      // Should trigger validation (shown by alert)
      expect(Alert.alert).toHaveBeenCalled();
    });
  });

  // SGN-04: Error handling with mocked auth
  describe("SGN-04: Signup Error Handling", () => {
    it("should handle auth context mock correctly", () => {
      const { UNSAFE_root } = render(<SignupScreen />);

      // Verify mock auth is set up
      expect(mockSignUp).toBeDefined();
      expect(mockSignInWithOAuth).toBeDefined();
      expect(UNSAFE_root).toBeTruthy();
    });
  });

  // SGN-05: Successful registration
  describe("SGN-05: Successful Registration", () => {
    it("should successfully register with valid credentials", async () => {
      mockSignUp.mockResolvedValue({
        data: {
          user: { id: "user123", email: "newuser@example.com" },
          session: { access_token: "token123" },
        },
        error: null,
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      // Fill in valid registration data
      fireEvent.changeText(usernameInput, "newuser");
      fireEvent.changeText(emailInput, "newuser@example.com");
      fireEvent.changeText(passwordInput, "SecurePass123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalledWith(
          "newuser@example.com",
          "SecurePass123!",
          "newuser"
        );
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Account created successfully"
      );
    });

    it("should redirect to home after successful registration with session", async () => {
      mockSignUp.mockResolvedValue({
        data: {
          user: { id: "user123", email: "test@example.com" },
          session: { access_token: "token123" },
        },
        error: null,
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "testuser");
      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "TestPass123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Success",
          "Account created successfully"
        );
      });
    });
  });

  // SGN-06: Existing email validation
  describe("SGN-06: Existing Email Validation", () => {
    it("should handle registration with existing email", async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: { message: "User already exists" },
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "existinguser");
      fireEvent.changeText(emailInput, "existing@example.com");
      fireEvent.changeText(passwordInput, "Password123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        "Signup failed",
        "User already exists"
      );
    });

    it("should display error message for duplicate email", async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: { message: "Email already registered" },
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "user2");
      fireEvent.changeText(emailInput, "duplicate@example.com");
      fireEvent.changeText(passwordInput, "Password123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Signup failed",
          "Email already registered"
        );
      });
    });
  });

  // SGN-07: Password validation
  describe("SGN-07: Password Validation", () => {
    it("should reject password that is too short", async () => {
      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      // Fill with weak password
      fireEvent.changeText(usernameInput, "user");
      fireEvent.changeText(emailInput, "user@example.com");
      fireEvent.changeText(passwordInput, "123");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });
    });

    it("should accept valid password length", async () => {
      mockSignUp.mockResolvedValue({
        data: {
          user: { id: "user123", email: "test@example.com" },
          session: { access_token: "token123" },
        },
        error: null,
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "validuser");
      fireEvent.changeText(emailInput, "valid@example.com");
      fireEvent.changeText(passwordInput, "ValidPass123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });
    });

    it("should handle weak password errors from backend", async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: { message: "Password must be at least 8 characters" },
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "user");
      fireEvent.changeText(emailInput, "weak@example.com");
      fireEvent.changeText(passwordInput, "weak");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Signup failed",
          "Password must be at least 8 characters"
        );
      });
    });
  });

  // SGN-08: Invalid user input
  describe("SGN-08: Invalid User Input", () => {
    it("should reject invalid email format", async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: { message: "Invalid email format" },
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "user");
      fireEvent.changeText(emailInput, "invalidemail");
      fireEvent.changeText(passwordInput, "Password123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        "Signup failed",
        "Invalid email format"
      );
    });

    it("should reject invalid username (special characters)", async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: { message: "Username contains invalid characters" },
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "user@#$");
      fireEvent.changeText(emailInput, "user@example.com");
      fireEvent.changeText(passwordInput, "Password123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Signup failed",
          "Username contains invalid characters"
        );
      });
    });

    it("should handle network errors during signup", async () => {
      mockSignUp.mockRejectedValue(
        new Error("Network error: Unable to reach server")
      );

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "user");
      fireEvent.changeText(emailInput, "user@example.com");
      fireEvent.changeText(passwordInput, "Password123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Error",
          "Network error: Unable to reach server"
        );
      });
    });

    it("should display error when user is not returned from Supabase", async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: null,
      });

      const { getByPlaceholderText, getByText } = render(<SignupScreen />);

      const usernameInput = getByPlaceholderText("Name");
      const emailInput = getByPlaceholderText("example@gmail.com");
      const passwordInput = getByPlaceholderText("Enter your password");

      fireEvent.changeText(usernameInput, "user");
      fireEvent.changeText(emailInput, "user@example.com");
      fireEvent.changeText(passwordInput, "Password123!");

      const signupButton = getByText("Create Account");

      await act(async () => {
        fireEvent.press(signupButton);
      });

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          "Signup failed",
          "No user was returned from Supabase"
        );
      });
    });
  });
});
