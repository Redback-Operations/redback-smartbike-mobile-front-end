import React from "react";
import { Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomSafeArea from "@/components/CustomSafeArea";

const metricItems = [
  { label: "Speed", value: "22 km/h" },
  { label: "RPM", value: "90" },
  { label: "Distance", value: "4.3 km" },
  { label: "Incline", value: "5%" },
  { label: "Heart Rate", value: "132 bpm" },
  { label: "Temperature", value: "26 °C" },
];

export default function CurrentWorkout() {
  const params = useLocalSearchParams();
  const title =
    typeof params.title === "string" && params.title.trim()
      ? params.title
      : "Workout Session";
  const mode =
    typeof params.mode === "string" && params.mode.trim()
      ? params.mode
      : "Live Session";
  const duration =
    typeof params.duration === "string" && params.duration.trim()
      ? params.duration
      : "30 min";
  const goal =
    typeof params.goal === "string" && params.goal.trim()
      ? params.goal
      : "Endurance";
  const blockCount =
    typeof params.blockCount === "string" && params.blockCount.trim()
      ? params.blockCount
      : "4";

  return (
    <CustomSafeArea bgColour="black">
      <View className="px-4 pt-4">
        <Text className="text-4xl text-white font-bold">{title}</Text>
        <Text className="text-[#A1A1AA] text-sm mt-2">
          {mode} • {duration} • {goal}
        </Text>
      </View>

      <View className="mx-4 mt-4 bg-[#101014] rounded-[28px] border border-[#1c1c22] p-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg font-semibold">
              Session Overview
            </Text>
            <Text className="text-[#8b8b95] text-sm mt-1">
              Workout is ready and tracking live ride metrics
            </Text>
          </View>

          <View className="w-12 h-12 rounded-2xl bg-[#EB7363] items-center justify-center">
            <MaterialCommunityIcons
              name="bike-fast"
              size={22}
              color="#050505"
            />
          </View>
        </View>

        <View className="flex-row gap-3 mt-4">
          <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
            <Text className="text-[#8b8b95] text-xs">Workout Type</Text>
            <Text className="text-white font-semibold mt-1">{mode}</Text>
          </View>
          <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
            <Text className="text-[#8b8b95] text-xs">Blocks</Text>
            <Text className="text-white font-semibold mt-1">{blockCount}</Text>
          </View>
          <View className="flex-1 bg-[#18191F] rounded-2xl p-3">
            <Text className="text-[#8b8b95] text-xs">Goal</Text>
            <Text className="text-white font-semibold mt-1">{goal}</Text>
          </View>
        </View>
      </View>

      <View className="h-52 p-4">
        <WebView
          source={{ uri: "https://www.youtube.com/embed/L_xrDAtykMI" }}
          className="flex-1 rounded-[24px] overflow-hidden"
          allowsFullscreenVideo
        />
      </View>

      <View className="px-4 pb-4">
        <Text className="text-white text-lg font-semibold mb-3">
          Live Metrics
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {metricItems.map((item) => (
            <View
              key={item.label}
              className="w-[48.5%] bg-[#101014] rounded-3xl border border-[#1c1c22] p-4 mb-3"
            >
              <Text className="text-[#8b8b95] text-xs">{item.label}</Text>
              <Text className="text-white text-lg font-semibold mt-2">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </CustomSafeArea>
  );
}
