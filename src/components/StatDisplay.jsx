import { View, Text } from "react-native";
import React from "react";

const StatDisplay = ({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
  size = "medium",
  className = "",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 border-green-300";
      case "warning":
        return "bg-yellow-100 border-yellow-300";
      case "danger":
        return "bg-red-100 border-red-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

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

  return (
    <View
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        border
        rounded-xl
        ${className}
      `}
      {...props}
    >
      {icon && (
        <View className="mb-2">
          {icon}
        </View>
      )}
      
      {title && (
        <Text className="text-gray-600 font-medium text-sm mb-1">
          {title}
        </Text>
      )}
      
      <Text className="text-gray-900 font-bold text-2xl">
        {value}
      </Text>
      
      {subtitle && (
        <Text className="text-gray-500 font-normal text-sm">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default StatDisplay;
