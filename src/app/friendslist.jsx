import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";
import { router } from "expo-router";
import FriendAvatar from "@/features/friends/components/FriendAvatar";
import { friends } from "@/features/friends/data";

const FriendsList = () => {
  return (
    <CustomSafeArea bgColour="#050505">
      <View className="flex-1 px-5 pt-4 bg-[#050505]">
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-white text-3xl font-bold">All Friends</Text>
            <Text className="text-[#9ca3af] mt-1">
              Browse the full friend directory
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-2xl bg-[#111113] border border-[#202024] items-center justify-center"
          >
            <AntDesign name="arrowleft" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                router.push(`/friendsdetails/${item.id}`);
              }}
              className="flex-1 rounded-[24px] bg-[#101014] border border-[#1c1c22] items-center py-5 px-3"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 14,
                elevation: 4,
              }}
            >
              <FriendAvatar friend={item} size={72} showRing />
              <Text className="text-white text-base font-semibold text-center mt-3">
                {item.name}
              </Text>
              <Text className="text-[#8b8b95] text-xs text-center mt-1">
                {item.latestWorkout.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </CustomSafeArea>
  );
};

export default FriendsList;
