import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, router } from "expo-router";
import { AuthContext } from "@/context/authContext";

const Setting = ({ settingTitle, icon, link, isLogOut }) => {
  const { setUser, user } = useContext(AuthContext);
  const navigation = useNavigation();

  const handlePress = () => {
    if (isLogOut) {
      if (user) {
        setUser({});
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      });
    } else {
      router.push(link);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center py-4 px-1"
    >
      <View className="w-8 items-center">{icon}</View>

      <Text className="ml-2 text-base font-medium text-white">
        {settingTitle}
      </Text>

      <MaterialIcons
        className="ml-auto"
        name="navigate-next"
        size={22}
        color="#9ca3af"
      />
    </TouchableOpacity>
  );
};

export default Setting;