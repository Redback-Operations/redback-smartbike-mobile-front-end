import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const deleteAccountConfirmationLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    />
  );
};

export default deleteAccountConfirmationLayout;
