import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const StartWorkout = () => {
  return (
    <LinearGradient
      colors={["#1C1C1E", "#212124"]}
      start={[0, 0]}
      end={[1, 0]}
      style={{ borderRadius: 24 }}
    >
      <View className="p-4 aspect-square ">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-brand-orange font-semibold">Start workout</Text>
          <MaterialIcons name="navigate-next" size={24} color={"#EB7363"} />
        </View>
        <MaterialCommunityIcons name="bike" size={24} color="black" />
      </View>
    </LinearGradient>
  );
};

export default StartWorkout;
