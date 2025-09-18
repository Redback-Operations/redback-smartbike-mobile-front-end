import { TouchableOpacity, Text } from "react-native";
import React from "react";

const Button = ({
  children,
  onPress,
  variant = "primary", // primary, secondary, outline, danger
  size = "medium", // small, medium, large
  className = "",
  textClassName = "",
  disabled = false,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-brand-purple";
      case "secondary":
        return "bg-brand-navy";
      case "outline":
        return "bg-transparent border border-brand-purple";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-brand-purple";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "medium":
        return "px-6 py-4";
      case "large":
        return "px-8 py-6";
      default:
        return "px-6 py-4";
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-lg";
      case "large":
        return "text-xl";
      default:
        return "text-lg";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        rounded-full
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      <Text
        className={`
          text-white
          text-center
          font-semibold
          ${getTextSizeClasses()}
          ${textClassName}
        `}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
