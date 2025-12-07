import { View, Text } from "react-native";
import React from "react";

const WelcomeMessage = ({ name }) => {
  return (
    <View>
      <Text className="text-gray-400">Good Morning, SHI</Text>
      <Text className="text-white font-semibold text-lg">{name}</Text>
    </View>
  );
};

export default WelcomeMessage;
