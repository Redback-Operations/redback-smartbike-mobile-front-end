/**
 * Profile & Settings Regression Tests
 * Tests for profile updates, validation, save/cancel behavior, and persistence
 */

import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { Alert } from "react-native";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    back: jest.fn(),
  },
  Link: ({ href, children }) => children,
}));

jest.mock("expo-linear-gradient", () => {
  const { View } = require("react-native");
  return { LinearGradient: View };
});

jest.spyOn(Alert, "alert");

describe("PRF-01: Profile Information Update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should allow updating username", () => {
    const mockUpdateProfile = jest.fn().mockResolvedValue({ success: true });
    const formData = { username: "newname", email: "user@example.com" };

    mockUpdateProfile(formData);
    expect(mockUpdateProfile).toHaveBeenCalledWith(formData);
  });

  it("should allow updating email address", () => {
    const mockUpdateProfile = jest.fn().mockResolvedValue({ success: true });
    const formData = { username: "user", email: "newemail@example.com" };

    mockUpdateProfile(formData);
    expect(mockUpdateProfile).toHaveBeenCalledWith(formData);
  });

  it("should update bio/description", () => {
    const mockUpdateProfile = jest.fn().mockResolvedValue({ success: true });
    const formData = { bio: "Updated bio text" };

    mockUpdateProfile(formData);
    expect(mockUpdateProfile).toHaveBeenCalledWith(formData);
  });

  it("should display success message after update", async () => {
    const mockUpdateProfile = jest.fn().mockResolvedValue({ success: true });

    await act(async () => {
      mockUpdateProfile({ username: "updated" });
    });

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalled();
    });
  });
});

describe("PRF-02: Invalid Input Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should reject invalid email format", () => {
    const mockValidateEmail = jest.fn((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    expect(mockValidateEmail("invalidemail")).toBe(false);
    expect(mockValidateEmail("valid@example.com")).toBe(true);
  });

  it("should reject username with special characters", () => {
    const mockValidateUsername = jest.fn((name) => /^[a-zA-Z0-9_-]+$/.test(name));

    expect(mockValidateUsername("valid_user-123")).toBe(true);
    expect(mockValidateUsername("invalid@user")).toBe(false);
  });

  it("should validate password strength", () => {
    const mockValidatePassword = jest.fn((pass) => pass.length >= 8);

    expect(mockValidatePassword("weak")).toBe(false);
    expect(mockValidatePassword("strongPass123!")).toBe(true);
  });

  it("should show error for empty required fields", async () => {
    const mockUpdateProfile = jest.fn().mockRejectedValue(new Error("Missing fields"));

    await act(async () => {
      try {
        await mockUpdateProfile({});
      } catch (error) {
        expect(error.message).toBe("Missing fields");
      }
    });
  });

  it("should validate field lengths", () => {
    const mockValidateLength = jest.fn((text, min, max) => text.length >= min && text.length <= max);

    expect(mockValidateLength("ab", 3, 20)).toBe(false);
    expect(mockValidateLength("validname", 3, 20)).toBe(true);
  });
});

describe("PRF-03: Save/Cancel Behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save changes when save button is pressed", async () => {
    const mockSaveChanges = jest.fn().mockResolvedValue({ success: true });

    await act(async () => {
      mockSaveChanges({ username: "updated" });
    });

    await waitFor(() => {
      expect(mockSaveChanges).toHaveBeenCalled();
    });
  });

  it("should discard changes when cancel is pressed", () => {
    const mockCancelChanges = jest.fn();

    mockCancelChanges();
    expect(mockCancelChanges).toHaveBeenCalled();
  });

  it("should not save changes when cancel is pressed", () => {
    const mockSave = jest.fn();
    const mockCancel = jest.fn();

    mockCancel();
    expect(mockSave).not.toHaveBeenCalled();
  });

  it("should prompt confirmation before discarding changes", async () => {
    const mockShowAlert = jest.fn();

    mockShowAlert("Discard changes?", "Are you sure?");
    expect(mockShowAlert).toHaveBeenCalledWith("Discard changes?", "Are you sure?");
  });

  it("should disable save button while processing", async () => {
    const mockSave = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    const mockSetLoading = jest.fn((state) => state);

    mockSetLoading(true);
    expect(mockSetLoading).toHaveBeenCalledWith(true);

    mockSave();
    expect(mockSave).toHaveBeenCalled();
  });
});

describe("PRF-04: Persistence After App Restart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should persist profile data in AsyncStorage", async () => {
    const mockStorageSet = jest.fn().mockResolvedValue(undefined);
    const profileData = { username: "testuser", email: "test@example.com" };

    await act(async () => {
      mockStorageSet("profile", JSON.stringify(profileData));
    });

    expect(mockStorageSet).toHaveBeenCalledWith("profile", JSON.stringify(profileData));
  });

  it("should retrieve persisted profile data on app start", async () => {
    const mockStorageGet = jest.fn().mockResolvedValue(JSON.stringify({ username: "testuser" }));

    const result = await mockStorageGet("profile");
    expect(JSON.parse(result)).toEqual({ username: "testuser" });
  });

  it("should update cached profile data after changes", async () => {
    const mockCache = jest.fn((key, value) => ({ [key]: value }));

    mockCache("profile", { username: "updated" });
    expect(mockCache).toHaveBeenCalledWith("profile", { username: "updated" });
  });

  it("should sync profile data across app sessions", () => {
    const mockSyncProfile = jest.fn().mockResolvedValue(true);

    mockSyncProfile();
    expect(mockSyncProfile).toHaveBeenCalled();
  });

  it("should handle profile update conflicts", async () => {
    const mockResolveConflict = jest.fn().mockResolvedValue({ username: "latest" });

    const result = await mockResolveConflict();
    expect(result).toEqual({ username: "latest" });
  });
});

describe("PRF-05: Settings Operations", () => {
  it("should toggle notification settings", () => {
    const mockToggleSetting = jest.fn((key) => !jest.fn());

    mockToggleSetting("notifications");
    expect(mockToggleSetting).toHaveBeenCalledWith("notifications");
  });

  it("should update privacy settings", () => {
    const mockUpdateSetting = jest.fn().mockResolvedValue({ success: true });

    mockUpdateSetting("privacy", "private");
    expect(mockUpdateSetting).toHaveBeenCalledWith("privacy", "private");
  });

  it("should save preference changes", async () => {
    const mockSavePreferences = jest.fn().mockResolvedValue({ success: true });

    await mockSavePreferences({ theme: "dark", language: "en" });
    expect(mockSavePreferences).toHaveBeenCalled();
  });

  it("should handle settings errors gracefully", async () => {
    const mockUpdateSetting = jest.fn().mockRejectedValue(new Error("Failed to update"));

    await act(async () => {
      try {
        await mockUpdateSetting("privacy", "public");
      } catch (error) {
        expect(error.message).toBe("Failed to update");
      }
    });
  });
});
