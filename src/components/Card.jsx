import { View } from "react-native";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const Card = ({
  children,
  className = "",
  bgColor = "",
  padding = "p-4",
  rounded = "rounded-xl",
  shadow = "",
  useThemeColors = true,
  ...props
}) => {
  const { themeClasses } = useTheme();
  
  // Use theme colors if enabled, otherwise use custom bgColor
  const backgroundColor = useThemeColors ? themeClasses.card : bgColor;
  
  return (
    <View
      className={`${backgroundColor} ${padding} ${rounded} ${shadow} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
