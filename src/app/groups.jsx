import CustomSafeArea from "@/components/CustomSafeArea";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Platform } from "react-native";
import { useTheme } from "@/context/ThemeContext";

import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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

const groupsScreen = () => {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const cardBgColor = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const secondaryTextColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  
  return (
    <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
      <View className={`p-4 flex-1 bg-${bgColor}`}>
        <Text className={`text-2xl font-bold ${textColor}`}>👥 Friends & Groups</Text>
        {/* Add Friend Button */}
        <TouchableOpacity className="my-6 bg-brand-purple p-4 rounded-xl">
          <Text className="text-white text-center font-semibold">
            + Add Friend
          </Text>
        </TouchableOpacity>
        <FlatList
          ItemSeparatorComponent={<View className="h-4" />}
          data={groups}
          renderItem={({ item }) => {
            return (
              <View className={`${cardBgColor} p-4 rounded-xl`}>
                <Text className={`text-lg font-medium ${textColor}`}>
                  {item.title}
                </Text>
                <Text className={secondaryTextColor}>{item.goal}</Text>
                <Text className={secondaryTextColor}>{item.progress}</Text>
              </View>
            );
          }}
        />
      </View>
    </CustomSafeArea>
  );
};

export default groupsScreen;
