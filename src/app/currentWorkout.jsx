import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import CustomSafeArea from "@/components/CustomSafeArea";
import { ChallengeHUD } from '@/components/ChallengeHUD';
import { useChallenge } from '@/context/challengeContext';

const workout = () => {
  const { currentChallenge } = useChallenge();
  const [showVictory, setShowVictory] = useState(false);
  const [victoryResult, setVictoryResult] = useState(null);
  // Mock sensor data - replace with real data from your bike sensor
  const workoutData = {
    speed: 22,
    cadence: 90,
    distance: 4.3,
    calories: 180,
    heart_rate: 132,
    temperature: 26,
  };

  // If active challenge exists, show ChallengeHUD
  if (currentChallenge?.status === 'active') {
    return (
      <>
        <CustomSafeArea bgColour="black">
          <ChallengeHUD
            challenge={currentChallenge}
            workoutData={workoutData}
            onVictory={(result) => {
              setVictoryResult(result);
              setShowVictory(true);
            }}
          />
        </CustomSafeArea>

        {/* Victory Modal after challenge ends */}
        <VictoryModal
          visible={showVictory}
          result={victoryResult}
          opponent={{
            name: currentChallenge.opponent_name || 'Opponent',
            id: currentChallenge.opponent_id,
          }}
          onClose={() => setShowVictory(false)}
          onReturnHome={() => {
            setShowVictory(false);
            // Navigate back to home or challenge hub
            // navigation.navigate('home'); // or 'challengeHub'
          }}
        />
      </>
    );
  }

  // Normal workout view (no active challenge)
  return (
    <CustomSafeArea bgColour="black">
      <Text className="text-4xl text-white font-bold p-4">Workout Session</Text>
      <View className="h-52 p-4">
        <WebView
          source={{ uri: "https://www.youtube.com/embed/L_xrDAtykMI" }}
          className="flex-1"
          allowsFullscreenVideo
        />
      </View>
      <View className="p-4 gap-2">
        <Text className="text-white text-lg font-semibold">Speed: {workoutData.speed} km/h</Text>
        <Text className="text-white text-lg font-semibold">RPM: {workoutData.cadence}</Text>
        <Text className="text-white text-lg font-semibold">
          Distance: {workoutData.distance} km
        </Text>
        <Text className="text-white text-lg font-semibold">Incline: 5%</Text>
        <Text className="text-white text-lg font-semibold">
          Heart Rate: {workoutData.heart_rate} bpm
        </Text>
        <Text className="text-white text-lg font-semibold">
          Temperature: {workoutData.temperature} °C
        </Text>
      </View>
    </CustomSafeArea>
  );
};


export default workout;
