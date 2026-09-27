import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useChallenge } from "@/context/challengeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ChallengeConfigurator = ({ selectedFriend, onSuccess, onError }) => {
  const { createChallenge, loading } = useChallenge();
  const [goalType, setGoalType] = useState("distance");
  const [goalValue, setGoalValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleSendChallenge = async () => {
    if (!goalValue || goalValue === "0") {
      Alert.alert("Error", "Please enter a valid goal value");
      return;
    }

    setIsCreating(true);
    try {
      const challenge = await createChallenge(
        selectedFriend.id,
        goalType,
        parseFloat(goalValue)
      );
      onSuccess(challenge);
      Alert.alert("Success", `Challenge sent to ${selectedFriend.name}!`);
    } catch (error) {
      onError(error);
      Alert.alert("Error", "Failed to send challenge");
    } finally {
      setIsCreating(false);
    }
  };

  const goalUnit = goalType === "distance" ? "km" : "kcal";

  return (
    <View className="flex-1 bg-black px-6 py-6">
      {/* Header */}
      <Text className="text-3xl font-bold text-white mb-2">
        Configure Challenge
      </Text>
      <Text className="text-[#9CA3AF] text-base mb-8">
        Set up your 1v1 challenge with {selectedFriend?.name}
      </Text>

      {/* Goal Type Toggle */}
      <Text className="text-lg font-semibold text-white mb-3">
        Goal Type
      </Text>
      <View className="flex-row gap-4 mb-8">
        <TouchableOpacity
          onPress={() => setGoalType("distance")}
          testID="distance-toggle"
          className={`flex-1 p-4 rounded-3xl items-center border-2 ${
            goalType === "distance"
              ? "bg-[#1E2A24] border-[#4ADE80]"
              : "bg-[#1D2432] border-[#1F2937]"
          }`}
          style={{ opacity: goalType === "distance" ? 1 : 0.5 }}
        >
          <MaterialIcons
            name="directions-bike"
            size={28}
            color={goalType === "distance" ? "#4ADE80" : "#666"}
          />
          <Text
            className={`mt-2 font-semibold ${
              goalType === "distance" ? "text-[#4ADE80]" : "text-[#9CA3AF]"
            }`}
          >
            Distance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoalType("calorie")}
          testID="calorie-toggle"
          className={`flex-1 p-4 rounded-3xl items-center border-2 ${
            goalType === "calorie"
              ? "bg-[#1E2A24] border-[#4ADE80]"
              : "bg-[#1D2432] border-[#1F2937]"
          }`}
          style={{ opacity: goalType === "calorie" ? 1 : 0.5 }}
        >
          <MaterialIcons
            name="local-fire-department"
            size={28}
            color={goalType === "calorie" ? "#4ADE80" : "#666"}
          />
          <Text
            className={`mt-2 font-semibold ${
              goalType === "calorie" ? "text-[#4ADE80]" : "text-[#9CA3AF]"
            }`}
          >
            Calories
          </Text>
        </TouchableOpacity>
      </View>

      {/* Goal Value Input */}
      <Text className="text-lg font-semibold text-white mb-3">
        Goal Value ({goalUnit})
      </Text>
      <View className="mb-8">
        <TextInput
          placeholder={`Enter goal in ${goalUnit}...`}
          value={goalValue}
          onChangeText={setGoalValue}
          keyboardType="decimal-pad"
          testID="goal-value-input"
          className="border-2 border-[#1F2937] rounded-2xl px-4 py-3 text-lg text-white bg-[#1D2432]"
          placeholderTextColor="#666"
        />
      </View>

      {/* Challenge Preview */}
      {goalValue && goalValue !== "0" && (
        <View className="bg-[#1D2432] p-6 rounded-3xl mb-8 border border-[#1F2937]">
          <Text className="text-[#9CA3AF] text-sm mb-2">Challenge Preview</Text>
          <View className="flex-row justify-between items-center">
            <View className="items-center">
              <Text className="text-white font-semibold">You</Text>
              <Text className="text-sm text-[#9CA3AF] mt-1">
                {goalValue} {goalUnit}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-[#9CA3AF]">vs</Text>
            </View>
            <View className="items-center">
              <Text className="text-white font-semibold">
                {selectedFriend?.name}
              </Text>
              <Text className="text-sm text-[#9CA3AF] mt-1">
                {goalValue} {goalUnit}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Send Challenge Button */}
      <TouchableOpacity
        onPress={handleSendChallenge}
        disabled={!goalValue || goalValue === "0" || isCreating}
        testID="send-challenge-btn"
        className={`py-4 rounded-2xl items-center ${
          goalValue && goalValue !== "0" && !isCreating
            ? "bg-[#EB7363]"
            : "bg-[#1D2432]"
        }`}
      >
        {isCreating ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="send" size={20} color={goalValue && goalValue !== "0" && !isCreating ? "white" : "#666"} />
            <Text className={`text-lg font-semibold ${goalValue && goalValue !== "0" && !isCreating ? "text-white" : "text-[#9CA3AF]"}`}>
              Send Challenge
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeConfigurator;