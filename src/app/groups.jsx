import CustomSafeArea from "@/components/CustomSafeArea";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { router } from "expo-router";

const groups = [
  {
    title: "🏁 Fitness Squad",
    goal: "100 km this week",
    progress: "62km",
  },
  {
    title: "🚴‍♀️ Hill Climbers",
    goal: "200 mins ride",
    progress: "110 mins",
  },
];

const GroupsScreen = () => {
  return (
    <CustomSafeArea>
      <View className="p-4">
        <Text className="text-2xl font-bold">👥 Friends & Groups</Text>
        {/* Add Friend Button: opens the friend search screen */}
        <TouchableOpacity
          onPress={() => router.push("/friendslist")}
          accessibilityRole="button"
          accessibilityLabel="Add a friend"
          className="my-6 bg-brand-purple p-4 rounded-xl"
        >
          <Text className="text-white text-center font-semibold">
            + Add Friend
          </Text>
        </TouchableOpacity>
        <FlatList
          ItemSeparatorComponent={() => <View className="h-4" />}
          data={groups}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View className="bg-gray-100 p-4 rounded-xl">
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {item.title}
              </Text>
              <Text className="text-gray-600">{item.goal}</Text>
              <Text className="text-gray-600">{item.progress}</Text>
            </View>
          )}
        />
      </View>
    </CustomSafeArea>
  );
};

export default GroupsScreen;