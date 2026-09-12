import React, { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { getCustomWorkouts } from "@/lib/customWorkouts";
import { getScheduledWorkouts } from "@/lib/scheduledWorkouts";
import { buildCoachPlan } from "@/lib/workoutCoach";

const readinessOptions = [
  { key: "low", label: "Low", icon: "weather-night", text: "Keep it gentle today." },
  { key: "good", label: "Good", icon: "weather-sunny", text: "You are ready for a focused session." },
  { key: "high", label: "High", icon: "lightning-bolt", text: "A stronger session could fit today." },
];

export default function Coach() {
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);
  const [customWorkouts, setCustomWorkouts] = useState([]);
  const [activeInsight, setActiveInsight] = useState("today");
  const [readiness, setReadiness] = useState("good");
  const loadData = useCallback(async () => {
    const [scheduled, custom] = await Promise.all([getScheduledWorkouts(), getCustomWorkouts()]);
    setScheduledWorkouts(scheduled); setCustomWorkouts(custom);
  }, []);
  useFocusEffect(useCallback(() => { loadData(); }, [loadData]));
  const plan = buildCoachPlan({ scheduledWorkouts, customWorkouts });
  const readinessCopy = readinessOptions.find((item) => item.key === readiness)?.text;
  const insight = activeInsight === "today"
    ? { title: "Today’s focus", body: plan.nextWorkout ? `Your next session is ${plan.nextWorkout.title}. ${readinessCopy}` : `Nothing is scheduled yet. ${readinessCopy}`, chip: "Today" }
    : activeInsight === "week"
      ? { title: "Your week", body: plan.coachMessage, chip: `${plan.totals.thisWeekCount} planned` }
      : { title: "Recovery guide", body: plan.recoveryMessage, chip: "Recovery" };
  const primaryAction = readiness === "low" ? "Schedule recovery" : plan.recommendation.action;

  return <CustomSafeArea applyTopInset={false} bgColour="#050505"><ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
    <View className="bg-[#10281F] border border-[#1D4B31] rounded-[28px] p-5 mb-5"><View className="flex-row justify-between items-start"><View className="flex-1 pr-4"><Text className="text-[#86EFAC] text-xs font-semibold uppercase tracking-[1px]">Coach mode</Text><Text className="text-white text-3xl font-bold mt-2">Train with a plan</Text><Text className="text-[#D1D5DB] text-sm leading-5 mt-2">Personalised guidance built from your calendar, workouts, and how you feel today.</Text></View><View className="w-12 h-12 rounded-2xl bg-[#173923] items-center justify-center"><MaterialCommunityIcons name="brain" size={28} color="#86EFAC" /></View></View><View className="bg-[#0B1D13] rounded-2xl p-4 mt-5"><Text className="text-[#9CA3AF] text-xs">Coach read</Text><Text className="text-white text-xl font-bold mt-1">{plan.intensity} load</Text><Text className="text-[#E5E7EB] text-sm mt-1">{plan.intensityCopy}</Text></View></View>
    <Text className="text-white text-xl font-semibold">How are you feeling?</Text><Text className="text-[#A1A1AA] text-sm mt-1 mb-3">Check in so Coach can adjust today’s suggestion.</Text><View className="flex-row gap-3 mb-5">{readinessOptions.map((item) => { const active = readiness === item.key; return <TouchableOpacity key={item.key} onPress={() => setReadiness(item.key)} className={`flex-1 rounded-2xl p-3 items-center border ${active ? "bg-[#1B3A25] border-[#22C55E]" : "bg-[#101014] border-[#1C1C22]"}`}><MaterialCommunityIcons name={item.icon} size={22} color={active ? "#86EFAC" : "#8B8B95"} /><Text className={`text-sm font-semibold mt-2 ${active ? "text-[#86EFAC]" : "text-[#C4C8D0]"}`}>{item.label}</Text></TouchableOpacity>; })}</View>
    <TouchableOpacity onPress={() => router.push("/scheduleWorkout")} className="bg-[#22C55E] rounded-2xl py-4 px-5 mb-5 flex-row justify-between items-center"><View><Text className="text-[#04130B] text-base font-semibold">{primaryAction}</Text><Text className="text-[#123D28] text-xs mt-1">{readiness === "low" ? "Give your body an easier session." : `${plan.recommendation.title} • ${plan.recommendation.duration} min`}</Text></View><MaterialIcons name="keyboard-arrow-right" size={24} color="#04130B" /></TouchableOpacity>
    <View className="flex-row gap-3 mb-5"><View className="flex-1 bg-[#101014] rounded-2xl p-4 border border-[#1C1C22]"><Text className="text-[#8B8B95] text-xs">This week</Text><Text className="text-white text-2xl font-bold mt-2">{plan.totals.thisWeekCount}</Text><Text className="text-[#8B8B95] text-xs mt-1">planned sessions</Text></View><View className="flex-1 bg-[#101014] rounded-2xl p-4 border border-[#1C1C22]"><Text className="text-[#8B8B95] text-xs">Minutes</Text><Text className="text-white text-2xl font-bold mt-2">{plan.totals.totalMinutes}</Text><Text className="text-[#8B8B95] text-xs mt-1">training load</Text></View><View className="flex-1 bg-[#101014] rounded-2xl p-4 border border-[#1C1C22]"><Text className="text-[#8B8B95] text-xs">Plans</Text><Text className="text-white text-2xl font-bold mt-2">{plan.totals.customCount}</Text><Text className="text-[#8B8B95] text-xs mt-1">custom rides</Text></View></View>
    <Text className="text-white text-xl font-semibold">Coach insights</Text><View className="flex-row gap-2 mt-3 mb-4">{[["today", "Today"], ["week", "This week"], ["recovery", "Recovery"]].map(([key, label]) => <TouchableOpacity key={key} onPress={() => setActiveInsight(key)} className={`px-4 py-3 rounded-full ${activeInsight === key ? "bg-[#22C55E]" : "bg-[#18191F]"}`}><Text className={`font-semibold ${activeInsight === key ? "text-[#04130B]" : "text-[#C4C8D0]"}`}>{label}</Text></TouchableOpacity>)}</View>
    <View className="bg-[#101014] rounded-[26px] p-5 border border-[#1C1C22] mb-5"><View className="flex-row justify-between"><Text className="text-white text-xl font-semibold">{insight.title}</Text><View className="bg-[#1B2B22] rounded-full px-3 py-2"><Text className="text-[#86EFAC] text-xs font-semibold">{insight.chip}</Text></View></View><Text className="text-[#D1D5DB] text-sm leading-6 mt-4">{insight.body}</Text></View>
    <Text className="text-white text-xl font-semibold mb-3">Quick coaching tools</Text>{[["Open planner", "Review and adjust your training week.", "calendar-month", () => router.push("/calendarPlanner")], ["Build a custom ride", "Create a workout for your exact goal.", "playlist-edit", () => router.push("/customWorkoutBuilder")], ["View calendar", "See every planned session at a glance.", "calendar", () => router.push("/calendar")]].map(([title, subtitle, icon, action]) => <TouchableOpacity key={title} onPress={action} className="bg-[#101014] border border-[#1C1C22] rounded-[22px] p-4 mb-3"><View className="flex-row items-center"><View className="w-11 h-11 rounded-2xl bg-[#1B2B22] items-center justify-center mr-3"><MaterialCommunityIcons name={icon} size={22} color="#86EFAC" /></View><View className="flex-1"><Text className="text-white font-semibold">{title}</Text><Text className="text-[#A1A1AA] text-xs mt-1">{subtitle}</Text></View><MaterialIcons name="keyboard-arrow-right" size={22} color="#86EFAC" /></View></TouchableOpacity>)}
  </ScrollView></CustomSafeArea>;
}
