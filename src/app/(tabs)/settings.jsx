import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "@/components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Setting from "@/components/Setting";
import { useAuth } from "@/auth/AuthContext";
import { router } from "expo-router";

const settingsArray = [
  {
    title: "My Profile",
    link: "/myProfile",
    icon: <AntDesign name="user" size={18} color="black" />,
  },
  {
    title: "Edit Profile",
    link: "/editProfile",
    icon: <AntDesign name="user" size={18} color="black" />,
  },
  {
    title: "Contact Us",
    link: "/contact",
    icon: <AntDesign name="mail" size={18} color="black" />,
  },
  {
    title: "My Workout History",
    link: "/workouts",
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
  // {
  //   title: "Log Out",
  //   link: "/",
  //   icon: <AntDesign name="logout" size={18} color="red" />,
  //   isLogOut: true
  // },
];

const Settings = () => {
  const { isAuthed, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <View className="flex-1">
      <LinearGradient colors={["#994D74", "#3A1C72"]}>
        <SafeAreaView className="h-[350px] flex justify-center items-center">
          <Avatar size={100} />
          <Text className="font-bold text-lg text-white">
            {isAuthed ? "Signed in" : "Guest"}
          </Text>
        </SafeAreaView>
      </LinearGradient>

      <View className="h-full relative -top-14 rounded-[48px] bg-white py-8 px-6">
        <Text className="text-3xl font-bold text-center">Settings</Text>

        <FlatList
          data={settingsArray}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Setting
              isLogOut={false}
              settingTitle={item.title}
              link={item.link}
              icon={item.icon}
            />
          )}
        />

        {/* Logout button (handles token clear + redirect properly) */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-4 bg-gray-100 rounded-xl p-4 flex-row items-center justify-center"
        >
          <AntDesign name="logout" size={18} color="black" />
          <Text className="ml-2 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
