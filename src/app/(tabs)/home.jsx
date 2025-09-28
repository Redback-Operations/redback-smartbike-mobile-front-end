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
import { useThemeStyles } from "@/hooks/useThemeStyles";

// Move homeTiles inside component to access theme

const Home = () => {
  const { user } = useContext(AuthContext);
  const { inlineStyles, theme } = useThemeStyles();
  
  // Theme-aware home tiles with dynamic icon colors
  const homeTiles = [
    {
      title: "Connect",
      link: "",
    },
    {
      title: "Start workout",
      link: "",
      icon: <MaterialCommunityIcons name={"bike"} size={42} color={theme.accent} />,
    },
    {
      title: "Groups",
      link: "/groups",
      icon: <MaterialIcons name="groups" size={42} color={theme.accent} />,
    },
    {
      title: "Schedule",
      link: "/workoutSchedule",
      icon: <AntDesign name="calendar" size={42} color={theme.accent} />,
    },
    {
      title: "Friends",
      link: "/friendslist",
      icon: <MaterialIcons name="group" size={42} color={theme.accent} />,
    },
    {
      title: "Current Workout",
      link: "/currentWorkout",
      icon: <FontAwesome5 name="running" size={42} color={theme.success} />,
    },
  ];
  
  return (
    <View style={inlineStyles.background} className="flex-1">
      <CustomSafeArea applyTopInset={false}>
        <View className="px-4 flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center my-4">
          <WelcomeMessage name={user.username ? user.username : "Username"} />
          <Avatar size={50} />
        </View>

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
    </View>
  );
};

export default Home;
