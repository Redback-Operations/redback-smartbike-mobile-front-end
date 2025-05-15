import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const ScheduleConfirmation = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-center font-bold text-2xl">
        Your workout is scheduled!
      </Text>

      <Image
        className="w-48 my-16 h-48 self-center"
        source={require("@assets/calendar.jpg")}
      />

      <View className="flex-row p-4">
        <TouchableOpacity
          onPress={() => router.replace("/home")}
          className="flex-1"
        >
          <Text className="text-center text-gray-600 font-semibold p-4">
            Return Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-brand-purple rounded-xl">
          <Text className="text-center text-white font-semibold  p-4">
            Add To Your Calendar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleConfirmation;
