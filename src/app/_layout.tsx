import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();
  
  // Theme-aware header colors
  const headerTintColor = colorScheme === 'dark' ? 'white' : '#007AFF';
  
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
        <Stack
          screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: headerTintColor,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen
            name="(scheduleWorkout)"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(deleteAccountConfirmation)"
            options={{
              presentation: "transparentModal",
              headerShown: false,
              animation: "fade",
            }}
          />

          <Stack.Screen
            name="(settings)/editProfile"
            options={{
              headerShown: true,
              headerTitle: "Edit Profile",
              headerTintColor: headerTintColor,
            }}
          />

          <Stack.Screen
            name="(settings)/deleteAccount"
            options={{
              headerShown: true,
              headerTitle: "Delete Account",
              headerTintColor: headerTintColor,
            }}
          />

          <Stack.Screen
            name="(settings)/privacySettings"
            options={{
              headerShown: true,
              headerTitle: "Privacy",
              headerTintColor: headerTintColor,
            }}
          />

          <Stack.Screen
            name="(settings)/aboutUs"
            options={{
              headerShown: true,
              headerTitle: "About",
              headerTintColor: headerTintColor,
            }}
          />

          <Stack.Screen
            name="currentWorkout"
            options={{
              headerShown: true,
              headerTitle: "",
              headerTintColor: headerTintColor,
            }}
          />
        </Stack>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default _layout;
