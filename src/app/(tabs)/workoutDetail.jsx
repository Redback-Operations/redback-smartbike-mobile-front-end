import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const WorkoutDetail = ({ route }) => {
  const { title, emoji, color, options } = route.params; // Retrieve passed params
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: color, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>{emoji} {title}</Text>
      <Text style={{ fontSize: 18, color: "white", marginTop: 10 }}>Select your session:</Text>

      {/* List the workout options */}
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            // You can add logic to start the workout session here
            console.log(`Starting ${option.level} for ${option.time} minutes`);
          }}
          style={{
            backgroundColor: "#5956d6",
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {option.level} - {option.time} mins
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => router.push("/")} // Navigate back to workouts list
        style={{
          backgroundColor: "#ff3b30",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutDetail;
