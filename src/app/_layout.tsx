import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            headerTintColor: "black",
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
              headerTintColor: "black",
            }}
          />

          <Stack.Screen
            name="(settings)/deleteAccount"
            options={{
              headerShown: true,
              headerTitle: "Delete Account",
              headerTintColor: "black",
            }}
          />

          <Stack.Screen
            name="(settings)/privacySettings"
            options={{
              headerShown: true,
              headerTitle: "Privacy",
              headerTintColor: "black",
            }}
          />

          <Stack.Screen
            name="(settings)/aboutUs"
            options={{
              headerShown: true,
              headerTitle: "About",
              headerTintColor: "black",
            }}
          />
        </Stack>
      </AuthProvider>
    </>
  );
};

export default _layout;
