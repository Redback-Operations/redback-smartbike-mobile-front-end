import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@/context/ThemeContext";

const WorkoutCard = ({
  title,
  image,
  bgColor,
  handlePress,
  isSelected,
  setSelectedWorkout,
}) => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware text color
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  
  return (
    <TouchableOpacity
      id="title"
      onPress={handlePress}
      className="flex-1 transition-all  aspect-video rounded-xl overflow-hidden"
    >
      <LinearGradient
        colors={[bgColor, `${bgColor}60`]}
        start={[1, 0]} // Start from the left
        end={[0, 0]} // End on the right
        style={{
          flex: 1,
        }}
      >
        <View
          className={`flex-1 p-2  items-center ${
            isSelected ? "flex-col" : "flex-row"
          }`}
        >
          <View
            className={`flex-1 h-full ${
              isSelected ? "justify-center items-center  " : "justify-between"
            }`}
          >
            <Text
              style={{ lineHeight: 80 }}
              className={`${isSelected ? "text-7xl " : "text-3xl"}`}
            >
              {image}
            </Text>
            <Text
              className={`font-bold ${
                isSelected ? "text-2xl" : "text-lg"
              } -mt-2 ${textColor}`}
            >
              {title}
            </Text>
          </View>
          {isSelected ? (
            <Entypo
              onPress={() => setSelectedWorkout("")}
              name="cross"
              size={24}
              color={isDarkMode ? "white" : "#374151"}
              className="absolute top-4 right-4"
            />
          ) : (
            <MaterialIcons name="navigate-next" size={24} color={isDarkMode ? "white" : "#374151"} />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
