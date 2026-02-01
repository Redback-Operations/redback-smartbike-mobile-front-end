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
      console.log("logged out");
      if (user) {
        setUser({});
      }
      //logging out so reset navigation
      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      });
    }
    else router.push(link);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row gap-4 items-baseline  my-2"
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
