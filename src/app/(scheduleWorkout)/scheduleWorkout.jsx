import React, { useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import IOSTimeDatePickers from "@/components/IOSTimeDatePickers";
import AndroidTimeDatePickers from "@/components/AndroidTimeDatePickers";
import CustomSafeArea from "@/components/CustomSafeArea";
import { createScheduledWorkoutId, saveScheduledWorkout } from "@/lib/scheduledWorkouts";

const workoutItems = [
  { title: "VR Game", icon: "gamepad-variant", focus: "Immersion", duration: 30, accent: "#F27467" },
  { title: "Pilates", icon: "yoga", focus: "Core and control", duration: 35, accent: "#9B8AFB" },
  { title: "Cycling", icon: "bike-fast", focus: "Endurance", duration: 45, accent: "#F5A64A" },
  { title: "Dance", icon: "human-handsup", focus: "Rhythm", duration: 30, accent: "#EE73B9" },
  { title: "CrossFit", icon: "weight-lifter", focus: "Power", duration: 40, accent: "#D98154" },
  { title: "Strength Training", icon: "dumbbell", focus: "Strength", duration: 45, accent: "#D45C63" },
  { title: "Stretching", icon: "human-handsdown", focus: "Recovery", duration: 20, accent: "#4FC0B5" },
  { title: "Running", icon: "run-fast", focus: "Speed", duration: 30, accent: "#55C981" },
];

export default function ScheduleWorkout() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const selected = workoutItems.find((item) => item.title === selectedWorkout);

  const handleScheduleWorkout = async () => {
    if (!selected || isSaving) return;
    setIsSaving(true);
    try {
      await saveScheduledWorkout({ id: createScheduledWorkoutId(), title: selected.title, category: selected.focus, duration: selected.duration, date: date.toISOString(), createdAt: new Date().toISOString() });
      router.push("/scheduleConfirmation");
    } catch (error) {
      console.error("Failed to schedule workout:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return <CustomSafeArea applyTopInset={false} bgColour="#050505"><ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
    <TouchableOpacity onPress={() => router.back()} className="self-start flex-row items-center mb-4"><MaterialIcons name="arrow-back" size={18} color="#C2C8D0" /><Text className="text-[#C2C8D0] ml-1">Back</Text></TouchableOpacity>
    <View className="bg-[#111827] border border-[#202938] rounded-[28px] p-5 mb-5"><Text className="text-[#F79A8F] text-xs font-semibold uppercase tracking-[1px]">Training calendar</Text><Text className="text-white text-3xl font-bold mt-2">Schedule a workout</Text><Text className="text-[#B8C0CE] text-sm leading-5 mt-2">Choose a session, set a time, and it will be ready in your calendar.</Text><View className="flex-row mt-5"><View className="bg-[#0C1320] rounded-2xl px-4 py-3 mr-3"><Text className="text-[#8E98A8] text-xs">Step 1</Text><Text className="text-white text-sm font-semibold mt-1">Choose session</Text></View><View className="bg-[#0C1320] rounded-2xl px-4 py-3"><Text className="text-[#8E98A8] text-xs">Step 2</Text><Text className="text-white text-sm font-semibold mt-1">Set your time</Text></View></View></View>
    <View className="mb-4"><Text className="text-white text-xl font-semibold">Choose an activity</Text><Text className="text-[#9297A3] text-sm mt-1">Pick a workout that matches what you want to focus on.</Text></View>
    <View className="flex-row flex-wrap justify-between">{workoutItems.map((item) => { const isSelected = selectedWorkout === item.title; return <TouchableOpacity key={item.title} activeOpacity={0.88} onPress={() => setSelectedWorkout(item.title)} className={`w-[48.5%] rounded-[24px] p-4 mb-3 border ${isSelected ? "bg-[#1F2937] border-[#F27467]" : "bg-[#111217] border-[#1C1C22]"}`}><View className="flex-row justify-between items-start"><View className="w-11 h-11 rounded-2xl items-center justify-center" style={{ backgroundColor: `${item.accent}22` }}><MaterialCommunityIcons name={item.icon} size={22} color={item.accent} /></View>{isSelected ? <View className="w-6 h-6 rounded-full bg-[#F27467] items-center justify-center"><MaterialIcons name="check" size={16} color="white" /></View> : null}</View><Text className="text-white text-base font-semibold mt-5">{item.title}</Text><Text className="text-[#9FA6B2] text-xs mt-1">{item.focus}</Text><Text className="text-[#F2B2AB] text-xs font-semibold mt-4">{item.duration} min</Text></TouchableOpacity>; })}</View>
    {selected ? <View className="bg-[#111827] border border-[#202938] rounded-[28px] p-5 mt-3"><View className="flex-row justify-between items-start"><View><Text className="text-[#F79A8F] text-xs font-semibold uppercase">Selected workout</Text><Text className="text-white text-xl font-bold mt-1">{selected.title}</Text><Text className="text-[#B8C0CE] text-sm mt-1">{selected.focus} • {selected.duration} minutes</Text></View><TouchableOpacity onPress={() => setSelectedWorkout(null)}><Text className="text-[#F79A8F] font-semibold">Change</Text></TouchableOpacity></View><View className="border-t border-[#202938] mt-5 pt-5"><Text className="text-white text-lg font-semibold">When are you training?</Text><Text className="text-[#9297A3] text-sm mt-1 mb-4">{date.toLocaleString("en-AU", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}</Text>{Platform.OS === "ios" ? <IOSTimeDatePickers date={date} setDate={setDate} /> : <AndroidTimeDatePickers date={date} setDate={setDate} />}</View><TouchableOpacity disabled={isSaving} onPress={handleScheduleWorkout} className={`rounded-2xl py-4 mt-5 ${isSaving ? "bg-[#A9544B]" : "bg-[#F27467]"}`}><Text className="text-white text-center font-semibold">{isSaving ? "Saving workout..." : "Add to calendar"}</Text></TouchableOpacity></View> : null}
  </ScrollView></CustomSafeArea>;
}
