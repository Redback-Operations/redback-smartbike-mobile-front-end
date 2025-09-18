import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { router } from "expo-router";
import IOSTimeDatePickers from "@/components/IOSTimeDatePickers";
import { Platform } from "react-native";
import AndroidTimeDatePickers from "@/components/AndroidTimeDatePickers";

const workoutItems = [
  {
    title: "VR Game",
    image: "🎮",
    bgColour: "#ff3b30",
  },
  {
    title: "Pilates",
    image: "🙆‍♀️",
    bgColour: "#5956d6",
  },
  {
    title: "Cycling",
    image: "🚴‍♂️",
    bgColour: "#ff9500",
  },
  {
    title: "Running",
    image: "🏃‍♀️",
    bgColour: "#4cd964",
  },
  {
    title: "Yoga",
    image: "🧘‍♀️",
    bgColour: "#007aff",
  },
  {
    title: "HIIT",
    image: "🏋",
    bgColour: "#5956d6",
  },
];

const scheduleWorkout = () => {
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [date, setDate] = useState(new Date());
  const [scheduled, setScheduled] = useState(false);

  return (
    <>
      <View className="p-4 flex-1  gap-6">
        <Text className="text-lg text-center font-bold">Schedule Workout</Text>

        <FlatList
          ListHeaderComponent={
            <Text className="text-center">
              Which activity would you like to schedule?
            </Text>
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={workoutItems}
          contentContainerStyle={{ gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <>
              {selectedWorkout && selectedWorkout !== item.title ? null : (
                <WorkoutCard
                  setSelectedWorkout={setSelectedWorkout}
                  handlePress={() => setSelectedWorkout(item.title)}
                  title={item.title}
                  image={item.image}
                  bgColor={item.bgColour}
                  isSelected={selectedWorkout === item.title}
                />
              )}
            </>
          )}
          ListFooterComponent={
            selectedWorkout && (
              <View className=" gap-4">
                <Text className="text-center">
                  Great choice! When're we doing this?
                </Text>

                {Platform.OS === "ios" ? (
                  <IOSTimeDatePickers date={date} setDate={setDate} />
                ) : (
                  <AndroidTimeDatePickers date={date} setDate={setDate} />
                )}

                {Platform.OS === "android" && (
                  <Text className="text-center">{date.toLocaleString()}</Text>
                )}

                <TouchableOpacity
                  onPress={() => setScheduled(true)}
                  className="bg-brand-purple  rounded-xl p-4"
                >
                  <Text
                    onPress={() => router.push("/scheduleConfirmation")}
                    className="text-white font-semibold text-center"
                  >
                    Lock it in
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        />
      </View>
    </>
  );
};

export default scheduleWorkout;
