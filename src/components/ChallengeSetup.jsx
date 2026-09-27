import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { useChallenge } from "@/context/challengeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MOCK_FRIENDS } from "@/components/mockdata";

const ChallengeSetup = ({ friend }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { createChallenge, fetchChallenges } = useChallenge();

  const [selectedFriend, setSelectedFriend] = useState(friend || null);
  const [goalType, setGoalType] = useState("distance");
  const [goalValue, setGoalValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFriendSelector, setShowFriendSelector] = useState(!friend);

  const handleCreateChallenge = async () => {
    if (!selectedFriend) {
      Alert.alert("Error", "Please select a friend");
      return;
    }

    if (!goalValue || goalValue === "0") {
      Alert.alert("Error", "Please enter a valid goal value");
      return;
    }

    setIsSubmitting(true);
    try {
      await createChallenge(
        selectedFriend.id,
        goalType,
        parseFloat(goalValue)
      );

      Alert.alert(
        "Challenge Sent! 🎉",
        `Challenge sent to ${selectedFriend.name}!`,
        [
          {
            text: "View Pending",
            onPress: async () => {
              await fetchChallenges();
              router.push({
                pathname: "/(tabs)/challengeHub",
                params: { tab: "pending" },
              });
            },
          },
          {
            text: "Dismiss",
            onPress: () => router.back(),
          },
        ]
      );

      setGoalValue("");
      setGoalType("distance");
    } catch (error) {
      Alert.alert("Error", "Failed to create challenge");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Friend Selector Screen
  if (showFriendSelector) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        {/* Header */}
        <View className="px-6 pt-4 pb-4 flex-row items-center justify-between border-b border-[#1F2937]">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white">Select Friend</Text>
            <Text className="text-[#9CA3AF] text-xs mt-1">
              Who do you want to challenge?
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={28} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Friends List */}
        <FlatList
          data={MOCK_FRIENDS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedFriend(item);
                setShowFriendSelector(false);
              }}
              className="mx-4 my-2 p-4 bg-[#141A26] rounded-2xl border border-[#1F2937] active:opacity-70"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-base font-bold text-white">
                    {item.name}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <View
                      className={`w-2 h-2 rounded-full mr-2 ${
                        item.status === "Active"
                          ? "bg-[#4ADE80]"
                          : "bg-[#9CA3AF]"
                      }`}
                    />
                    <Text className="text-xs text-[#9CA3AF]">
                      {item.status || "Active"}
                    </Text>
                  </View>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color="#4ADE80"
                />
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={true}
          contentContainerStyle={{ paddingVertical: 12 }}
        />
      </SafeAreaView>
    );
  }

  // Challenge Setup Screen
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-4 flex-row items-center justify-between border-b border-[#1F2937]">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white">New Challenge</Text>
            <Text className="text-[#9CA3AF] text-xs mt-1">
              Challenge {selectedFriend?.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={28} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="px-6 py-6">
          {/* Friend Card */}
          <TouchableOpacity
            onPress={() => setShowFriendSelector(true)}
            className="mb-8 p-5 bg-[#141A26] rounded-3xl border-2 border-[#4ADE80] active:opacity-70"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[#9CA3AF] text-xs font-bold tracking-wider mb-2">
                  OPPONENT
                </Text>
                <Text className="text-2xl font-bold text-white">
                  {selectedFriend?.name}
                </Text>
                <View className="flex-row items-center mt-3">
                  <View
                    className={`w-2 h-2 rounded-full mr-2 ${
                      selectedFriend?.status === "Active"
                        ? "bg-[#4ADE80]"
                        : "bg-[#9CA3AF]"
                    }`}
                  />
                  <Text className="text-xs text-[#9CA3AF]">
                    {selectedFriend?.status || "Active"}
                  </Text>
                </View>
              </View>
              <View className="w-12 h-12 bg-[#4ADE80]/10 rounded-full justify-center items-center">
                <MaterialIcons name="person" size={24} color="#4ADE80" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Goal Type Section */}
          <View className="mb-8">
            <Text className="text-xs font-bold tracking-wider text-[#9CA3AF] mb-3">
              GOAL TYPE
            </Text>
            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setGoalType("distance")}
                className={`flex-1 p-5 rounded-2xl items-center justify-center border-2 active:opacity-70 ${
                  goalType === "distance"
                    ? "bg-[#1E2A24] border-[#4ADE80]"
                    : "bg-[#1D2432] border-[#1F2937]"
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-full justify-center items-center mb-3 ${
                    goalType === "distance"
                      ? "bg-[#4ADE80]/20"
                      : "bg-[#1F2937]"
                  }`}
                >
                  <MaterialIcons
                    name="directions-bike"
                    size={24}
                    color={goalType === "distance" ? "#4ADE80" : "#666"}
                  />
                </View>
                <Text
                  className={`font-bold text-xs ${
                    goalType === "distance"
                      ? "text-[#4ADE80]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  Distance
                </Text>
                <Text className="text-[10px] text-[#9CA3AF] mt-1">(km)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setGoalType("calorie")}
                className={`flex-1 p-5 rounded-2xl items-center justify-center border-2 active:opacity-70 ${
                  goalType === "calorie"
                    ? "bg-[#2A2418] border-[#FFA500]"
                    : "bg-[#1D2432] border-[#1F2937]"
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-full justify-center items-center mb-3 ${
                    goalType === "calorie"
                      ? "bg-[#FFA500]/20"
                      : "bg-[#1F2937]"
                  }`}
                >
                  <MaterialIcons
                    name="local-fire-department"
                    size={24}
                    color={goalType === "calorie" ? "#FFA500" : "#666"}
                  />
                </View>
                <Text
                  className={`font-bold text-xs ${
                    goalType === "calorie"
                      ? "text-[#FFA500]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  Calories
                </Text>
                <Text className="text-[10px] text-[#9CA3AF] mt-1">(kcal)</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Goal Value Section */}
          <View className="mb-8">
            <Text className="text-xs font-bold tracking-wider text-[#9CA3AF] mb-3">
              GOAL VALUE
            </Text>
            <TextInput
              placeholder="Enter goal value..."
              value={goalValue}
              onChangeText={setGoalValue}
              keyboardType="decimal-pad"
              placeholderTextColor="#666"
              className="border-2 border-[#1F2937] rounded-2xl px-5 py-4 text-base text-white bg-[#1D2432] font-semibold"
            />
          </View>

          {/* Preview Card */}
          {goalValue && goalValue !== "0" && (
            <View className="mb-8 p-6 bg-[#1D2432] rounded-3xl border border-[#1F2937]">
              <Text className="text-[#9CA3AF] text-xs font-bold tracking-wider mb-6">
                CHALLENGE PREVIEW
              </Text>

              {/* VS Display */}
              <View className="flex-row justify-around items-center mb-6">
                <View className="items-center flex-1">
                  <Text className="text-white font-bold text-xs mb-1">YOU</Text>
                  <View className="w-16 h-16 rounded-2xl bg-[#4ADE80]/20 justify-center items-center mb-2">
                    <Text className="text-2xl font-bold text-white">
                      {goalValue}
                    </Text>
                  </View>
                  <Text className="text-[#9CA3AF] text-xs">
                    {goalType === "distance" ? "km" : "kcal"}
                  </Text>
                </View>

                <View className="px-4">
                  <Text className="text-[#9CA3AF] font-bold text-sm">VS</Text>
                </View>

                <View className="items-center flex-1">
                  <Text className="text-white font-bold text-xs mb-1 uppercase">
                    {selectedFriend?.name?.split(" ")[0]}
                  </Text>
                  <View className="w-16 h-16 rounded-2xl bg-[#FFA500]/20 justify-center items-center mb-2">
                    <Text className="text-2xl font-bold text-white">
                      {goalValue}
                    </Text>
                  </View>
                  <Text className="text-[#9CA3AF] text-xs">
                    {goalType === "distance" ? "km" : "kcal"}
                  </Text>
                </View>
              </View>

              <View className="w-full h-0.5 bg-[#1F2937] mb-4" />
              <Text className="text-[#4ADE80] font-bold text-center text-sm">
                ✓ Ready to send challenge
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View className="flex-row gap-3 pb-6">
            <TouchableOpacity
              onPress={handleCreateChallenge}
              disabled={!goalValue || goalValue === "0" || isSubmitting}
              className={`flex-1 py-4 px-6 rounded-2xl items-center justify-center active:opacity-80 ${
                goalValue && goalValue !== "0" && !isSubmitting
                  ? "bg-[#EB7363]"
                  : "bg-[#1D2432]"
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  className={`text-base font-bold ${
                    goalValue && goalValue !== "0" && !isSubmitting
                      ? "text-white"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  Send Challenge
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-1 py-4 px-6 rounded-2xl items-center justify-center bg-[#1D2432] active:opacity-70"
            >
              <Text className="text-[#9CA3AF] font-bold text-base">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengeSetup;
