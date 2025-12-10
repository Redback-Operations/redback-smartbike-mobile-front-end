import { View, Text, FlatList, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "@/components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

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

  // 🔹 NEW: distance unit preference state
  const [distanceUnit, setDistanceUnit] = useState("km");

  return (
    <View className="flex-1 ">
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
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          // 🔹 NEW: header component for “Preferences” + units toggle
          ListHeaderComponent={
            <View className="mt-6 mb-2">
              <Text className="text-base font-semibold text-gray-500 mb-2">
                Preferences
              </Text>

              <View className="flex-row items-center justify-between py-2">
                <Text className="text-[15px] text-gray-900">
                  Distance units
                </Text>

                <View className="flex-row bg-gray-200 rounded-full p-1">
                  <Pressable
                    onPress={() => setDistanceUnit("km")}
                    className={`px-3 py-1 rounded-full ${distanceUnit === "km" ? "bg-black" : ""
                      }`}
                  >
                    <Text
                      className={`text-xs ${distanceUnit === "km"
                          ? "text-white font-semibold"
                          : "text-gray-600"
                        }`}
                    >
                      km
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setDistanceUnit("mi")}
                    className={`px-3 py-1 rounded-full ml-1 ${distanceUnit === "mi" ? "bg-black" : ""
                      }`}
                  >
                    <Text
                      className={`text-xs ${distanceUnit === "mi"
                          ? "text-white font-semibold"
                          : "text-gray-600"
                        }`}
                    >
                      mi
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          }
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
