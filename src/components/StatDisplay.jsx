import React from "react";
import { View, Text } from "react-native";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const StatDisplay = ({ 
  value, 
  label, 
  unit = "", 
  icon = null,
  size = "medium", // small, medium, large
  orientation = "vertical", // vertical, horizontal
  className = "",
  valueClassName = "",
  labelClassName = "",
  ...props 
}) => {
  const { inlineStyles } = useThemeStyles();

  const getValueSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-lg";
      case "medium":
        return "text-2xl";
      case "large":
        return "text-4xl";
      default:
        return "text-2xl";
    }
  };

  const getLabelSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "medium":
        return "text-sm";
      case "large":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  const isHorizontal = orientation === "horizontal";

  return (
    <View
      className={`
        ${isHorizontal ? "flex-row items-center" : "items-center"}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <View className={isHorizontal ? "mr-3" : "mb-2"}>
          {icon}
        </View>
      )}
      
      <View className={isHorizontal ? "flex-1" : "items-center"}>
        <Text
          style={inlineStyles.text}
          className={`
            font-bold
            ${getValueSizeClasses()}
            ${valueClassName}
          `}
        >
          {value}{unit && <Text className="text-sm">{unit}</Text>}
        </Text>
        
        <Text
          style={inlineStyles.textSecondary}
          className={`
            font-medium
            ${getLabelSizeClasses()}
            ${isHorizontal ? "" : "text-center"}
            ${labelClassName}
          `}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export default StatDisplay;
