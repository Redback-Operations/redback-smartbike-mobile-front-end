import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { AuthContext } from "@/context/authContext";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const Setting = ({ settingTitle, icon, link, isLogOut }) => {
  const { setUser, user } = useContext(AuthContext);
  const { theme } = useThemeStyles();

  const handlePress = () => {
    if (isLogOut) {
      console.log("logged out");
      if (user) {
        setUser({});
      }
    }
    router.push(link);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row gap-4 items-baseline  my-2"
    >
      <View>{icon}</View>
      <Text style={{ color: theme.text }} className="font-semibold">{settingTitle}</Text>

      <MaterialIcons
        className="ml-auto"
        name="navigate-next"
        size={24}
        color={theme.text}
      />
    </TouchableOpacity>
  );
};

export default Setting;
