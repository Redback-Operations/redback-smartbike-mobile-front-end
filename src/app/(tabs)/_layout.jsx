import { View, ActivityIndicator } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAuth } from "@/context/authContext";

const _layout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#EB7363" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#F27467",
        tabBarInactiveTintColor: "#747986",
        tabBarStyle: {
          backgroundColor: "#0D0F14",
          borderTopColor: "#20232B",
          borderTopWidth: 1,
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarItemStyle: {
          borderTopWidth: 0,
          borderRadius: 14,
          marginHorizontal: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? "#EB7363" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: "Stats",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="bar-graph"
              size={24}
              color={focused ? "#EB7363" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              size={24}
              color={focused ? "#EB7363" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              size={24}
              color={focused ? "#EB7363" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              size={24}
              color={focused ? "#EB7363" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="cog"
              size={24}
              color={focused ? "#EB7363" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
