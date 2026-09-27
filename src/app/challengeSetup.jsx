import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ChallengeFriendSelector from "@/components/ChallengeFriendSelector";
import ChallengeConfigurator from "@/components/ChallengeConfigurator";

const ChallengeSetup = () => {
  const router = useRouter();
  const [step, setStep] = useState("select"); // 'select' or 'configure'
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setStep("configure");
  };

  const handleChallengeSuccess = (challenge) => {
    Alert.alert("Success", "Challenge created successfully!", [
      {
        text: "OK",
        onPress: () => router.replace("/challengeHub"),
      },
    ]);
  };

  const handleChallengeError = (error) => {
    console.error("Challenge error:", error);
  };

  const handleBack = () => {
    if (step === "configure") {
      setStep("select");
      setSelectedFriend(null);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <View>
          {/* Step indicator */}
          <View className="flex-row gap-2">
            <View
              className={`h-1 w-8 rounded-full ${
                step === "select" ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
            <View
              className={`h-1 w-8 rounded-full ${
                step === "configure" ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          </View>
        </View>
        <View className="w-7" /> {/* Spacer for alignment */}
      </View>

      {/* Content */}
      {step === "select" ? (
        <ChallengeFriendSelector onSelect={handleFriendSelect} />
      ) : (
        <ScrollView className="flex-1">
          <ChallengeConfigurator
            selectedFriend={selectedFriend}
            onSuccess={handleChallengeSuccess}
            onError={handleChallengeError}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ChallengeSetup;
