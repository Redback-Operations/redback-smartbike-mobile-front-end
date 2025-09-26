import { View, SafeAreaView, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import Avatar from "@/components/Avatar";
import LastWeekActivity from "@/components/LastWeekActivity";
import WelcomeMessage from "@/components/WelcomeMessage";
import HomeScreenTile from "@/components/HomeScreenTile";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthContext } from "@/context/authContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomSafeArea from "@/components/CustomSafeArea";

// Motivational quotes
const quotes = [
  "Push harder than yesterday if you want a different tomorrow 🚴",
  "Don’t stop when you’re tired. Stop when you’re done 💪",
  "It never gets easier, you just get stronger 🌟",
  "Small steps every day lead to big results 🔥",
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];


const homeTiles = [
  {
    title: "Connect",
    link: "",
  },
  {
    title: "Start workout",
    link: "",
    icon: <MaterialCommunityIcons name={"bike"} size={60} color="#EB7363" />,
  },
  {
    title: "Groups",
    link: "/groups",
    icon: <MaterialIcons name="groups" size={42} color="#Eb7363" />,
  },
  {
    title: "Schedule",
    link: "/workoutSchedule",
    icon: <AntDesign name="calendar" size={42} color="#EB7363" />,
  },

  {
    title: "Friends",
    link: "/friendslist",
    icon: <MaterialIcons name="group" size={42} color="#EB7363" />,
  },

  {
    title: "Current Workout",
    link: "/currentWorkout",
    icon: <FontAwesome5 name="running" size={42} color="green" />,
  },
];

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <CustomSafeArea applyTopInset={false} bgColour="black">
      <View className="px-4 flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center my-4">
          <WelcomeMessage name={user.username ? user.username : "Welcome Rider"} />
          <Avatar size={50} />
        </View>
        {/* Motivational Quote at Top */}
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontStyle: "italic",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {randomQuote}
        </Text>


        {/* Last Week Activity */}
        <LastWeekActivity />

        <FlatList
          nestedScrollEnabled
          columnWrapperClassName="gap-4"
          contentContainerClassName="gap-4"
          numColumns={2}
          data={homeTiles}
          renderItem={({ item }) => <HomeScreenTile item={item} />}
        />
      </View>
    </CustomSafeArea>
  );
};

export default Home;
