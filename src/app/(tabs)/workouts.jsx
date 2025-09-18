import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import WorkoutCard from "@/components/WorkoutCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";
import { useTheme } from "@/context/ThemeContext";

const workoutItems = [
  {
    title: "VR Game",
    image: "🎮",
    bgColour: "#ff3b30",
  },
  {
    title: "Pilates",
    image: "🙆‍♀️",
    bgColour: "#5956d6",
  },
  {
    title: "Cycling",
    image: "🚴‍♂️",
    bgColour: "#ff9500",
  },
  {
    title: "Running",
    image: "🏃‍♀️",
    bgColour: "#4cd964",
  },
  {
    title: "Yoga",
    image: "🧘‍♀️",
    bgColour: "#007aff",
  },
  {
    title: "HIIT",
    image: "🏋",
    bgColour: "#5956d6",
  },
];

const workouts = () => {
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";
  
  return (
    <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
      <View className={`flex-1 bg-${bgColor}`}>
        <View className="flex-row justify-between items-center px-4 py-6">
          <Text style={{ color: textColor }} className="text-brand-purple font-bold text-4xl flex-1">
            Track your fitness
          </Text>
          <TouchableOpacity 
            onPress={() => router.push("/scheduleWorkout")}
            className="ml-4"
          >
            <FontAwesome6 name="calendar-plus" size={24} color={textColor} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={workoutItems}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <WorkoutCard
              title={item.title}
              image={item.image}
              bgColor={item.bgColour}
            />
          )}
        />
      </View>
    </CustomSafeArea>
  );
};

export default workouts;
