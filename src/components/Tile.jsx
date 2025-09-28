import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const Tile = ({ 
  onPress,
  title,
  subtitle,
  icon,
  rightIcon,
  disabled = false,
  size = "medium", // small, medium, large
  className = "",
  contentClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  ...props 
}) => {
  const { inlineStyles } = useThemeStyles();

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "p-3";
      case "medium":
        return "p-4";
      case "large":
        return "p-6";
      default:
        return "p-4";
    }
  };

  const getTitleSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const getSubtitleSizeClasses = () => {
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

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      disabled={disabled}
      style={inlineStyles.card}
      className={`
        ${getSizeClasses()}
        rounded-lg
        border
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      <View className={`flex-row items-center ${contentClassName}`}>
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}
        
        <View className="flex-1">
          {title && (
            <Text
              style={inlineStyles.text}
              className={`
                font-semibold
                ${getTitleSizeClasses()}
                ${titleClassName}
              `}
            >
              {title}
            </Text>
          )}
          
          {subtitle && (
            <Text
              style={inlineStyles.textSecondary}
              className={`
                ${getSubtitleSizeClasses()}
                ${title ? "mt-1" : ""}
                ${subtitleClassName}
              `}
            >
              {subtitle}
            </Text>
          )}
        </View>
        
        {rightIcon && (
          <View className="ml-3">
            {rightIcon}
          </View>
        )}
      </View>
    </Component>
  );
};

export default Tile;
