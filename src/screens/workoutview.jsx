import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const WorkoutView = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Placeholder for video */}
      <View style={styles.videoContainer}>
        <Text style={styles.videoPlaceholder}>[ Workout Video Here ]</Text>
      </View>

      {/* Workout Stats */}
      <View style={styles.stats}>
        {[
          { label: "Speed", value: "25 km/h" },
          { label: "RPM", value: "85" },
          { label: "Distance", value: "6.2 km" },
          { label: "Incline", value: "3%" },
          { label: "Heart Rate", value: "130 bpm" },
          { label: "Temp", value: "28 °C" },
        ].map((item, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  videoContainer: {
    height: 220,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 12,
  },
  videoPlaceholder: {
    color: "#999",
    fontSize: 16,
  },
  stats: {
    paddingHorizontal: 20,
    gap: 15,
  },
  statBox: {
    padding: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  statLabel: {
    fontSize: 16,
    color: "#888",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
});

export default WorkoutView;
