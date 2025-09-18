import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "@/components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

import Setting from "@/components/Setting";
import ThemeToggle from "@/components/ThemeToggle";
import { AuthContext } from "@/context/authContext";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const settings = () => {
  const { user } = useContext(AuthContext);
  const { themeClasses, inlineStyles } = useThemeStyles();
  
  // Create theme-aware settings array
  const settingsArray = [
    {
      title: "My Profile",
      link: "/myProfile",
      icon: <AntDesign name="user" size={18} color={inlineStyles.text.color} />,
    },
    {
      title: "Edit Profile",
      link: "/editProfile",
      icon: <AntDesign name="user" size={18} color={inlineStyles.text.color} />,
    },
    {
      title: "Contact Us",
      link: "/contact",
      icon: <AntDesign name="mail" size={18} color={inlineStyles.text.color} />,
    },
    {
      title: "My Workout History",
      link: "/workoutHistory",
      icon: <AntDesign name="barchart" size={18} color={inlineStyles.text.color} />,
    },
    {
      title: "Privacy Settings",
      link: "/privacySettings",
      icon: <AntDesign name="lock1" size={20} color={inlineStyles.text.color} />,
    },
    {
      title: "About Us",
      link: "/aboutUs",
      icon: <AntDesign name="infocirlceo" size={18} color={inlineStyles.text.color} />,
    },
    {
      title: "Delete Account",
      link: "/deleteAccount",
      icon: <AntDesign name="deleteuser" size={18} color={inlineStyles.text.color} />,
    },
    {
      title: "Logout",
      link: "/",
      icon: <AntDesign name="logout" size={18} color={inlineStyles.text.color} />,
      isLogOut: true,
    },
  ];
  
  return (
    <View style={inlineStyles.background} className="flex-1">
      <LinearGradient colors={["#994D74", "#3A1C72"]}>
        <SafeAreaView className="h-[350px] flex justify-center items-center">
          <Avatar size={100} />
          <Text className="font-bold text-lg text-white">
            {user.username ? user.username : "Username"}
          </Text>
        </SafeAreaView>
      </LinearGradient>
      
      <View style={inlineStyles.card} className="flex-1 relative -top-14 rounded-[48px] py-8 px-6">
        <Text style={inlineStyles.text} className="text-3xl font-bold text-center mb-6">Settings</Text>

        {/* Theme Toggle Section */}
        <View style={inlineStyles.surface} className="mb-4 p-3 rounded-lg">
          <Text style={inlineStyles.text} className="text-base font-medium mb-2">Appearance</Text>
          <ThemeToggle />
        </View>

        <FlatList
          data={settingsArray}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 20 }}
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
