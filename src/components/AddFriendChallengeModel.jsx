import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useChallenge } from "@/context/challengeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MOCK_FRIENDS, MOCK_CHALLENGES_BY_FRIEND } from "@/components/mockdata";

const AddFriendChallengeModal = ({ visible, onClose, friends = [] }) => {
  const { user } = useAuth();
  const { challenges, createChallenge, fetchChallenges } = useChallenge();

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [friendChallenges, setFriendChallenges] = useState([]);
  const [goalType, setGoalType] = useState("distance");
  const [goalValue, setGoalValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);

  // Use provided friends or mock data
  const friendsList = friends.length > 0 ? friends : MOCK_FRIENDS;

  useEffect(() => {
    if (selectedFriend) {
      // Get mock challenges for this friend
      let userChallenges = MOCK_CHALLENGES_BY_FRIEND[selectedFriend.id] || [];

      // Also filter real challenges
      const realChallenges = challenges.filter(
        (c) =>
          c.opponent_name === selectedFriend.name ||
          (c.opponent_id === selectedFriend.id || c.challenger_id === selectedFriend.id)
      );

      // Combine mock and real challenges
      setFriendChallenges([...userChallenges, ...realChallenges]);
    }
  }, [selectedFriend, challenges]);

  const filteredFriends = friendsList.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateChallenge = async () => {
    if (!goalValue || goalValue === "0") {
      Alert.alert("Error", "Please enter a valid goal value");
      return;
    }

    setIsSubmitting(true);
    try {
      await createChallenge(selectedFriend.id, goalType, parseFloat(goalValue));
      Alert.alert("Success", `Challenge created with ${selectedFriend.name}!`);

      // Reset form
      setGoalValue("");
      setGoalType("distance");
      setShowChallengeForm(false);

      // Refresh challenges
      fetchChallenges();
    } catch (error) {
      Alert.alert("Error", "Failed to create challenge");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChallenge = (challengeId) => {
    Alert.alert(
      "Delete Challenge",
      "Are you sure you want to delete this challenge?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call delete challenge API
              Alert.alert("Success", "Challenge deleted!");
              fetchChallenges();
            } catch (error) {
              Alert.alert("Error", "Failed to delete challenge");
            }
          },
        },
      ]
    );
  };

  const handleEditChallenge = (challenge) => {
    setEditingChallenge(challenge);
    setGoalType(challenge.goal_type);
    setGoalValue(challenge.goal_value.toString());
    setShowChallengeForm(true);
  };

  const renderFriendCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedFriend(item);
        setShowChallengeForm(false);
      }}
      className={`mx-3 mb-3 p-4 rounded-3xl border ${
        selectedFriend?.id === item.id
          ? "bg-[#1E2A24] border-[#4ADE80]"
          : "bg-[#141A26] border-[#1F2937]"
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              selectedFriend?.id === item.id ? "text-[#4ADE80]" : "text-white"
            }`}
          >
            {item.name}
          </Text>
          <Text className="text-[#9CA3AF] text-sm mt-1">
            {item.status || "Active"}
          </Text>
        </View>

        {selectedFriend?.id === item.id && (
          <View className="w-5 h-5 rounded-full bg-[#4ADE80] justify-center items-center">
            <Text className="text-white font-bold text-xs">✓</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderChallengeCard = ({ item }) => (
    <View className="mx-3 mb-3 p-4 bg-[#141A26] rounded-3xl border border-[#1F2937]">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-1">
          <Text className="text-base font-bold text-white">
            {item.goal_value} {item.goal_type === "distance" ? "km" : "kcal"}
          </Text>
          <Text className="text-xs text-[#9CA3AF] mt-1">
            {item.status === "pending"
              ? "⏳ Pending"
              : item.status === "active"
              ? "⚡ Active"
              : "✅ Completed"}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => handleEditChallenge(item)}
            className="bg-[#1D2432] p-2 rounded-full"
          >
            <MaterialIcons name="edit" size={16} color="#4ADE80" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteChallenge(item.id)}
            className="bg-[#1D2432] p-2 rounded-full"
          >
            <MaterialIcons name="delete" size={16} color="#EB7363" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-6 border-b border-[#1F2937]">
          <Text className="text-2xl font-bold text-white">
            {selectedFriend ? "Manage Challenges" : "Select Friend"}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {!selectedFriend ? (
          // Friend Selection View
          <View className="flex-1">
            {/* Search Bar */}
            <View className="px-6 py-4 border-b border-[#1F2937]">
              <View className="flex-row items-center bg-[#1D2432] rounded-2xl px-4 border border-[#1F2937]">
                <FontAwesome5 name="search" size={16} color="#666" />
                <TextInput
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 ml-3 py-3 text-base text-white"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            {/* Friends List */}
            {filteredFriends.length > 0 ? (
              <FlatList
                data={filteredFriends}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderFriendCard}
                contentContainerStyle={{ paddingVertical: 12 }}
              />
            ) : (
              <View className="flex-1 justify-center items-center">
                <FontAwesome5 name="users" size={48} color="#333" />
                <Text className="text-[#9CA3AF] text-lg mt-4">
                  No friends found
                </Text>
              </View>
            )}
          </View>
        ) : showChallengeForm ? (
          // Challenge Creation Form
          <ScrollView className="flex-1 px-6 py-6">
            <View className="flex-row items-center mb-6">
              <TouchableOpacity
                onPress={() => {
                  setShowChallengeForm(false);
                  setEditingChallenge(null);
                  setGoalValue("");
                  setGoalType("distance");
                }}
                className="mr-3"
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-white">
                {editingChallenge ? "Edit" : "Create"} Challenge
              </Text>
            </View>

            <Text className="text-base font-semibold text-white mb-3">
              Challenge with {selectedFriend.name}
            </Text>

            {/* Goal Type Toggle */}
            <Text className="text-sm font-semibold text-[#9CA3AF] mb-2 mt-4">
              Goal Type
            </Text>
            <View className="flex-row gap-2 mb-6">
              <TouchableOpacity
                onPress={() => setGoalType("distance")}
                className={`flex-1 p-3 rounded-2xl items-center border-2 ${
                  goalType === "distance"
                    ? "bg-[#1E2A24] border-[#4ADE80]"
                    : "bg-[#1D2432] border-[#1F2937]"
                }`}
              >
                <MaterialIcons
                  name="directions-bike"
                  size={20}
                  color={goalType === "distance" ? "#4ADE80" : "#666"}
                />
                <Text
                  className={`mt-1 font-semibold text-xs ${
                    goalType === "distance" ? "text-[#4ADE80]" : "text-[#9CA3AF]"
                  }`}
                >
                  Distance (km)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGoalType("calorie")}
                className={`flex-1 p-3 rounded-2xl items-center border-2 ${
                  goalType === "calorie"
                    ? "bg-[#1E2A24] border-[#4ADE80]"
                    : "bg-[#1D2432] border-[#1F2937]"
                }`}
              >
                <MaterialIcons
                  name="local-fire-department"
                  size={20}
                  color={goalType === "calorie" ? "#4ADE80" : "#666"}
                />
                <Text
                  className={`mt-1 font-semibold text-xs ${
                    goalType === "calorie" ? "text-[#4ADE80]" : "text-[#9CA3AF]"
                  }`}
                >
                  Calories (kcal)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Goal Value Input */}
            <Text className="text-sm font-semibold text-[#9CA3AF] mb-2">
              Goal Value
            </Text>
            <TextInput
              placeholder={`Enter goal value...`}
              value={goalValue}
              onChangeText={setGoalValue}
              keyboardType="decimal-pad"
              className="border-2 border-[#1F2937] rounded-2xl px-4 py-3 text-base text-white bg-[#1D2432] mb-6"
              placeholderTextColor="#666"
            />

            {/* Preview */}
            {goalValue && goalValue !== "0" && (
              <View className="bg-[#1D2432] p-4 rounded-2xl mb-6 border border-[#1F2937]">
                <Text className="text-[#9CA3AF] text-xs mb-3 font-semibold">
                  PREVIEW
                </Text>
                <View className="flex-row justify-around items-center">
                  <View className="items-center">
                    <Text className="text-white font-semibold text-sm">You</Text>
                    <Text className="text-xs text-[#9CA3AF] mt-1">
                      {goalValue} {goalType === "distance" ? "km" : "kcal"}
                    </Text>
                  </View>
                  <Text className="text-[#9CA3AF] text-sm">vs</Text>
                  <View className="items-center">
                    <Text className="text-white font-semibold text-sm">
                      {selectedFriend.name}
                    </Text>
                    <Text className="text-xs text-[#9CA3AF] mt-1">
                      {goalValue} {goalType === "distance" ? "km" : "kcal"}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Buttons */}
            <TouchableOpacity
              onPress={handleCreateChallenge}
              disabled={!goalValue || goalValue === "0" || isSubmitting}
              className={`py-3 rounded-2xl items-center mb-3 ${
                goalValue && goalValue !== "0" && !isSubmitting
                  ? "bg-[#EB7363]"
                  : "bg-[#1D2432]"
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  className={`text-base font-semibold ${
                    goalValue && goalValue !== "0" && !isSubmitting
                      ? "text-white"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  {editingChallenge ? "Update" : "Create"} Challenge
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowChallengeForm(false);
                setEditingChallenge(null);
                setGoalValue("");
                setGoalType("distance");
              }}
              className="py-3 rounded-2xl items-center bg-[#1D2432]"
            >
              <Text className="text-[#9CA3AF] font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          // Challenges List View
          <View className="flex-1">
            {/* Friend Info */}
            <View className="px-6 py-4 border-b border-[#1F2937]">
              <TouchableOpacity
                onPress={() => setSelectedFriend(null)}
                className="flex-row items-center mb-3"
              >
                <MaterialIcons name="arrow-back" size={24} color="#4ADE80" />
                <Text className="text-[#4ADE80] font-semibold ml-2">
                  Back to Friends
                </Text>
              </TouchableOpacity>
              <Text className="text-xl font-bold text-white">
                {selectedFriend.name}
              </Text>
            </View>

            {friendChallenges.length > 0 ? (
              <FlatList
                data={friendChallenges}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderChallengeCard}
                contentContainerStyle={{ paddingVertical: 12 }}
                ListHeaderComponent={
                  <View className="px-3 py-2">
                    <Text className="text-[#9CA3AF] text-sm font-semibold">
                      {friendChallenges.length} Challenge
                      {friendChallenges.length !== 1 ? "s" : ""}
                    </Text>
                  </View>
                }
              />
            ) : (
              <View className="flex-1 justify-center items-center">
                <MaterialIcons
                  name="sports-motorsports"
                  size={48}
                  color="#333"
                />
                <Text className="text-[#9CA3AF] text-base mt-4">
                  No challenges with {selectedFriend.name}
                </Text>
              </View>
            )}

            {/* Create Challenge Button */}
            <View className="px-6 py-4 border-t border-[#1F2937]">
              <TouchableOpacity
                onPress={() => setShowChallengeForm(true)}
                className="bg-[#EB7363] py-4 rounded-2xl items-center flex-row justify-center gap-2"
              >
                <MaterialIcons name="add" size={24} color="white" />
                <Text className="text-white font-semibold text-base">
                  New Challenge
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddFriendChallengeModal;