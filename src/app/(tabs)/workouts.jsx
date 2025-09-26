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

const workoutItems = [
  { title: "VR Game", image: "🎮", bgColour: "#ff3b30" },
  { title: "Pilates", image: "🙆‍♀️", bgColour: "#5956d6" },
  { title: "Cycling", image: "🚴‍♂️", bgColour: "#ff9500" },
  { title: "Dance", image: "💃", bgColour: "#ff69b4" },
  { title: "CrossFit", image: "🏋️‍♀️", bgColour: "#d2691e" },
  { title: "Strength Training", image: "💪", bgColour: "#8b0000" },
  { title: "Stretching", image: "🤸‍♂️", bgColour: "#20b2aa" },
  { title: "Running", image: "🏃‍♀️", bgColour: "#4cd964" },
  { title: "Yoga", image: "🧘‍♀️", bgColour: "#007aff" },
  { title: "HIIT", image: "🏋", bgColour: "#5956d6" },
];

const workouts = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite
  const toggleFavorite = (title) => {
    setFavorites((prev) =>
      prev.includes(title)
        ? prev.filter((f) => f !== title)
        : [...prev, title]
    );
  };

  // Filter workouts by search
  const filteredWorkouts = workoutItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

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
          marginBottom: 10,
        }}
      />

      {/* Workouts Grid */}
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={filteredWorkouts}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.title}
            image={item.image}
            bgColor={item.bgColour}
            favorite={favorites.includes(item.title)} // ⭐ new
            onToggleFavorite={() => toggleFavorite(item.title)} // ⭐ new
          />
        )}
      />
    </CustomSafeArea>
  );
};

export default workouts;
