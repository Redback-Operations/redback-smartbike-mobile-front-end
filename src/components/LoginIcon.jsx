import { View, Image } from "react-native";
import React from "react";

const LoginIcon = ({ image }) => {
  return (
    <View className="rounded-full bg-white w-14 h-14 aspect-square  flex justify-center items-center">
      <Image
        className="max-w-[70%] max-h-[70%]"
        resizeMode="contain"
        source={image}
      />
    </View>
  );
};

export default LoginIcon;
