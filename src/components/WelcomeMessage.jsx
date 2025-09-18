import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const WelcomeMessage = ({ name }) => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const greetingColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const nameColor = isDarkMode ? "text-white" : "text-gray-800";
  
  return (
    <View>
      <Text className={greetingColor}>Good Morning, </Text>
      <Text className={`${nameColor} font-semibold text-lg`}>{name}</Text>
    </View>
  );
};

export default WelcomeMessage;
