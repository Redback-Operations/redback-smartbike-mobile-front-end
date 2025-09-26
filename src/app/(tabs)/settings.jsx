import { View, Text, FlatList, Alert } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "@/components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Setting from "@/components/Setting";
import { AuthContext } from "@/context/authContext";

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
    isDelete: true,
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

  // Handle confirmation
  const handleAction = (item) => {
    if (item.isLogOut) {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") },
        ]
      );
    } else if (item.isDelete) {
      Alert.alert(
        "Confirm Delete",
        "This action will permanently delete your account. Continue?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
        ]
      );
    } else {
      // Navigate normally
      console.log(`Navigate to ${item.link}`);
    }
  };

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
          renderItem={({ item }) => (
            <Setting
              isLogOut={!!item.isLogOut}
              settingTitle={item.title}
              link={item.link}
              icon={item.icon}
              onPress={() => handleAction(item)} //  Added confirmation
            />
          )}
        />
      </View>
    </View>
  );
};

export default settings;
