import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const workoutdetails = () => {
  const router = useRouter();

  const workoutData = {
    image: "https://source.unsplash.com/random/400x300?fitness",
    duration: "30 minutes",
    intensity: "High",
    type: "Cycling",
  };

  const handleStartWorkout = async () => {
    // Simulate backend connection
    try {
      const response = await fetch("https://your-backend-api.com/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workout: workoutData }),
      });

      if (response.ok) {
        alert("Workout Started!");
      } else {
        alert("Failed to start workout.");
      }
    } catch (error) {
      alert("Error connecting to backend.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: workoutData.image }}
        className="w-full h-48 rounded-xl mb-4"
        resizeMode="cover"
      />
      <Text className="text-xl font-bold mb-2">Workout Type: {workoutData.type}</Text>
      <Text className="text-md mb-1">Duration: {workoutData.duration}</Text>
      <Text className="text-md mb-4">Intensity: {workoutData.intensity}</Text>

      <TouchableOpacity
        className="bg-green-600 p-4 rounded-xl mt-4"
        onPress={handleStartWorkout}
      >
        <Text className="text-white text-center font-bold text-lg">Start Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default workoutdetails;
