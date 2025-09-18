import { View, Text, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomSafeArea from "@/components/CustomSafeArea";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const scheduledWorkout = [
  {
    type: "",
    date: "",
  },
];

const workoutSchedule = () => {
  const headerHeight = useHeaderHeight();
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  
  return (
    <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
      <View className={`flex-1 bg-${bgColor}`}>
        <Text className={`text-xl text-center font-bold ${textColor}`}>
          Your Scheduled Workouts
        </Text>
      </View>
    </CustomSafeArea>
  );
};

export default workoutSchedule;
