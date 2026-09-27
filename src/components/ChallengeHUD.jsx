import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useChallenge } from "@/context/challengeContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ChallengeHUD = ({ challenge, workoutData, onVictory, onEnd }) => {
  const { getOpponentProgress, completeChallenge } = useChallenge();
  const [opponentData, setOpponentData] = useState(null);
  const [polling, setPolling] = useState(true);
  const [victoryTriggered, setVictoryTriggered] = useState(false);

  // Get opponent's current goal metric (distance or calories)
  const getGoalProgress = (data, goalType) => {
    if (goalType === "distance") {
      return data?.distance || 0;
    } else if (goalType === "calorie") {
      return data?.calories || 0;
    }
    return 0;
  };

  const userProgress = getGoalProgress(workoutData, challenge?.goal_type);
  const opponentProgress = getGoalProgress(
    opponentData,
    challenge?.goal_type
  );
  const goalValue = challenge?.goal_value || 0;

  // Determine leader and gap
  const userLeading = userProgress > opponentProgress;
  const gapDistance = Math.abs(userProgress - opponentProgress).toFixed(1);
  const userWinning = userProgress >= goalValue;
  const opponentWinning = opponentProgress >= goalValue;

  // Poll opponent progress every 2 seconds
  useEffect(() => {
    if (!polling || !challenge?.id || victoryTriggered) return;

    const pollInterval = setInterval(async () => {
      try {
        const data = await getOpponentProgress(
          challenge.id,
          challenge.opponent_id
        );
        if (data) {
          setOpponentData(data);
        }
      } catch (error) {
        console.error("Error polling opponent progress:", error);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [polling, challenge, victoryTriggered]);

  // Check for victory condition
  useEffect(() => {
    if (userWinning && !victoryTriggered) {
      setVictoryTriggered(true);
      setPolling(false);
      completeChallenge(challenge.id, challenge.initiator_id);
      onVictory({ winner: "user", userProgress, opponentProgress });
    } else if (opponentWinning && !victoryTriggered) {
      setVictoryTriggered(true);
      setPolling(false);
      completeChallenge(challenge.id, challenge.opponent_id);
      onVictory({ winner: "opponent", userProgress, opponentProgress });
    }
  }, [userWinning, opponentWinning, challenge, victoryTriggered]);

  if (!opponentData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#EB7363" />
        <Text className="text-gray-600 mt-4">Waiting for opponent...</Text>
      </View>
    );
  }

  const goalUnit = challenge?.goal_type === "distance" ? "km" : "kcal";

  return (
    <View className="flex-1 bg-black">
      {/* Split Screen Container */}
      <View className="flex-1 flex-row">
        {/* User Side (Left - Green) */}
        <View className="flex-1 bg-green-600 border-r-4 border-white justify-between p-4">
          <View>
            <Text className="text-white text-lg font-bold">YOU</Text>
            <Text className="text-white text-xs opacity-70">Your Progress</Text>
          </View>

          <View className="items-center">
            {/* User Progress Indicator */}
            <Text className="text-white text-5xl font-bold">
              {userProgress.toFixed(1)}
            </Text>
            <Text className="text-white text-lg font-semibold mt-2">
              {goalUnit}
            </Text>

            {userLeading && !userWinning ? (
              <View className="mt-4 px-3 py-1 bg-yellow-300 rounded-full">
                <Text className="text-black font-bold text-sm">🔥 LEADING</Text>
              </View>
            ) : userWinning ? (
              <View className="mt-4 px-3 py-1 bg-yellow-300 rounded-full">
                <Text className="text-black font-bold text-sm">⭐ WINNING</Text>
              </View>
            ) : null}
          </View>

          <View className="bg-white bg-opacity-10 p-3 rounded-lg">
            <View className="mb-2">
              <Text className="text-white text-xs opacity-70">Speed</Text>
              <Text className="text-white text-lg font-semibold">
                {workoutData?.speed?.toFixed(1) || "0"} km/h
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-white text-xs opacity-70">Cadence</Text>
              <Text className="text-white text-lg font-semibold">
                {workoutData?.cadence?.toFixed(0) || "0"} rpm
              </Text>
            </View>
            <View>
              <Text className="text-white text-xs opacity-70">Heart Rate</Text>
              <Text className="text-white text-lg font-semibold">
                {workoutData?.heart_rate?.toFixed(0) || "0"} bpm
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 bg-red-600 justify-between p-4">
          <View>
            <Text className="text-white text-lg font-bold">OPPONENT</Text>
            <Text className="text-white text-xs opacity-70">
              {challenge?.opponent_name || "Friend"}
            </Text>
          </View>

          <View className="items-center">
            {/* Opponent Progress Indicator */}
            <Text className="text-white text-5xl font-bold">
              {opponentProgress?.toFixed(1) || "0"}
            </Text>
            <Text className="text-white text-lg font-semibold mt-2">
              {goalUnit}
            </Text>

            {!userLeading && !opponentWinning ? (
              <View className="mt-4 px-3 py-1 bg-red-300 rounded-full">
                <Text className="text-white font-bold text-sm">❌ BEHIND</Text>
              </View>
            ) : opponentWinning ? (
              <View className="mt-4 px-3 py-1 bg-yellow-300 rounded-full">
                <Text className="text-black font-bold text-sm">⭐ WINNING</Text>
              </View>
            ) : null}
          </View>

          <View className="bg-white bg-opacity-10 p-3 rounded-lg">
            <View className="mb-2">
              <Text className="text-white text-xs opacity-70">Speed</Text>
              <Text className="text-white text-lg font-semibold">
                {opponentData?.speed?.toFixed(1) || "0"} km/h
              </Text>
            </View>
            <View className="mb-2">
              <Text className="text-white text-xs opacity-70">Cadence</Text>
              <Text className="text-white text-lg font-semibold">
                {opponentData?.cadence?.toFixed(0) || "0"} rpm
              </Text>
            </View>
            <View>
              <Text className="text-white text-xs opacity-70">Heart Rate</Text>
              <Text className="text-white text-lg font-semibold">
                {opponentData?.heart_rate?.toFixed(0) || "0"} bpm
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white bg-opacity-5 p-4 flex-row justify-between items-center">
        <Text className="text-white font-semibold">
          Gap: {gapDistance} {goalUnit}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setPolling(false);
            onEnd();
          }}
          className="px-4 py-2 bg-white bg-opacity-20 rounded-lg"
        >
          <Text className="text-white font-semibold">End Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChallengeHUD;
