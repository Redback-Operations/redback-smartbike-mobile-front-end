import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import Avatar from "@/components/Avatar";
import LastWeekActivity from "@/components/LastWeekActivity";
import WelcomeMessage from "@/components/WelcomeMessage";
import HomeScreenTile from "@/components/HomeScreenTile";
import FriendsList from "@/components/friendslist"; 
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-4">
        <View className="flex-row justify-between items-center my-6">
          <WelcomeMessage name={"Jordan Anderson"} />
          <Avatar size={50} />
        </View>

        <LastWeekActivity />

        <View className="gap-4">
          <View className="flex gap-4 justify-between flex-row">
            <View className="flex-1">
              <HomeScreenTile tileTitle={"Connect"} />
            </View>
            <View className="flex-1">
              <HomeScreenTile
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
        </View>

        
      </View>
    </SafeAreaView>
  );
};

export default Home;
