import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import Avatar from "@/components/Avatar";
import LastWeekActivity from "@/components/LastWeekActivity";
import WelcomeMessage from "@/components/WelcomeMessage";
import CustomSafeArea from "@/components/CustomSafeArea";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthContext } from "@/context/authContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const quickStats = [
  { title: "Rides", value: "12" },
  { title: "Minutes", value: "245" },
  { title: "Calories", value: "1840" },
];

const moreFeatureRows = [
  [
    {
      title: "Calendar",
      subtitle: "View your planned workouts",
      link: "/calendar",
      size: "wide",
      icon: <AntDesign name="calendar" size={30} color="#EB7363" />,
    },
    {
      title: "Coach",
      subtitle: "Get training guidance",
      link: "/coach",
      size: "narrow",
      icon: <MaterialIcons name="psychology" size={30} color="#22C55E" />,
    },
  ],
  [
    {
      title: "Leaderboard",
      subtitle: "See who leads this week",
      link: "/leaderboard",
      size: "wide",
      icon: <MaterialIcons name="leaderboard" size={30} color="#EB7363" />,
    },
  ],
  [
    {
      title: "Groups",
      subtitle: "Join ride groups",
      link: "/groups",
      size: "wide",
      icon: <MaterialIcons name="groups" size={30} color="#EB7363" />,
    },
    {
      title: "Schedule",
      subtitle: "Plan your training",
      link: "/calendar",
      size: "narrow",
      icon: <AntDesign name="calendar" size={30} color="#EB7363" />,
    },
  ],
  [
    {
      title: "Device Status",
      subtitle: "Check bike, sensors and battery",
      link: "/deviceStatus",
      size: "wide",
      icon: (
        <MaterialCommunityIcons
          name="bike-fast"
          size={30}
          color="#EB7363"
        />
      ),
    },
    {
      title: "Friends",
      subtitle: "See your riders",
      link: "/friendslist",
      size: "narrow",
      icon: <MaterialIcons name="group" size={30} color="#EB7363" />,
    },
  ],
  [
    {
      title: "Current Workout",
      subtitle: "Continue your session",
      link: "/currentWorkout",
      size: "wide",
      icon: <FontAwesome5 name="running" size={30} color="#22C55E" />,
    },
  ],
];

const StatCard = ({ item }) => {
  return (
    <View className="flex-1 bg-[#15171C] rounded-2xl px-4 py-4">
      <Text className="text-gray-400 text-xs">{item.title}</Text>
      <Text className="text-white text-xl font-bold mt-1">{item.value}</Text>
    </View>
  );
};

const FeaturedCard = ({ title, subtitle, link, icon }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(link)}
      className="bg-[#15171C] rounded-2xl p-4 min-h-[120px] justify-between border border-[#1F2937]"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          <Text className="text-gray-400 text-sm mt-1">{subtitle}</Text>
        </View>
        {icon}
      </View>

      <View className="items-end">
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#EB7363" />
      </View>
    </TouchableOpacity>
  );
};

const MoreFeatureTile = ({ item }) => {
  const isWide = item.size === "wide";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(item.link)}
      className={`${isWide ? "flex-1 min-h-[94px]" : "w-[26%] min-h-[94px]"} bg-[#15171C] rounded-2xl p-4 justify-between border border-[#1F2937]`}
    >
      <View>{item.icon}</View>

      <View>
        <Text className="text-white font-semibold text-base">{item.title}</Text>
        <Text className="text-gray-400 text-xs mt-1">{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const username = user?.username ? user.username : "Username";

  return (
    <CustomSafeArea applyTopInset={false} bgColour="black">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center my-4">
          <View>
            <WelcomeMessage name={username} />
            <Text className="text-gray-400 mt-1">
              Ready for your next ride?
            </Text>
          </View>
          <Avatar size={50} />
        </View>

        <View className="mb-5">
          <Text className="text-white text-lg font-semibold mb-3">Overview</Text>
          <View className="flex-row gap-3">
            {quickStats.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </View>
        </View>

        <View className="mb-5">
          <LastWeekActivity />
        </View>

        <View className="mb-3">
          <Text className="text-white text-lg font-semibold">Main Actions</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Start quickly with the most used features
          </Text>
        </View>

        <View className="flex-row gap-3 mb-5">
          <View className="flex-1">
            <FeaturedCard
              title="Connect"
              subtitle="Ride with others and stay social"
              link="/connect"
              icon={
                <MaterialIcons name="people-alt" size={34} color="#EB7363" />
              }
            />
          </View>
          <View className="w-[28%]">
            <FeaturedCard
              title="Start workout"
              subtitle="Begin a new cycling session"
              link="/startworkout"
              icon={
                <MaterialCommunityIcons name="bike" size={34} color="#EB7363" />
              }
            />
          </View>
        </View>

        <View className="mb-3">
          <Text className="text-white text-lg font-semibold">More Features</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Access the rest of your training tools
          </Text>
        </View>

        <View className="gap-y-3">
          {moreFeatureRows.map((row, index) => (
            <View
              key={`row-${index}`}
              className="flex-row justify-between gap-3"
            >
              {row.map((item) => (
                <MoreFeatureTile key={item.title} item={item} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </CustomSafeArea>
  );
};

export default Home;
