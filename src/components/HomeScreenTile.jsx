import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const HomeScreenTile = ({ item }) => {
  const { theme, isDarkMode } = useThemeStyles();
  
  // Use theme-aware gradient colors
  const gradientColors = isDarkMode 
    ? [theme.surface, theme.card] 
    : [theme.surface, theme.card];
  
  return (
    <TouchableOpacity
      onPress={() => {
        item.link && router.push(`${item.link}`);
      }}
      style={{
        borderColor: theme.border,
        borderWidth: 1,
      }}
      className="flex-1 aspect-square rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={gradientColors}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <Text 
              style={{ color: theme.text }} 
              className="font-bold text-center"
            >
              {item.title}
            </Text>
            <MaterialIcons name="navigate-next" size={24} color={theme.accent} />
          </View>
          <View className="flex-1 items-center justify-center">
            {item.icon}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HomeScreenTile;
