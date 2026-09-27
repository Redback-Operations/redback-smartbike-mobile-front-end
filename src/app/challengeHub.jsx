import React from "react";
import { SafeAreaView } from "react-native";
import ChallengeHub from "@/components/ChallengeHub";

const ChallengeHubScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ChallengeHub />
    </SafeAreaView>
  );
};

export default ChallengeHubScreen;
