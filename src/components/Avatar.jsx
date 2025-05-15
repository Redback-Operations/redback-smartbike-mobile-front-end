import { View, Image } from "react-native";
import React from "react";

const Avatar = ({ size, icon, iconBgColour }) => {
  return (
    <>
      <View className="relative self-center">
        <Image
          className="rounded-full "
          style={{ height: size, width: size }}
          source={require("@assets/avatar.jpg")}
        />
        {icon && (
          <View
            className={`${iconBgColour} w-6 h-6 rounded-full flex justify-center items-center  absolute right-2 bottom-2`}
          >
            <View className="">{icon}</View>
          </View>
        )}
      </View>
    </>
  );
};

export default Avatar;
