import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import WorkoutCard from "@/components/WorkoutCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

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
  title: "Dance",
  image: "💃",
  bgColour: "#ff69b4",
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
  return (
    <CustomSafeArea applyTopInset={false} className="flex-1 bg-white">
      <View className="flex-row justify-between items-center m-2">
        <Text className="text-brand-purple my-6 font-bold text-4xl">
          Track your fitness
        </Text>
        <TouchableOpacity onPress={() => router.push("/scheduleWorkout")}>
          <FontAwesome6 name="calendar-plus" size={24} color="black" />
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
    </CustomSafeArea>
  );
};

export default workouts;
