import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { getScheduledWorkouts, replaceScheduledWorkouts } from "@/lib/scheduledWorkouts";

const addDays = (date, days) => { const next = new Date(date); next.setDate(next.getDate() + days); return next; };

export default function CalendarPlanner() {
  const [workouts, setWorkouts] = useState([]);
  const loadWorkouts = useCallback(async () => setWorkouts(await getScheduledWorkouts()), []);
  useFocusEffect(useCallback(() => { loadWorkouts(); }, [loadWorkouts]));
  const now = new Date();
  const upcoming = workouts.filter((workout) => new Date(workout.date) >= now);
  const past = workouts.filter((workout) => new Date(workout.date) < now);
  const totalMinutes = workouts.reduce((total, workout) => total + (Number(workout.duration) || 0), 0);
  const movePastSessions = async () => {
    if (!past.length) return Alert.alert("Nothing to shift", "There are no past sessions to move.");
    const updated = workouts.map((workout, index) => new Date(workout.date) < now ? { ...workout, date: addDays(now, index + 1).toISOString() } : workout);
    await replaceScheduledWorkouts(updated); loadWorkouts();
  };
  const clearPastSessions = () => {
    if (!past.length) return Alert.alert("Nothing to clear", "There are no past sessions to remove.");
    Alert.alert("Clear past sessions?", "This removes past workouts from the planner.", [{ text: "Cancel", style: "cancel" }, { text: "Clear", style: "destructive", onPress: async () => { await replaceScheduledWorkouts(upcoming); loadWorkouts(); } }]);
  };
  const tools = [
    ["Open coach", "Get a recommendation based on your plan.", "psychology", () => router.push("/coach")],
    ["Plan workout", "Add a new session to your calendar.", "add-circle-outline", () => router.push("/scheduleWorkout")],
    ["Start next ride", upcoming[0] ? `Launch ${upcoming[0].title}.` : "Schedule a ride first.", "play-circle-outline", () => upcoming[0] ? router.push("/currentWorkout") : router.push("/scheduleWorkout")],
    ["Shift overdue", "Move past sessions into the next few days.", "update", movePastSessions],
    ["Clear completed", "Remove past sessions from the planner.", "delete-outline", clearPastSessions],
  ];
  return <CustomSafeArea applyTopInset={false} bgColour="#050505"><ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
    <View className="bg-[#111827] rounded-[28px] p-5 border border-[#202938] mb-5"><View className="flex-row self-start bg-[#0B1220] rounded-full p-1 mb-5"><TouchableOpacity onPress={() => router.replace("/calendar")} className="px-4 py-2"><Text className="text-[#C4C8D0] font-semibold">Calendar</Text></TouchableOpacity><View className="bg-[#F27467] rounded-full px-4 py-2"><Text className="text-white font-semibold">Planner</Text></View></View><Text className="text-[#F79A8F] text-xs font-semibold uppercase">Planner tools</Text><Text className="text-white text-3xl font-bold mt-2">Shape your training week</Text><Text className="text-[#D1D5DB] text-sm mt-2">{workouts.length ? "Use the quick tools to keep your plan balanced." : "Your week is open. Start by planning your next ride."}</Text><View className="bg-[#0C1320] rounded-2xl p-4 mt-5"><Text className="text-[#9CA3AF] text-xs">Planner snapshot</Text><Text className="text-white text-xl font-bold mt-1">{workouts.length} scheduled sessions</Text><Text className="text-[#E5E7EB] text-sm mt-1">{totalMinutes} total minutes • {past.length} past sessions</Text></View></View>
    <View className="flex-row gap-3 mb-5"><View className="flex-1 bg-[#101014] rounded-2xl p-4"><Text className="text-[#8B8B95] text-xs">Next workout</Text><Text className="text-white font-bold mt-2" numberOfLines={1}>{upcoming[0]?.title || "Nothing planned"}</Text></View><View className="flex-1 bg-[#101014] rounded-2xl p-4"><Text className="text-[#8B8B95] text-xs">Upcoming</Text><Text className="text-white text-2xl font-bold mt-2">{upcoming.length}</Text></View></View>
    <Text className="text-white text-xl font-semibold mb-3">Quick tools</Text>{tools.map(([title, subtitle, icon, onPress]) => <TouchableOpacity key={title} onPress={onPress} className="bg-[#101014] border border-[#1C1C22] rounded-[24px] p-5 mb-3"><View className="flex-row items-center"><View className="w-12 h-12 rounded-2xl bg-[#1D2432] items-center justify-center mr-4"><MaterialIcons name={icon} size={24} color="#93C5FD" /></View><View className="flex-1"><Text className="text-white text-lg font-semibold">{title}</Text><Text className="text-[#A1A1AA] text-sm mt-1">{subtitle}</Text></View><MaterialIcons name="keyboard-arrow-right" size={24} color="#9CA3AF" /></View></TouchableOpacity>)}
  </ScrollView></CustomSafeArea>;
}
