import { View, Text } from "react-native";
import React from "react";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const CustomSafeArea = ({
  children,
  bgColour,
  applyTopInset = true,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeStyles();
  const topPadding =
    Platform.OS === "android" && applyTopInset ? insets.top : 0;
  
  // Use theme background if no bgColour is provided
  const backgroundColor = bgColour || theme.background;
  
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ paddingTop: topPadding, backgroundColor }}
        className={`flex-1 `}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CustomSafeArea;
