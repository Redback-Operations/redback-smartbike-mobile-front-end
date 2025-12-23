import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useAuth } from "@/auth/AuthContext";

const Setting = ({ settingTitle, icon, link, isLogOut }) => {
  const { signOut } = useAuth();

  const handlePress = async () => {
    if (isLogOut) {
      try {
        await signOut();          // clears stored tokens + sets isAuthed false
        router.replace("/"); // send user back to login
        return;
      } catch (e) {
        console.log("Logout error:", e);
      }
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
