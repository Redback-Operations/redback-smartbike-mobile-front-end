import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutCard from "@/components/WorkoutCard"; // Assuming you have this component
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";

const workoutItems = [
  {
    title: "VR Game",
    image: "🎮",
    bgColour: "#ff3b30",
    options: [
      { time: 30, level: "Basic VR Game" },
      { time: 60, level: "Intermediate VR Game" },
      { time: 90, level: "Advanced VR Game" },
    ],
  },
  {
    title: "Pilates",
    image: "🙆‍♀️",
    bgColour: "#5956d6",
    options: [
      { time: 30, level: "Basic Pilates" },
      { time: 60, level: "Intermediate Pilates" },
      { time: 90, level: "Advanced Pilates" },
    ],
  },
  {
    title: "Cycling",
    image: "🚴‍♂️",
    bgColour: "#ff9500",
    options: [
      { time: 30, level: "Basic Cycling" },
      { time: 60, level: "Intermediate Cycling" },
      { time: 90, level: "Advanced Cycling" },
    ],
  },
  {
    title: "Running",
    image: "🏃‍♀️",
    bgColour: "#4cd964",
    options: [
      { time: 30, level: "Basic Running" },
      { time: 60, level: "Intermediate Running" },
      { time: 90, level: "Advanced Running" },
    ],
  },
  {
    title: "Yoga",
    image: "🧘‍♀️",
    bgColour: "#007aff",
    options: [
      { time: 30, level: "Basic Yoga" },
      { time: 60, level: "Intermediate Yoga" },
      { time: 90, level: "Advanced Yoga" },
    ],
  },
  {
    title: "HIIT",
    image: "🏋",
    bgColour: "#a2b2ff",
    options: [
      { time: 30, level: "Basic HIIT" },
      { time: 60, level: "Intermediate HIIT" },
      { time: 90, level: "Advanced HIIT" },
    ],
  },
  {
    title: "Swimming",
    image: "🏊‍♂️",
    bgColour: "#7f5fff",
    options: [
      { time: 30, level: "Basic Swimming" },
      { time: 60, level: "Intermediate Swimming" },
      { time: 90, level: "Advanced Swimming" },
    ],
  },
  {
    title: "Zumba",
    image: "💃",
    bgColour: "#007aff",
    options: [
      { time: 30, level: "Basic Zumba" },
      { time: 60, level: "Intermediate Zumba" },
      { time: 90, level: "Advanced Zumba" },
    ],
  },
  {
    title: "Stretching",
    image: "🤸‍♂️",
    bgColour: "#b7a4ff",
    options: [
      { time: 30, level: "Basic Stretching" },
      { time: 60, level: "Intermediate Stretching" },
      { time: 90, level: "Advanced Stretching" },
    ],
  },
  {
    title: "Skateboarding",
    image: "🛹",
    bgColour: "#c3d9ff",
    options: [
      { time: 30, level: "Basic Skateboarding" },
      { time: 60, level: "Intermediate Skateboarding" },
      { time: 90, level: "Advanced Skateboarding" },
    ],
  },
];

const Workouts = () => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState("Basic");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center m-2">
        <Text className="text-brand-purple my-6 font-bold text-4xl">Track your fitness</Text>
        <TouchableOpacity onPress={() => router.push("/scheduleWorkout")}>
          <FontAwesome6 name="calendar-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Start Button at the top */}
      <View className="flex-row justify-center mb-4">
        <TouchableOpacity
          onPress={() => router.push("/startWorkout")} // This should navigate to the start workout page
          style={{
            backgroundColor: "#5956d6",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text className="text-white text-lg font-bold">Start Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Level Selection */}
      <View className="flex-row justify-around mb-6">
        {["Basic", "Intermediate", "Advanced"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setSelectedLevel(level)}
            style={{
              backgroundColor: selectedLevel === level ? "#5956d6" : "#f0f0f0",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text className="text-lg text-center">{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display Workout Cards */}
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={workoutItems}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/workoutDetail", // Navigate to workout detail page
                params: {
                  title: item.title,
                  emoji: item.image,
                  color: item.bgColour, // Send necessary params
                  options: item.options.filter(option => option.level.startsWith(selectedLevel)), // Filter based on selected level
                },
              })
            }
          >
            <WorkoutCard
              title={item.title}
              image={item.image}
              bgColor={item.bgColour}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Workouts;
