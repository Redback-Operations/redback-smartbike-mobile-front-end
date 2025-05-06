import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const WorkoutDetail = () => {
  const { click } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl font-bold text-brand-purple mb-4">
          {click}
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Welcome to your {click} workout! 🎉{"\n"}
          This is where you can display workout instructions, duration,
          benefits, or even videos.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutDetail;
