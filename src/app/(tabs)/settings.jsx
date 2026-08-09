import { View, Text, Image, ActivityIndicator, ScrollView, Switch } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Setting from "@/components/Setting";
import { AuthContext } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";

const settingsItems = [
  {
    title: "My Profile",
    link: "/myProfile",
    icon: <AntDesign name="user" size={18} color="#ff7a6b" />,
  },
  {
    title: "Edit Profile",
    link: "/editProfile",
    icon: <AntDesign name="user" size={18} color="#ff7a6b" />,
  },
  {
    title: "Contact Us",
    link: "/contact",
    icon: <AntDesign name="mail" size={18} color="#ff7a6b" />,
  },
  {
    title: "My Workout History",
    link: "/workoutHistory",
    icon: <AntDesign name="barchart" size={18} color="#ff7a6b" />,
  },
  {
    title: "About Us",
    link: "/aboutUs",
    icon: <AntDesign name="infocirlceo" size={18} color="#ff7a6b" />,
  },
  {
    title: "Privacy Settings",
    link: "/privacySettings",
    icon: <AntDesign name="lock" size={18} color="#ff7a6b" />,
  },
  {
    title: "Delete Account",
    link: "/deleteAccount",
    icon: <AntDesign name="deleteuser" size={18} color="#ff7a6b" />,
  },
  {
    title: "Logout",
    link: "/",
    icon: <AntDesign name="logout" size={18} color="#ff7a6b" />,
    isLogOut: true,
  },
];

const Settings = () => {
  const { user, loading } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#ff7a6b" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <LinearGradient colors={["#8e4b74", "#4a2673", "#111111"]}>
        <SafeAreaView className="h-[240px] justify-center items-center px-6">
          <Image
            source={{
              uri: user?.photo || "https://i.pravatar.cc/150?img=5",
            }}
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
            }}
          />

          <View className="items-center mt-4">
            <Text className="font-bold text-2xl text-white">
              {user?.username || "Username"}
            </Text>

            <Text className="text-gray-400 text-xs mt-1">
              Account Settings
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        className="flex-1 -mt-6 rounded-t-[32px] bg-[#050505] px-4 pt-8"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[640px] self-center">
          <Text className="text-3xl font-bold text-center text-white mb-6">
            Settings
          </Text>

          <View className="bg-[#101010] rounded-2xl px-5 py-3 border border-[#1f1f1f] mb-4">
            <View className="flex-row items-center justify-between py-3 px-1">
              <View className="flex-row items-center">
                <View className="w-8 items-center">
                  <MaterialIcons name={isDark ? "dark-mode" : "light-mode"} size={20} color="#ff7a6b" />
                </View>
                <Text className="ml-2 text-base font-medium text-white">
                  Dark Mode
                </Text>
              </View>
              <Switch
                testID="settings-dark-mode-switch"
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#3a3a3a", true: "#ff7a6b" }}
                thumbColor="#ffffff"
              />
            </View>
          </View>

          <View className="bg-[#101010] rounded-2xl px-5 py-3 border border-[#1f1f1f]">
            {settingsItems.map((item, index) => (
              <View
                key={item.title}
                className={
                  index !== settingsItems.length - 1
                    ? "border-b border-[#222222]"
                    : ""
                }
              >
                <Setting
                  isLogOut={!!item.isLogOut}
                  settingTitle={item.title}
                  link={item.link}
                  icon={item.icon}
                />
              </View>
            ))}
          </View>

          <View className="h-12" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
