<<<<<<< HEAD
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
=======
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
>>>>>>> upstream/main
import CustomSafeArea from "@/components/CustomSafeArea";
import FriendActivityCard from "@/features/friends/components/FriendActivityCard";
import {
  friends,
  getDashboardSummary,
  getWeeklyMinutes,
} from "@/features/friends/data";

const Friends = () => {
  const summary = getDashboardSummary();
  const mostActiveFriend = [...friends].sort(
    (a, b) => getWeeklyMinutes(b) - getWeeklyMinutes(a)
  )[0];

  return (
<<<<<<< HEAD
    <CustomSafeArea applyTopInset={false} className="flex-1 bg-white">
      {/* Page header */}
      <View className="flex-row justify-between items-center m-2 mt-8">
        <Text className="text-brand-purple my-6 font-bold text-4xl">
          Friends Activity
        </Text>
        <TouchableOpacity onPress={() => router.push("/chat")}>
          <FontAwesome6 name="comments" size={24} color="black" />
        </TouchableOpacity>
      </View>
=======
    <>
      <Stack.Screen options={{ headerShown: false }} />
>>>>>>> upstream/main

      <CustomSafeArea bgColour="#050505">
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.heading}>Friends Activity</Text>
              <Text style={styles.subheading}>
                Track recent rides, shared progress, and weekly momentum
              </Text>
            </View>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push("/friendslist")}
            >
              <AntDesign name="team" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryPanel}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Friends</Text>
              <Text style={styles.summaryValue}>{summary.totalFriends}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Weekly mins</Text>
              <Text style={styles.summaryValue}>{summary.totalWeeklyMinutes}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Engagement</Text>
              <Text style={styles.summaryValue}>{summary.totalLikes}</Text>
            </View>
          </View>

          {mostActiveFriend ? (
            <View style={styles.highlightCard}>
              <View style={styles.highlightTop}>
                <Text style={styles.highlightEyebrow}>Most active this week</Text>
                <Text style={styles.highlightName}>{mostActiveFriend.name}</Text>
              </View>
              <Text style={styles.highlightCopy}>
                {mostActiveFriend.latestWorkout.title} • {getWeeklyMinutes(mostActiveFriend)} minutes this week
              </Text>
            </View>
          ) : null}

          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FriendActivityCard
                friend={item}
                onPress={() => router.push(`/friendsdetails/${item.id}`)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={<View style={{ height: 24 }} />}
          />
        </View>
      </CustomSafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  heading: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
  subheading: {
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 4,
    maxWidth: 240,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryPanel: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#101014",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1c1c22",
    padding: 14,
  },
  summaryLabel: {
    color: "#8b8b95",
    fontSize: 12,
    marginBottom: 8,
  },
  summaryValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  highlightCard: {
    backgroundColor: "#101014",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1c1c22",
    padding: 16,
    marginBottom: 16,
  },
  highlightTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  highlightEyebrow: {
    color: "#fca5a5",
    fontSize: 12,
    fontWeight: "600",
  },
  highlightName: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  highlightCopy: {
    color: "#a1a1aa",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 10,
  },
});

export default Friends;
