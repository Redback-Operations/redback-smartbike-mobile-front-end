import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Tile = ({
  children,
  onPress,
  title,
  icon,
  variant = "default",
  size = "medium",
  className = "",
  gradientColors = ["#1C1C1E", "#212124"],
  ...props
}) => {
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
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 aspect-square rounded-xl overflow-hidden ${className}`}
      {...props}
    >
      <LinearGradient
        colors={gradientColors}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1 }}
      >
        <View className={`flex-1 ${getSizeClasses()}`}>
          {title && (
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-white font-bold text-center">
                {title}
              </Text>
              {icon && (
                <View>
                  {icon}
                </View>
              )}
            </View>
          )}
          
          <View className="flex-1 items-center justify-center">
            {children}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Tile;
