
import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function TodayRideSummaryCard({
  distanceKm = 3.2,
  durationMin = 17,
  avgSpeedKmh = 11.3,
  caloriesKcal = 220,
  terrain = "Forest Trail",
  goalKm = 5.0,
}) {
  const progress = Math.min(distanceKm / goalKm, 1); // 0–1
  const percentage = Math.round(progress * 100);
  const remainingKm = Math.max(goalKm - distanceKm, 0).toFixed(1);

  return (
    <LinearGradient
      colors={["#F97373", "#A855F7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full rounded-3xl px-5 py-4 flex-row justify-between items-center"
    >
      {/* LEFT SIDE */}
      <View className="flex-1 mr-3">
        <Text className="text-xs text-white/80 uppercase tracking-wide">
          Today&apos;s Ride Summary
        </Text>

        <Text className="text-3xl text-white font-semibold mt-1">
          {distanceKm.toFixed(1)}{" "}
          <Text className="text-sm font-normal">km</Text>
        </Text>

        <Text className="text-sm text-white/90 mt-1">
          {durationMin} min • {avgSpeedKmh.toFixed(1)} km/h • {caloriesKcal} kcal
        </Text>

        <Text className="text-xs text-white/80 mt-1">
          VR Terrain: <Text className="font-semibold text-white">{terrain}</Text>
        </Text>

        <Text className="text-xs text-white/80 mt-1">
          Goal: {goalKm.toFixed(1)} km
        </Text>

        <View className="mt-2">
          {percentage >= 100 ? (
            <Text className="text-xs text-white">✅ Daily ride goal reached!</Text>
          ) : (
            <Text className="text-xs text-white">
              🔥 Keep going!{" "}
              <Text className="font-semibold">{remainingKm}</Text> km to go.
            </Text>
          )}
        </View>

        {/* Progress bar */}
        <View className="w-full h-2 bg-white/25 rounded-full mt-3 overflow-hidden">
          <View
            className="h-2 bg-white rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>

      {/* RIGHT SIDE */}
      <View className="items-center">
        <View className="w-14 h-14 rounded-full bg-white/15 border border-white/40 items-center justify-center">
          <Text className="text-lg text-white font-semibold">{percentage}%</Text>
        </View>
        <Text className="text-[10px] text-white/80 mt-1">of goal</Text>
      </View>
    </LinearGradient>
  );
}

export default TodayRideSummaryCard;
