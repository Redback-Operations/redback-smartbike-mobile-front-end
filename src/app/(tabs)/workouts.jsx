import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

const workoutItems = [
  {
    title: "VR Game",
    image: "🎮",
    bgColour: "#FF6B57",
    subtitle: "Interactive virtual ride sessions",
  },
  {
    title: "Pilates",
    image: "🙆‍♀️",
    bgColour: "#7C4DFF",
    subtitle: "Core strength and flexibility",
  },
  {
    title: "Cycling",
    image: "🚴‍♂️",
    bgColour: "#FF9500",
    subtitle: "Classic endurance and cardio",
  },
  {
    title: "Dance",
    image: "💃",
    bgColour: "#FF5FA2",
    subtitle: "Fun movement-based sessions",
  },
  {
    title: "CrossFit",
    image: "🏋️‍♀️",
    bgColour: "#C96A2B",
    subtitle: "High effort functional training",
  },
  {
    title: "Strength Training",
    image: "💪",
    bgColour: "#D64545",
    subtitle: "Build power and muscle",
  },
  {
    title: "Stretching",
    image: "🤸‍♂️",
    bgColour: "#1EB8A6",
    subtitle: "Recovery and mobility work",
  },
  {
    title: "Running",
    image: "🏃‍♀️",
    bgColour: "#37C978",
    subtitle: "Boost stamina and pace",
  },
  {
    title: "Yoga",
    image: "🧘‍♀️",
    bgColour: "#2D8CFF",
    subtitle: "Balance, breathing and flow",
  },
  {
    title: "HIIT",
    image: "🏋",
    bgColour: "#8B5CF6",
    subtitle: "Fast and intense intervals",
  },
];

const WorkoutTile = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="w-[48.5%] bg-[#141A26] rounded-3xl p-4 border border-[#1F2937]"
    >
      <View
        className="w-14 h-14 rounded-2xl items-center justify-center mb-4"
        style={{ backgroundColor: item.bgColour }}
      >
        <Text className="text-2xl">{item.image}</Text>
      </View>

      <Text className="text-white text-lg font-semibold">{item.title}</Text>

      <Text className="text-[#9CA3AF] text-sm mt-1 leading-5">
        {item.subtitle}
      </Text>

      <View className="flex-row justify-end mt-4">
        <View className="w-8 h-8 rounded-full bg-[#1D2432] items-center justify-center">
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={item.bgColour}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Workouts = () => {
  return (
    <CustomSafeArea applyTopInset={false} bgColour="#0B0F1A">
      <View className="flex-1 px-4 pt-4">
        <View className="bg-[#141A26] rounded-[28px] p-5 mb-5 border border-[#1F2937]">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-4">
              <Text className="text-white text-3xl font-bold">
                Track your fitness
              </Text>
              <Text className="text-[#AAB2C0] text-sm mt-2 leading-5">
                Explore workout styles, track your activity and choose a fitness
                category that matches your goals.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/workoutSchedule")}
              className="w-12 h-12 rounded-2xl bg-[#FF7A59] items-center justify-center"
            >
              <FontAwesome6 name="calendar-plus" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3 mt-5">
            <View className="flex-1 bg-[#1D2432] rounded-2xl p-3">
              <Text className="text-[#9CA3AF] text-xs">Categories</Text>
              <Text className="text-white text-xl font-bold mt-1">
                {workoutItems.length}
              </Text>
            </View>

            <View className="flex-1 bg-[#1D2432] rounded-2xl p-3">
              <Text className="text-[#9CA3AF] text-xs">Recommended</Text>
              <Text className="text-white text-base font-bold mt-1">
                Cycling
              </Text>
            </View>

            <View className="flex-1 bg-[#1D2432] rounded-2xl p-3">
              <Text className="text-[#9CA3AF] text-xs">Focus</Text>
              <Text className="text-white text-base font-bold mt-1">
                Cardio
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-3">
          <Text className="text-white text-lg font-semibold">
            Workout Categories
          </Text>
          <Text className="text-[#9CA3AF] text-sm mt-1">
            Select a category to explore your training options
          </Text>
        </View>

        <FlatList
          data={workoutItems}
          keyExtractor={(item) => item.title}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 14 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => <WorkoutTile item={item} />}
        />
      </View>
    </CustomSafeArea>
  );
};

export default Workouts;