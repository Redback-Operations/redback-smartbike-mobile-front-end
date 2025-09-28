import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ThemeToggle = ({ 
  showLabel = true, 
  showIcon = true, 
  className = "",
  labelClassName = "",
  iconClassName = "" 
}) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      {showLabel && (
        <View className="flex-row items-center flex-1">
          {showIcon && (
            <MaterialIcons
              name={isDarkMode ? "dark-mode" : "light-mode"}
              size={20}
              color={theme.primary}
              className={`mr-2 ${iconClassName}`}
            />
          )}
          <Text 
            className={`text-sm font-medium ${labelClassName}`}
            style={{ color: theme.text }}
          >
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>
      )}
      
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ 
          false: theme.border, 
          true: theme.primary 
        }}
        thumbColor={isDarkMode ? theme.surface : theme.background}
        ios_backgroundColor={theme.border}
      />
    </View>
  );
};

export default ThemeToggle;
