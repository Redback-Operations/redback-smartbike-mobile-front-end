import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";
import FriendAvatar from "@/features/friends/components/FriendAvatar";
import FriendWeeklyBars from "@/features/friends/components/FriendWeeklyBars";
import {
  formatActivityDate,
  getFriendById,
  getWeeklyMinutes,
} from "@/features/friends/data";

export default function FriendDetails() {
  const { id } = useLocalSearchParams();
  const friend = getFriendById(id);

  if (!friend) {
    return (
      <CustomSafeArea bgColour="#050505">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold text-center text-white">
            Friend not found
          </Text>
          <Text className="text-center text-gray-500 mt-2">
            The selected friend could not be loaded.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 rounded-full bg-[#18181b] px-5 py-3"
          >
            <Text className="text-white font-semibold">Go back</Text>
          </TouchableOpacity>
        </View>
      </CustomSafeArea>
    );
  }

  const statCards = [
    { label: "Distance", value: friend.latestWorkout.distance },
    { label: "Duration", value: friend.latestWorkout.duration },
    { label: "Calories", value: friend.latestWorkout.calories },
    { label: "Avg speed", value: friend.latestWorkout.averageSpeed },
  ];

  return (
    <CustomSafeArea bgColour="#050505">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between pt-4 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-2xl bg-[#111113] border border-[#202024] items-center justify-center"
          >
            <AntDesign name="arrowleft" size={18} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-lg font-semibold">
            Friend Dashboard
          </Text>

          <View className="w-11" />
        </View>

        <View
          className="rounded-[28px] border border-[#1d1d22] bg-[#0d0d10] p-5"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.28,
            shadowRadius: 16,
            elevation: 6,
          }}
        >
          <View className="flex-row items-center">
            <FriendAvatar friend={friend} size={78} showRing />
            <View className="ml-4 flex-1">
              <Text className="text-white text-2xl font-bold">
                {friend.name}
              </Text>
              <Text className="text-[#9ca3af] mt-1">{friend.email}</Text>
              <View
                className="self-start mt-3 rounded-full px-3 py-2"
                style={{ backgroundColor: `${friend.accent}20` }}
              >
                <Text style={{ color: friend.accent }} className="font-semibold">
                  {friend.latestWorkout.intensity}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-5 rounded-[22px] bg-[#15151a] p-4 border border-[#222228]">
            <Text className="text-[#f4f4f5] text-lg font-semibold">
              {friend.latestWorkout.title}
            </Text>
            <Text className="text-[#a1a1aa] mt-2 leading-5">
              {friend.summary}
            </Text>
            <Text className="text-[#71717a] mt-3">
              {friend.latestWorkout.type} • {formatActivityDate(friend.latestWorkout.date)}
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-3 mt-5">
          {statCards.map((stat) => (
            <View
              key={stat.label}
              className="rounded-[22px] bg-[#101014] border border-[#1c1c22] p-4"
              style={{ width: "47%" }}
            >
              <Text className="text-[#8b8b95] text-xs mb-2">{stat.label}</Text>
              <Text className="text-white text-lg font-bold">{stat.value}</Text>
            </View>
          ))}
        </View>

        <View className="mt-5 rounded-[24px] bg-[#101014] border border-[#1c1c22] p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-xl font-bold">
                Weekly Activity
              </Text>
              <Text className="text-[#8b8b95] mt-1">
                {getWeeklyMinutes(friend)} total minutes this week
              </Text>
            </View>
            <View
              className="rounded-full px-3 py-2"
              style={{ backgroundColor: `${friend.accent}20` }}
            >
              <Text style={{ color: friend.accent }} className="font-semibold">
                Active
              </Text>
            </View>
          </View>

          <FriendWeeklyBars
            weeklyActivity={friend.weeklyActivity}
            accent={friend.accent}
          />
        </View>

        <View className="mt-5 rounded-[24px] bg-[#101014] border border-[#1c1c22] p-5">
          <Text className="text-white text-xl font-bold">Recent Activities</Text>
          <View className="mt-4 gap-3">
            {friend.recentActivities.map((activity) => (
              <View
                key={activity.id}
                className="rounded-[20px] bg-[#15151a] border border-[#202027] p-4"
              >
                <View className="flex-row items-start justify-between gap-4">
                  <View className="flex-1">
                    <Text className="text-white text-base font-semibold">
                      {activity.title}
                    </Text>
                    <Text className="text-[#a1a1aa] mt-1 leading-5">
                      {activity.subtitle}
                    </Text>
                  </View>
                  <Text className="text-[#71717a] text-xs">
                    {formatActivityDate(activity.date)}
                  </Text>
                </View>

                <View className="flex-row flex-wrap gap-2 mt-4">
                  <View className="rounded-full bg-[#1a1a20] px-3 py-2">
                    <Text className="text-white text-xs font-semibold">
                      {activity.distance}
                    </Text>
                  </View>
                  <View className="rounded-full bg-[#1a1a20] px-3 py-2">
                    <Text className="text-white text-xs font-semibold">
                      {activity.duration}
                    </Text>
                  </View>
                  <View className="rounded-full bg-[#1a1a20] px-3 py-2">
                    <Text className="text-white text-xs font-semibold">
                      {activity.calories}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 rounded-[24px] bg-[#101014] border border-[#1c1c22] p-5">
          <Text className="text-white text-xl font-bold">Engagement</Text>
          <View className="flex-row gap-3 mt-4">
            <View className="flex-1 rounded-[20px] bg-[#15151a] border border-[#202027] p-4">
              <Text className="text-[#8b8b95] text-xs mb-2">Likes</Text>
              <Text className="text-white text-2xl font-bold">
                {friend.engagement.likes}
              </Text>
            </View>
            <View className="flex-1 rounded-[20px] bg-[#15151a] border border-[#202027] p-4">
              <Text className="text-[#8b8b95] text-xs mb-2">Comments</Text>
              <Text className="text-white text-2xl font-bold">
                {friend.engagement.comments}
              </Text>
            </View>
          </View>
          <View className="mt-4 rounded-[20px] bg-[#15151a] border border-[#202027] p-4">
            <Text className="text-[#a1a1aa] leading-6">{friend.engagement.note}</Text>
          </View>
        </View>
      </ScrollView>
    </CustomSafeArea>
  );
}
