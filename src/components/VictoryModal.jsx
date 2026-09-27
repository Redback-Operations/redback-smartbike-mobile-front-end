import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const VictoryModal = ({ visible, result, onViewDetails, onBackHome }) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  if (!result) return null;

  const isVictory = result.winner === "user";
  const goalUnit = result.goalType === "distance" ? "km" : "kcal";

  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <View className="flex-1 bg-black bg-opacity-70 justify-center items-center">
        <Animated.View
          style={[
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
          className="bg-white rounded-3xl p-8 items-center w-11/12"
        >
          {/* Trophy or Defeat Icon */}
          <View className="mb-6">
            {isVictory ? (
              <Text className="text-7xl">🏆</Text>
            ) : (
              <Text className="text-7xl">😔</Text>
            )}
          </View>

          {/* Title */}
          <Text
            className={`text-4xl font-bold mb-2 ${
              isVictory ? "text-green-600" : "text-gray-600"
            }`}
            testID="victory-title"
          >
            {isVictory ? "You Won!" : "Tough Luck!"}
          </Text>

          {/* Subtitle */}
          <Text className="text-gray-600 text-lg mb-8 text-center">
            {isVictory
              ? "Great job! You dominated the challenge!"
              : "You gave it a great effort."}
          </Text>

          {/* Challenge Summary Card */}
          <View
            className="w-full bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200"
            testID="challenge-summary"
          >
            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1">
                <Text className="text-gray-600 text-sm font-semibold mb-1">
                  You
                </Text>
                <Text className="text-2xl font-bold text-green-600">
                  {result.userProgress?.toFixed(1) || "0"}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">{goalUnit}</Text>
              </View>

              <View className="items-center flex-1">
                <Text className="text-gray-600 text-sm font-semibold mb-1">
                  Opponent
                </Text>
                <Text
                  className={`text-2xl font-bold ${
                    isVictory ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {result.opponentProgress?.toFixed(1) || "0"}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">{goalUnit}</Text>
              </View>
            </View>

            {/* Status Badge */}
            <View
              className={`flex-row items-center justify-center py-2 rounded-lg ${
                isVictory ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isVictory ? (
                <MaterialIcons name="check-circle" size={18} color="#22c55e" />
              ) : (
                <MaterialIcons name="cancel" size={18} color="#ef4444" />
              )}
              <Text
                className={`ml-2 font-semibold ${
                  isVictory ? "text-green-700" : "text-red-700"
                }`}
              >
                {isVictory ? "Victory" : "Defeat"}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="w-full gap-3">
            <TouchableOpacity
              onPress={onViewDetails}
              className="bg-blue-500 py-4 rounded-lg items-center"
              testID="view-details-btn"
            >
              <Text className="text-white text-lg font-semibold">
                View Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onBackHome}
              className="bg-gray-200 py-4 rounded-lg items-center"
              testID="back-home-btn"
            >
              <Text className="text-gray-900 text-lg font-semibold">
                Back Home
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default VictoryModal;
