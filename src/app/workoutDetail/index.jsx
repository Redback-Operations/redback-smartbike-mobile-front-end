import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router"; // Used to get params passed from workout screen
import { SafeAreaView } from "react-native-safe-area-context";

const durations = [30, 60, 90]; // Duration options for workout

const WorkoutDetail = () => {
  const { title, emoji, color } = useLocalSearchParams(); // Retrieve params

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-4xl font-bold text-brand-purple mb-4">
        {emoji} {title} {/* Display emoji and workout title */}
      </Text>

      <Text className="text-lg text-gray-700 mb-6">
        Choose a duration to begin your {title} workout:
      </Text>

      {/* Display duration options */}
      {durations.map((minutes) => (
        <TouchableOpacity
          key={minutes}
          className="mb-4 p-4 rounded-xl"
          style={{ backgroundColor: color || "#000" }} // Workout color as background
          onPress={() => alert(`Starting ${minutes}-minute ${title} workout!`)} // You can replace this with your workout logic
        >
          <Text className="text-white text-lg font-semibold text-center">
            Start {minutes}-minute {title}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default WorkoutDetail;
