import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import Avatar from "@/components/Avatar";
import LastWeekActivity from "@/components/LastWeekActivity";
import WelcomeMessage from "@/components/WelcomeMessage";
import HomeScreenTile from "@/components/HomeScreenTile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-4">
        <View className="flex-row justify-between items-center my-6">
          <WelcomeMessage name={"Jordan Anderson"} />
          <Avatar size={50} />
        </View>

        <LastWeekActivity />

        <View className="gap-4 mt-4">
          {/* Row 1 */}
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <HomeScreenTile tileTitle={"Connect"} />
            </View>

            {/* Add onPress to Start Workout */}
            <View className="flex-1">
              <HomeScreenTile
                onPress={() => router.push("/workout")} // ← navigation
                icon={
                  <MaterialCommunityIcons
                    name={"bike"}
                    size={52}
                    color="#EB7363"
                  />
                }
                tileTitle={"Start workout"}
              />
            </View>
          </View>

          {/* Row 2 */}
          <View className="flex-row justify-between gap-4">
            <View className="flex-1">
              <HomeScreenTile
                onPress={() => router.push("/workout")}
                tileTitle="Current Workout"
                icon={
                  <MaterialCommunityIcons
                    name="run"
                    size={52}
                    color="#68D391"
                  />
                }
              />
            </View>
            <View className="flex-1" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
