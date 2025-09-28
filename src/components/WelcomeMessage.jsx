import { View, Text } from "react-native";
import React from "react";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const WelcomeMessage = ({ name }) => {
  const { theme } = useThemeStyles();
  
  return (
    <View>
      <Text style={{ color: theme.textSecondary }}>Good Morning, </Text>
      <Text style={{ color: theme.text }} className="font-semibold text-lg">{name}</Text>
    </View>
  );
};

export default WelcomeMessage;
