import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const WorkoutDetailCard = ({ workout }) => {
  if (!workout) return null;

  return (
    <View className="bg-gray-100 p-4 m-4 rounded-2xl shadow-md">
      <Text className="text-2xl font-semibold text-brand-purple mb-2">
        {workout.title}
      </Text>
      <Text className="text-gray-700 mb-1">{workout.description}</Text>
      <Text className="mt-1">🧠 Difficulty: {workout.difficulty}</Text>
      <Text>⏱️ Duration: {workout.duration}</Text>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-green-600 py-2 px-4 rounded-xl"
          onPress={() => alert("Starting workout...")}
        >
          <Text className="text-white font-medium">Start Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 py-2 px-4 rounded-xl"
          onPress={() => router.push("/workoutDetails")}
        >
          <Text className="text-white font-medium">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutDetailCard;
