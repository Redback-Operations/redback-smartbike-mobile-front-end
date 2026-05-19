import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FriendWeeklyBars = ({ weeklyActivity, accent }) => {
  const maxMinutes = Math.max(...weeklyActivity.map((day) => day.minutes), 1);

  return (
    <View style={styles.container}>
      {weeklyActivity.map((day) => {
        const barHeight = Math.max((day.minutes / maxMinutes) * 88, 8);

        return (
          <View key={day.id} style={styles.barGroup}>
            <Text style={styles.minutes}>{day.minutes}</Text>
            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                    backgroundColor: day.minutes ? accent : "#27272a",
                  },
                ]}
              />
            </View>
            <Text style={styles.day}>{day.day}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 10,
    marginTop: 14,
  },
  barGroup: {
    flex: 1,
    alignItems: "center",
  },
  minutes: {
    color: "#71717a",
    fontSize: 11,
    marginBottom: 8,
  },
  track: {
    width: "100%",
    height: 88,
    borderRadius: 999,
    backgroundColor: "#141418",
    justifyContent: "flex-end",
    padding: 4,
  },
  bar: {
    width: "100%",
    borderRadius: 999,
  },
  day: {
    color: "#d4d4d8",
    fontSize: 11,
    marginTop: 8,
  },
});

export default FriendWeeklyBars;
