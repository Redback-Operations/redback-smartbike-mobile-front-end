import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const HomeScreenTile = ({ item }) => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const darkColors = ["#1C1C1E", "#212124"];
  const lightColors = ["#F8F9FA", "#E9ECEF"]; // Slightly gray-white
  
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  
  return (
    <TouchableOpacity
      onPress={() => {
        item.link && router.push(`${item.link}`);
      }}
      className=" flex-1 aspect-square rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={isDarkMode ? darkColors : lightColors}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <Text className={`font-bold text-center ${textColor}`}>
              {item.title}
            </Text>
            <MaterialIcons name="navigate-next" size={24} color={"#EB7363"} />
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
