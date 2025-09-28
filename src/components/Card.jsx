import React from "react";
import { View } from "react-native";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const Card = ({ 
  children, 
  className = "", 
  padding = "medium", // small, medium, large, none
  shadow = true,
  rounded = true,
  ...props 
}) => {
  const { inlineStyles } = useThemeStyles();

  const getPaddingClasses = () => {
    switch (padding) {
      case "small":
        return "p-2";
      case "medium":
        return "p-4";
      case "large":
        return "p-6";
      case "none":
        return "";
      default:
        return "p-4";
    }
  };

  const getShadowClasses = () => {
    return shadow ? "shadow-sm" : "";
  };

  const getRoundedClasses = () => {
    return rounded ? "rounded-lg" : "";
  };

  return (
    <View
      style={inlineStyles.card}
      className={`
        ${getPaddingClasses()}
        ${getShadowClasses()}
        ${getRoundedClasses()}
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
