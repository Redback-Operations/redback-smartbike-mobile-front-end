import { View, Text, SafeAreaView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import React from "react";

const scheduledWorkout = [
  {
    type: "",
    date: "",
  },
];

const workoutSchedule = () => {
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView
      style={{ padding: Platform.OS === "android" ? headerHeight : 0 }}
    >
      <Text className="text-xl text-center font-bold">
        Your Scheduled Workouts
      </Text>
    </SafeAreaView>
  );
};

export default workoutSchedule;
