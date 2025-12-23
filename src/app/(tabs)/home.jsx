import { View, FlatList, Text, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "@/components/Avatar";
import LastWeekActivity from "@/components/LastWeekActivity";
import WelcomeMessage from "@/components/WelcomeMessage";
import HomeScreenTile from "@/components/HomeScreenTile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomSafeArea from "@/components/CustomSafeArea";
import { useAuth } from "@/auth/AuthContext";
import { router } from "expo-router";

const homeTiles = [
  { title: "Connect", link: "" },
  {
    title: "Start workout",
    link: "",
    icon: <MaterialCommunityIcons name="bike" size={42} color="#EB7363" />,
  },
  {
    title: "Groups",
    link: "/groups",
    icon: <MaterialIcons name="groups" size={42} color="#Eb7363" />,
  },
  {
    title: "Schedule",
    link: "/workoutSchedule",
    icon: <AntDesign name="calendar" size={42} color="#EB7363" />,
  },
  {
    title: "Friends",
    link: "/friendslist",
    icon: <MaterialIcons name="group" size={42} color="#EB7363" />,
  },
  {
    title: "Current Workout",
    link: "/currentWorkout",
    icon: <FontAwesome5 name="running" size={42} color="green" />,
  },
];

const Home = () => {
  const { isAuthed, signOut } = useAuth();

  const handleHardLogout = async () => {
    console.log("[HOME] logout pressed");

    await signOut();

    console.log("[HOME] signOut finished, navigating to /");
    router.replace("/");
  };

  return (
    <CustomSafeArea applyTopInset={false} bgColour="black">
      <View className="px-4 flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center my-4">
          <WelcomeMessage name={isAuthed ? "User" : "Guest"} />
          <Avatar size={50} />
        </View>

        {/* HARD LOGOUT BUTTON */}
        <TouchableOpacity
          onPress={handleHardLogout}
          className="bg-red-600 px-4 py-2 rounded-full self-end mb-3"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>

        <LastWeekActivity />

        <FlatList
          nestedScrollEnabled
          columnWrapperClassName="gap-4"
          contentContainerClassName="gap-4"
          numColumns={2}
          data={homeTiles}
          renderItem={({ item }) => <HomeScreenTile item={item} />}
        />
      </View>
    </CustomSafeArea>
  );
};

export default Home;
