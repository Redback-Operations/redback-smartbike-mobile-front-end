import React, { useContext } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomSafeArea from "@/components/CustomSafeArea";
import { AuthContext } from "@/context/authContext";

const groups = [
  { title: "Training", items: [["Calendar & planner", "Manage your scheduled sessions", "calendar-month", "/calendar"], ["Coach preferences", "View personalised training guidance", "brain", "/coach"], ["Custom workouts", "Build and save your own ride", "playlist-edit", "/customWorkoutBuilder"]] },
  { title: "Account", items: [["My profile", "View your rider profile", "account-circle", "/myProfile"], ["Edit profile", "Update your personal details", "account-edit", "/editProfile"], ["Privacy", "Control what you share", "shield-account", "/privacySettings"]] },
  { title: "Support", items: [["Contact us", "Get help from the Redback team", "message-text-outline", "/contact"], ["About Redback", "Learn about the project", "information-outline", "/aboutUs"]] },
];

export default function Settings() {
  const { user, loading, signOut } = useContext(AuthContext);
  const handleLogout = () => Alert.alert("Log out?", "You can sign back in anytime.", [{ text: "Cancel", style: "cancel" }, { text: "Log out", style: "destructive", onPress: async () => { const { error } = await signOut(); if (error) Alert.alert("Logout failed", error.message); else router.replace("/"); } }]);
  if (loading) return <View className="flex-1 bg-[#050505] items-center justify-center"><ActivityIndicator size="large" color="#F27467" /></View>;

  return <CustomSafeArea applyTopInset={false} bgColour="#050505"><ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
    <View className="bg-[#111827] border border-[#202938] rounded-[28px] p-5 mb-6"><View className="flex-row items-center"><Image source={{ uri: user?.photo || "https://i.pravatar.cc/150?img=5" }} style={{ width: 62, height: 62, borderRadius: 31 }} /><View className="flex-1 ml-4"><Text className="text-[#F79A8F] text-xs font-semibold uppercase tracking-[1px]">Your account</Text><Text className="text-white text-2xl font-bold mt-1">{user?.username || "Rider"}</Text><Text className="text-[#B8C0CE] text-sm mt-1">Keep your Redback experience personal.</Text></View><TouchableOpacity onPress={() => router.push("/editProfile")} className="w-10 h-10 rounded-2xl bg-[#202938] items-center justify-center"><MaterialIcons name="edit" size={19} color="#F79A8F" /></TouchableOpacity></View><View className="flex-row gap-3 mt-5"><View className="flex-1 bg-[#0C1320] rounded-2xl p-3"><Text className="text-[#8E98A8] text-xs">Training tools</Text><Text className="text-white font-semibold mt-1">Calendar + Coach</Text></View><View className="flex-1 bg-[#0C1320] rounded-2xl p-3"><Text className="text-[#8E98A8] text-xs">Member status</Text><Text className="text-white font-semibold mt-1">Active rider</Text></View></View></View>
    <Text className="text-white text-3xl font-bold mb-1">Settings</Text><Text className="text-[#9297A3] text-sm mb-5">Personalise your profile, training tools, and app experience.</Text>
    {groups.map((group) => <View key={group.title} className="mb-5"><Text className="text-[#F79A8F] text-xs font-semibold uppercase tracking-[1px] mb-2">{group.title}</Text><View className="bg-[#111217] border border-[#1C1C22] rounded-[24px] overflow-hidden">{group.items.map(([title, subtitle, icon, link], index) => <TouchableOpacity key={title} onPress={() => router.push(link)} className={`flex-row items-center p-4 ${index ? "border-t border-[#1C1C22]" : ""}`}><View className="w-11 h-11 rounded-2xl bg-[#1D2432] items-center justify-center mr-3"><MaterialCommunityIcons name={icon} size={21} color="#F79A8F" /></View><View className="flex-1 pr-2"><Text className="text-white font-semibold">{title}</Text><Text className="text-[#9297A3] text-xs mt-1">{subtitle}</Text></View><MaterialIcons name="keyboard-arrow-right" size={22} color="#8E98A8" /></TouchableOpacity>)}</View></View>)}
    <TouchableOpacity onPress={handleLogout} className="border border-[#5B2C32] bg-[#271417] rounded-2xl py-4 flex-row justify-center items-center"><MaterialIcons name="logout" size={19} color="#FCA5A5" /><Text className="text-[#FCA5A5] font-semibold ml-2">Log out</Text></TouchableOpacity><Text className="text-[#626875] text-center text-xs mt-5">Redback SmartBike VR • Training made personal</Text>
  </ScrollView></CustomSafeArea>;
}
