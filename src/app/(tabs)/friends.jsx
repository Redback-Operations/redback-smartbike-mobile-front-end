import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import CustomSafeArea from "@/components/CustomSafeArea";
import { router } from "expo-router";

// Mock friend activity data with gradient colors + lastActive + streak
const initialData = [
  {
    id: "1",
    name: "Mila",
    type: "ride",
    km: 12.4,
    min: 32,
    kcal: 245,
    likes: 3,
    comments: 1,
    colors: ["#ff3b30", "#ff7e67"], // Red to coral
    lastActive: "Today",
    streak: "3-day streak",
  },
  {
    id: "2",
    name: "Jay",
    type: "goal",
    likes: 6,
    comments: 2,
    colors: ["#4cd964", "#8de37f"], // Green gradient
    lastActive: "2 days ago",
    streak: "5-day streak",
  },
  {
    id: "3",
    name: "Noah",
    type: "ride",
    km: 5.8,
    min: 14,
    kcal: 114,
    likes: 1,
    comments: 0,
    colors: ["#007aff", "#4f8df7"], // Blue gradient
    lastActive: "5 hours ago",
    streak: "1-day streak",
  },
];

// Returns descriptive text for each activity
const subtitle = (a) =>
  a.type === "ride"
    ? `Rode ${a.km?.toFixed(1)} km • ${a.min} min • ${a.kcal} kcal`
    : "Hit a weekly goal 🎯";

// Single friend activity card with gradient background
function ActivityCard({ a, onLike, onComment }) {
  return (
    <LinearGradient
      colors={a.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        {a.name}
      </Text>

      <Text
        style={{
          color: "white",
          opacity: 0.9,
          fontSize: 14,
          marginTop: 2,
        }}
      >
        {subtitle(a)}
      </Text>

      {/* Streak + last active */}
      <Text
        style={{
          color: "white",
          opacity: 0.85,
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {a.streak || "No streak yet"}
      </Text>

      <Text
        style={{
          color: "white",
          opacity: 0.8,
          fontSize: 12,
          marginTop: 2,
        }}
      >
        Last ride: {a.lastActive || "Recently"}
      </Text>

      {/* Likes and Comments Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "white", opacity: 0.85, fontSize: 12 }}>
          {a.likes} likes • {a.comments} comments
        </Text>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity onPress={onLike}>
            <FontAwesome6 name="heart" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onComment}>
            <FontAwesome6 name="comment" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default function Friends() {
  const [data, setData] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFriend, setNewFriend] = useState("");
  const [filterType, setFilterType] = useState("All"); // 🔹 filter: All/Rides/Goals

  const handleLike = (id) => {
    setData((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, likes: a.likes + 1 } : a
      )
    );
  };

  const handleComment = (id) => {
    // Navigate to comments screen (placeholder)
    router.push(`/comments?activityId=${id}`);
  };

  const handleAddFriend = () => {
    if (newFriend.trim() !== "") {
      const newEntry = {
        id: (data.length + 1).toString(),
        name: newFriend,
        type: "goal",
        likes: 0,
        comments: 0,
        colors: ["#8e44ad", "#9b59b6"], // Purple gradient
        lastActive: "Just added",
        streak: "New goal",
      };
      setData([newEntry, ...data]);
      setNewFriend("");
      setModalVisible(false);
    }
  };

  // 🔹 Friend streaks summary for header
  const streakSummary =
    data.length > 0
      ? data
        .map((f) => `${f.name} (${f.streak || "no streak"})`)
        .join(" • ")
      : "No friend activity yet";

  // 🔹 Filtered list by type
  const filteredData =
    filterType === "All"
      ? data
      : data.filter((item) =>
        filterType === "Rides" ? item.type === "ride" : item.type === "goal"
      );

  return (
    <CustomSafeArea applyTopInset={false} className="flex-1 bg-white">
      {/* Page header */}
      <View className="flex-row justify-between items-center m-2 mt-8">
        <Text className="text-brand-purple my-6 font-bold text-4xl">
          Friends Activity
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome6 name="user-plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Friend streaks overview */}
      <View className="px-3 mb-3">
        <Text className="text-xs font-semibold text-gray-500 mb-1">
          Friend streaks
        </Text>
        <Text className="text-[11px] text-gray-700">
          {streakSummary}
        </Text>
      </View>

      {/* 🔹 Quick filters */}
      <View className="px-3 mb-3 flex-row gap-2">
        {["All", "Rides", "Goals"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilterType(type)}
            className={`px-3 py-1 rounded-full ${filterType === type ? "bg-black" : "bg-gray-200"
              }`}
          >
            <Text
              className={`text-xs ${filterType === type ? "text-white font-semibold" : "text-gray-700"
                }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gradient friend activity list */}
      <FlatList
        data={filteredData}
        keyExtractor={(x) => x.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <ActivityCard
            a={item}
            onLike={() => handleLike(item.id)}
            onComment={() => handleComment(item.id)}
          />
        )}
      />

      {/* Add Friend Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 12,
              width: "80%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 12,
              }}
            >
              Add New Friend
            </Text>
            <TextInput
              placeholder="Enter friend's name"
              value={newFriend}
              onChangeText={setNewFriend}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
              }}
            />
            <Button title="Add Friend" onPress={handleAddFriend} />
          </View>
        </View>
      </Modal>
    </CustomSafeArea>
  );
}
