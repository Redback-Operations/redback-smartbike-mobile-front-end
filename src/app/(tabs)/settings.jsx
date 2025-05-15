import { View, Text, FlatList } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "@/components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Setting from "@/components/Setting";
import { AuthContext } from "@/context/authContext";

const settingsArray = [
  {
    title: "Edit Profile",
    link: "/editProfile",
    icon: <AntDesign name="user" size={18} color="black" />,
  },

  {
    title: "My Profile",
    link: "/userdetails",
    icon: <AntDesign name="idcard" size={18} color="black" />,
  },  

  {
    title: "Contact Us",
    link: "/contact",
    icon: <AntDesign name="mail" size={18} color="black" />,
  },
  {
    title: "My Workout History",
    link: "/workoutHistory",
    icon: <AntDesign name="barchart" size={18} color="black" />,
  },
  {
    title: "Privacy Settings",
    link: "/privacySettings",
    icon: <AntDesign name="lock1" size={20} color="black" />,
  },
  {
    title: "About Us",
    link: "/aboutUs",
    icon: <AntDesign name="infocirlceo" size={18} color="black" />,
  },
  
  {
    title: "Delete Account",
    link: "/deleteAccount",
    icon: <AntDesign name="deleteuser" size={18} color="black" />,
  },
  {
    title: "Logout",
    link: "/",
    icon: <AntDesign name="logout" size={18} color="black" />,
    isLogOut: true,
  },
];

const settings = () => {
  const { user } = useContext(AuthContext);
  return (
    <View className="flex-1">
      <LinearGradient colors={["#994D74", "#3A1C72"]}>
        <SafeAreaView className="h-[350px] flex justify-center items-center">
          <Avatar size={100} />
          <Text className="font-bold text-lg text-white">
            {user.username ? user.username : "Username"}
          </Text>
        </SafeAreaView>
      </LinearGradient>

      <View className="h-full relative -top-14 rounded-[48px] bg-white py-8 px-6">
        <Text className="text-3xl font-bold text-center">Settings</Text>

        <FlatList
          data={settingsArray}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <Setting
              isLogOut={!!item.isLogOut}
              settingTitle={item.title}
              link={item.link}
              icon={item.icon}
            />
          )}
        />
      </View>
    </View>
  );
};

export default settings;
