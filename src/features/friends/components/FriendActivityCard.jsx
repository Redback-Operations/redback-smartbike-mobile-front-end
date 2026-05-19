import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FriendAvatar from "@/features/friends/components/FriendAvatar";
import { formatActivityDate } from "@/features/friends/data";

const FriendActivityCard = ({ friend, onPress }) => {
  const stats = [
    friend.latestWorkout.distance,
    friend.latestWorkout.duration,
    friend.latestWorkout.calories,
  ].filter(Boolean);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View
        style={[styles.accentBar, { backgroundColor: friend.accent }]}
      />

      <View style={styles.headerRow}>
        <FriendAvatar friend={friend} size={54} showRing />

        <View style={styles.headerText}>
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={styles.summary}>{friend.summary}</Text>
        </View>

        <View style={styles.chevronWrap}>
          <AntDesign name="right" size={14} color="#cbd5e1" />
        </View>
      </View>

      <View style={styles.workoutCard}>
        <Text style={styles.workoutTitle}>{friend.latestWorkout.title}</Text>
        <Text style={styles.workoutMeta}>
          {friend.latestWorkout.type} • {formatActivityDate(friend.latestWorkout.date)}
        </Text>
      </View>

      <View style={styles.statRow}>
        {stats.map((stat) => (
          <View key={stat} style={styles.statPill}>
            <Text style={styles.statText}>{stat}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.engagementPill}>
          <AntDesign name="heart" size={14} color={friend.accent} />
          <Text style={styles.engagementText}>{friend.engagement.likes} likes</Text>
        </View>

        <View style={styles.engagementPill}>
          <AntDesign name="message1" size={14} color={friend.accent} />
          <Text style={styles.engagementText}>
            {friend.engagement.comments} comments
          </Text>
        </View>

        <Text style={styles.tapHint}>Open dashboard</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0d0d0f",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1c1c21",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 5,
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    top: 18,
    left: 0,
    width: 4,
    height: 70,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    marginLeft: 14,
    marginRight: 12,
  },
  name: {
    color: "white",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 4,
  },
  summary: {
    color: "#a1a1aa",
    fontSize: 13,
    lineHeight: 19,
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#16161b",
    alignItems: "center",
    justifyContent: "center",
  },
  workoutCard: {
    marginTop: 16,
    backgroundColor: "#15151a",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#202027",
  },
  workoutTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  workoutMeta: {
    color: "#8b8b95",
    fontSize: 12,
  },
  statRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  statPill: {
    backgroundColor: "#19191e",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  statText: {
    color: "#f4f4f5",
    fontSize: 12,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
  },
  engagementPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#121216",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  engagementText: {
    color: "#d4d4d8",
    fontSize: 12,
    fontWeight: "600",
  },
  tapHint: {
    marginLeft: "auto",
    color: "#71717a",
    fontSize: 12,
  },
});

export default FriendActivityCard;
