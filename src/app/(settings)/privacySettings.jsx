import {
  View,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState("Friends Only");
  const [showAchievements, setShowAchievements] = useState(true);
  const [workoutVisible, setWorkoutVisible] = useState(true);
  const [shareLocation, setShareLocation] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomSafeArea>
        <View className="flex-1 bg-[#050505] px-5 pt-4">

          {/* 🔙 Back Button */}
          <TouchableOpacity
            onPress={() => router.replace("/settings")}
            className="mb-4"
          >
            <AntDesign name="arrowleft" size={22} color="white" />
          </TouchableOpacity>

          {/* 🧠 Title */}
          <Text className="text-white text-3xl font-bold text-center mb-6">
            Privacy Settings
          </Text>

          {/* 📦 MAIN BLOCK */}
          <View className="bg-[#0d0d0d] rounded-2xl border border-[#1f1f1f] p-4 gap-6">

            {/* Profile Visibility */}
            <View>
              <Text className="text-gray-400 text-sm mb-2">
                Profile Visibility
              </Text>

              <View className="bg-[#111111] border border-[#1f1f1f] rounded-xl px-4 py-3">
                <Text className="text-white">
                  {profileVisibility}
                </Text>
              </View>

              <Text className="text-gray-500 text-xs mt-2">
                Choose who can view your profile and stats
              </Text>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-[#1f1f1f]" />

            {/* Achievements */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white font-medium">
                  Display Achievements
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  Show achievements on your profile
                </Text>
              </View>

              <Switch
                value={showAchievements}
                onValueChange={setShowAchievements}
                thumbColor="#fff"
                trackColor={{ true: "#7c3aed", false: "#444" }}
              />
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-[#1f1f1f]" />

            {/* Workout Privacy */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white font-medium">
                  Workout Visibility
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  Visible to friends only
                </Text>
              </View>

              <Switch
                value={workoutVisible}
                onValueChange={setWorkoutVisible}
                thumbColor="#fff"
                trackColor={{ true: "#7c3aed", false: "#444" }}
              />
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-[#1f1f1f]" />

            {/* Location */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white font-medium">
                  Share Live Location
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  Allow real-time location sharing
                </Text>
              </View>

              <Switch
                value={shareLocation}
                onValueChange={setShareLocation}
                thumbColor="#fff"
                trackColor={{ true: "#7c3aed", false: "#444" }}
              />
            </View>

          </View>

          {/* 💾 Save Button */}
          <TouchableOpacity
            className="mt-6 bg-[#7c3aed] py-4 rounded-xl items-center"
            onPress={() => {
              console.log("Saved settings");
              router.replace("/settings");
            }}
          >
            <Text className="text-white font-semibold text-lg">
              Save Changes
            </Text>
          </TouchableOpacity>

        </View>
      </CustomSafeArea>
    </>
  );
};

export default PrivacySettings;