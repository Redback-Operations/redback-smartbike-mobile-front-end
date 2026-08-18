import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

const workoutItems = [
  {
    title: "VR Game",
    image: "🎮",
    bgColour: "#FF6B57",
    subtitle: "Interactive virtual ride sessions",
    focus: "Immersion",
  },
  {
    title: "Pilates",
    image: "🙆‍♀️",
    bgColour: "#7C4DFF",
    subtitle: "Core strength and flexibility",
    focus: "Control",
  },
  {
    title: "Cycling",
    image: "🚴‍♂️",
    bgColour: "#FF9500",
    subtitle: "Classic endurance and cardio",
    focus: "Endurance",
  },
  {
    title: "Dance",
    image: "💃",
    bgColour: "#FF5FA2",
    subtitle: "Fun movement-based sessions",
    focus: "Rhythm",
  },
  {
    title: "CrossFit",
    image: "🏋️‍♀️",
    bgColour: "#C96A2B",
    subtitle: "High effort functional training",
    focus: "Power",
  },
  {
    title: "Strength Training",
    image: "💪",
    bgColour: "#D64545",
    subtitle: "Build power and muscle",
    focus: "Strength",
  },
  {
    title: "Stretching",
    image: "🤸‍♂️",
    bgColour: "#1EB8A6",
    subtitle: "Recovery and mobility work",
    focus: "Recovery",
  },
  {
    title: "Running",
    image: "🏃‍♀️",
    bgColour: "#37C978",
    subtitle: "Boost stamina and pace",
    focus: "Speed",
  },
  {
    title: "Yoga",
    image: "🧘‍♀️",
    bgColour: "#2D8CFF",
    subtitle: "Balance, breathing and flow",
    focus: "Balance",
  },
  {
    title: "HIIT",
    image: "🏋",
    bgColour: "#8B5CF6",
    subtitle: "Fast and intense intervals",
    focus: "Intensity",
  },
];

const headlineStats = [
  { label: "Categories", value: String(workoutItems.length) },
  { label: "Recommended", value: "Cycling" },
  { label: "Focus", value: "Cardio" },
];

const featuredWorkout = workoutItems[2];

const WorkoutTile = ({ item }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="w-[48.5%] bg-[#101014] rounded-3xl p-4 border border-[#1c1c22] min-h-[196px] justify-between"
    >
      <View>
        <View
          className="w-14 h-14 rounded-2xl items-center justify-center mb-4"
          style={{ backgroundColor: item.bgColour }}
        >
          <Text className="text-2xl">{item.image}</Text>
        </View>

        <Text className="text-white text-lg font-semibold">{item.title}</Text>

        <Text className="text-[#A1A1AA] text-sm mt-2 leading-5">
          {item.subtitle}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mt-4">
        <View className="rounded-full bg-[#1A1B20] px-3 py-1">
          <Text className="text-[11px] font-semibold text-[#FCA5A5]">
            {item.focus}
          </Text>
        </View>

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

const HeaderStat = ({ item }) => {
  return (
    <View className="flex-1 bg-[#101014] rounded-2xl p-4 border border-[#1c1c22]">
      <Text className="text-[#8b8b95] text-xs">{item.label}</Text>
      <Text className="text-white text-lg font-bold mt-2">{item.value}</Text>
    </View>
  );
};

const Workouts = () => {
  return (
    <CustomSafeArea applyTopInset={false} bgColour="#050505">
      <FlatList
        data={workoutItems}
        keyExtractor={(item) => item.title}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 14,
        }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        ListHeaderComponent={
          <View className="pt-4 pb-5">
            <View className="flex-row justify-between items-start mb-5">
              <View className="flex-1 pr-4">
                <Text className="text-white text-[32px] font-bold">
                  Track your fitness
                </Text>
                <Text className="text-[#A1A1AA] text-sm mt-2 leading-5">
                  Explore workout styles, build consistency, and choose sessions
                  that match the rest of your training flow.
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push("/workoutSchedule")}
                className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#1f1f1f] items-center justify-center"
              >
                <FontAwesome6 name="calendar-plus" size={18} color="#EB7363" />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3 mb-4">
              {headlineStats.map((item) => (
                <HeaderStat key={item.label} item={item} />
              ))}
            </View>

            <View className="bg-[#101014] rounded-[28px] p-5 border border-[#1c1c22] mb-5">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-[#FCA5A5] text-xs font-semibold uppercase tracking-[1px]">
                    Featured Focus
                  </Text>
                  <Text className="text-white text-2xl font-bold mt-2">
                    {featuredWorkout.title}
                  </Text>
                  <Text className="text-[#A1A1AA] text-sm mt-2 leading-5">
                    {featuredWorkout.subtitle}. A strong default when you want a
                    session that fits the Redback training vibe.
                  </Text>
                </View>

                <View
                  className="w-16 h-16 rounded-[20px] items-center justify-center"
                  style={{ backgroundColor: featuredWorkout.bgColour }}
                >
                  <Text className="text-3xl">{featuredWorkout.image}</Text>
                </View>
              </View>

              <View className="flex-row gap-3 mt-5">
                <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
                  <Text className="text-[#8b8b95] text-xs">Best for</Text>
                  <Text className="text-white font-semibold mt-1">
                    {featuredWorkout.focus}
                  </Text>
                </View>
                <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
                  <Text className="text-[#8b8b95] text-xs">Energy</Text>
                  <Text className="text-white font-semibold mt-1">High</Text>
                </View>
                <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
                  <Text className="text-[#8b8b95] text-xs">Goal</Text>
                  <Text className="text-white font-semibold mt-1">Stamina</Text>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-white text-lg font-semibold">
                Workout Categories
              </Text>
              <Text className="text-[#A1A1AA] text-sm mt-1">
                Pick a training style and keep the same dark Redback theme
                across the app.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => <WorkoutTile item={item} />}
      />
    </CustomSafeArea>
  );
};

export default Workouts;
