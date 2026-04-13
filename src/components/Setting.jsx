import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { AuthContext } from "@/context/authContext";

const Setting = ({ settingTitle, icon, link, isLogOut }) => {
  const { signOut, setUser, setSession } = useContext(AuthContext);

  const handlePress = async () => {
    if (isLogOut) {
      try {
        if (signOut) {
          await signOut();
        } else {
          if (setUser) setUser(null);
          if (setSession) setSession(null);
        }

        router.replace("/");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Something went wrong while logging out.");
      }
      return;
    }

    router.push(link);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row gap-4 items-baseline my-2"
    >
      <View>{icon}</View>
      <Text className="font-semibold">{settingTitle}</Text>

      <MaterialIcons
        className="ml-auto"
        name="navigate-next"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default Setting;