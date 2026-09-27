import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { useChallenge } from "@/context/challengeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MOCK_CHALLENGES } from "@/components/mockdata";

const ChallengeHub = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { challenges, addChallenges, updateChallenge, deleteChallenge } =
    useChallenge();
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with mock data on first render
    if (challenges.length === 0) {
      addChallenges(MOCK_CHALLENGES);
    }
    setLoading(false);
  }, []);

  // Filter challenges by status
  const pendingChallenges = challenges.filter((c) => c.status === "pending");
  const activeChallenges = challenges.filter((c) => c.status === "active");
  const completedChallenges = challenges.filter((c) => c.status === "completed");

  const getDisplayedChallenges = () => {
    switch (activeTab) {
      case "pending":
        return pendingChallenges;
      case "active":
        return activeChallenges;
      case "completed":
        return completedChallenges;
      default:
        return [];
    }
  };

  const displayedChallenges = getDisplayedChallenges();

  const handleAcceptChallenge = (challengeId, opponentName) => {
    Alert.alert(
      "Accept Challenge",
      `Accept challenge from ${opponentName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          style: "default",
          onPress: async () => {
            try {
              await updateChallenge(challengeId, { status: "active" });
              Alert.alert("Success", `Challenge with ${opponentName} started!`);
            } catch (error) {
              Alert.alert("Error", "Failed to accept challenge");
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const handleRejectChallenge = (challengeId, opponentName) => {
    Alert.alert(
      "Reject Challenge",
      `Decline challenge from ${opponentName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteChallenge(challengeId);
              Alert.alert("Rejected", "Challenge declined");
            } catch (error) {
              Alert.alert("Error", "Failed to reject challenge");
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const renderChallengeCard = ({ item }) => (
    <View className="mx-6 mb-4 p-4 bg-[#141A26] rounded-3xl border border-[#1F2937]">
      {/* Challenge Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-white">
            {item.opponent_name || "Opponent"}
          </Text>
          <Text className="text-xs text-[#9CA3AF] mt-1">
            {item.goal_type === "distance" ? "Distance Challenge" : "Calorie Challenge"}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-[#4ADE80]">
            {item.goal_value}
          </Text>
          <Text className="text-xs text-[#9CA3AF] mt-1">
            {item.goal_type === "distance" ? "km" : "kcal"}
          </Text>
        </View>
      </View>

      {/* Status Badge */}
      <View className="bg-[#1D2432] rounded-2xl px-3 py-2 mb-4 self-start">
        <Text className="text-xs font-semibold text-[#9CA3AF]">
          {item.status === "pending"
            ? "⏳ Pending"
            : item.status === "active"
            ? "⚡ Active"
            : "✅ Completed"}
        </Text>
      </View>

      {/* Buttons - Show for Pending Challenges */}
      {item.status === "pending" && (
        <View className="flex-row gap-3 mt-4">
          <TouchableOpacity
            onPress={() => handleRejectChallenge(item.id, item.opponent_name)}
            className="flex-1 py-3 rounded-2xl bg-[#1D2432] border border-[#EB7363] items-center"
          >
            <Text className="text-[#EB7363] font-semibold">Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAcceptChallenge(item.id, item.opponent_name)}
            className="flex-1 py-3 rounded-2xl bg-[#4ADE80] items-center"
          >
            <Text className="text-black font-semibold">Accept</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Status Info - Show for Active/Completed */}
      {item.status !== "pending" && (
        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-[#1F2937]">
          <View className="flex-1">
            <Text className="text-xs text-[#9CA3AF] mb-1">You</Text>
            <Text className="text-lg font-bold text-white">0 km</Text>
          </View>
          <Text className="text-[#9CA3AF]">vs</Text>
          <View className="flex-1 items-end">
            <Text className="text-xs text-[#9CA3AF] mb-1">{item.opponent_name}</Text>
            <Text className="text-lg font-bold text-white">0 km</Text>
          </View>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#EB7363" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-white">Challenges</Text>
        <Text className="text-[#9CA3AF] text-base mt-2">
          {displayedChallenges.length}{" "}
          {displayedChallenges.length === 1 ? "challenge" : "challenges"}
        </Text>
      </View>

      {/* Tab Navigation */}
      <View className="px-6 pb-4 border-b border-[#1F2937]">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          {["pending", "active", "completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl ${
                activeTab === tab
                  ? "bg-[#4ADE80]"
                  : "bg-[#1D2432] border border-[#1F2937]"
              }`}
            >
              <Text
                className={`font-semibold capitalize ${
                  activeTab === tab ? "text-black" : "text-[#9CA3AF]"
                }`}
              >
                {tab === "pending"
                  ? "⏳ Pending"
                  : tab === "active"
                  ? "⚡ Active"
                  : "✅ Completed"}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Challenges List */}
      {displayedChallenges.length > 0 ? (
        <FlatList
          data={displayedChallenges}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChallengeCard}
          contentContainerStyle={{ paddingBottom: 100 }}
          testID="challenges-list"
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <MaterialIcons name="sports-motorsports" size={48} color="#333" />
          <Text className="text-[#9CA3AF] text-lg mt-4">
            {activeTab === "pending"
              ? "No pending challenges"
              : activeTab === "active"
              ? "No active challenges"
              : "No completed challenges"}
          </Text>
          {activeTab === "pending" && (
            <Text className="text-[#9CA3AF] text-sm mt-2">
              Create one to get started
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.push("/challengeSetup")}
        className="absolute bottom-8 right-6 w-16 h-16 bg-[#EB7363] rounded-full justify-center items-center shadow-lg"
        testID="create-challenge-fab"
      >
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeHub;
