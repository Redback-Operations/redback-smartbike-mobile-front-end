import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Friends = () => {
  const router = useRouter();

  const groups = [
    { title: "🏁 Fitness Squad", distance: "100 km this week", time: "62km" },
    { title: "🚴‍♀️ Hill Climbers", distance: "200 mins ride", time: "110 mins" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <Text className="text-lg font-bold mt-6 mb-4">👥 Friends & Groups</Text>

      <TouchableOpacity className="bg-purple-800 py-3 rounded-lg mb-6">
        <Text className="text-white text-center font-semibold">+ Add Friend</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {groups.map((group, idx) => (
          <View key={idx} className="bg-gray-100 p-4 rounded-lg mb-4">
            <Text className="font-semibold text-lg">{group.title}</Text>
            <Text className="text-gray-600">{group.distance}</Text>
            <Text className="text-gray-600">{group.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;
