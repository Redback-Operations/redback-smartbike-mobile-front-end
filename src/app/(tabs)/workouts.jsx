import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import WorkoutCard from "@/components/WorkoutCard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

// 🔹 Workout items now include difficulty
const workoutItems = [
  { title: "VR Game", image: "🎮", bgColour: "#ff3b30", difficulty: "Beginner" },
  { title: "Pilates", image: "🙆‍♀️", bgColour: "#5956d6", difficulty: "Intermediate" },
  { title: "Cycling", image: "🚴‍♂️", bgColour: "#ff9500", difficulty: "Beginner" },
  { title: "Dance", image: "💃", bgColour: "#ff69b4", difficulty: "Intermediate" },
  { title: "CrossFit", image: "🏋️‍♀️", bgColour: "#d2691e", difficulty: "Advanced" },
  { title: "Strength Training", image: "💪", bgColour: "#8b0000", difficulty: "Advanced" },
  { title: "Stretching", image: "🤸‍♂️", bgColour: "#20b2aa", difficulty: "Beginner" },
  { title: "Running", image: "🏃‍♀️", bgColour: "#4cd964", difficulty: "Intermediate" },
  { title: "Yoga", image: "🧘‍♀️", bgColour: "#007aff", difficulty: "Beginner" },
  { title: "HIIT", image: "🏋", bgColour: "#5956d6", difficulty: "Advanced" },
];

const workouts = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All"); // 🔹 NEW

  // Toggle favorite
  const toggleFavorite = (title) => {
    setFavorites((prev) =>
      prev.includes(title)
        ? prev.filter((f) => f !== title)
        : [...prev, title]
    );
  };

  // 🔹 Difficulty + search filter combined
  const filteredWorkouts = workoutItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      item.difficulty === selectedDifficulty;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <CustomSafeArea applyTopInset={false} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center m-2">
        <Text className="text-brand-purple my-6 font-bold text-4xl">
          Track your fitness
        </Text>
        <TouchableOpacity onPress={() => router.push("/scheduleWorkout")}>
          <FontAwesome6 name="calendar-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search workouts..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#f0f0f0",
          padding: 10,
          borderRadius: 8,
          marginHorizontal: 10,
          marginBottom: 8,
        }}
      />

      {/* 🔹 Difficulty Filter Chips */}
      <View className="px-3 mb-2">
        <Text className="text-base font-semibold text-gray-800 mb-2">
          Filter by difficulty
        </Text>
        <View className="flex-row gap-2">
          {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
            <Text
              key={level}
              onPress={() => setSelectedDifficulty(level)}
              className={`px-3 py-1 rounded-full text-xs ${selectedDifficulty === level
                ? "bg-black text-white font-semibold"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {level}
            </Text>
          ))}
        </View>
      </View>

      {/* Workouts Grid */}
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={filteredWorkouts}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.title}
            image={item.image}
            bgColor={item.bgColour}
            favorite={favorites.includes(item.title)}
            onToggleFavorite={() => toggleFavorite(item.title)}
          />
        )}
      />
    </CustomSafeArea>
  );
};

export default workouts;
