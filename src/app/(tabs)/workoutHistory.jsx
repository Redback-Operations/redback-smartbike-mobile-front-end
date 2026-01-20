import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CustomSafeArea from "@/components/CustomSafeArea";

// Mock history data (replace later with real completed workouts)
const initialHistory = [
  {
    id: "1",
    title: "Cycling",
    date: "Jan 20, 2026",
    durationMin: 32,
    calories: 245,
    note: "Good pace, steady ride.",
  },
  {
    id: "2",
    title: "HIIT",
    date: "Jan 18, 2026",
    durationMin: 18,
    calories: 210,
    note: "Short but intense.",
  },
  {
    id: "3",
    title: "Yoga",
    date: "Jan 16, 2026",
    durationMin: 25,
    calories: 90,
    note: "Recovery session.",
  },
];

export default function WorkoutHistory() {
  const [history, setHistory] = useState(initialHistory);
  const [filter, setFilter] = useState("All"); // All | Recent | Long

  // Simple filters (no backend, safe)
  const filteredHistory = useMemo(() => {
    if (filter === "All") return history;
    if (filter === "Recent") return history.slice(0, 5);
    if (filter === "Long") return history.filter((h) => h.durationMin >= 30);
    return history;
  }, [filter, history]);

  const totalWorkouts = history.length;
  const totalMinutes = history.reduce((sum, h) => sum + h.durationMin, 0);
  const avgMinutes = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <Text style={styles.title}>My Workout History</Text>
        <Text style={styles.subtitle}>
          Your recent sessions and progress summary.
        </Text>

        {/* Summary cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Workouts</Text>
            <Text style={styles.summaryValue}>{totalWorkouts}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Avg Duration</Text>
            <Text style={styles.summaryValue}>{avgMinutes} min</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filterRow}>
          {["All", "Recent", "Long"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setFilter(t)}
              style={[
                styles.filterChip,
                filter === t ? styles.filterChipActive : styles.filterChipInactive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === t ? styles.filterTextActive : styles.filterTextInactive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty state */}
        {filteredHistory.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No workouts yet</Text>
            <Text style={styles.emptyText}>
              Start a workout to see your history here.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredHistory}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.workoutTitle}>{item.title}</Text>
                  <Text style={styles.workoutDate}>{item.date}</Text>
                </View>

                <Text style={styles.workoutMeta}>
                  ⏱ {item.durationMin} min • 🔥 {item.calories} kcal
                </Text>

                {!!item.note && <Text style={styles.note}>“{item.note}”</Text>}
              </View>
            )}
          />
        )}
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 6, color: "#111" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 14 },

  summaryRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  summaryCard: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 14,
  },
  summaryLabel: { fontSize: 12, color: "#555", marginBottom: 6 },
  summaryValue: { fontSize: 20, fontWeight: "800", color: "#111" },

  filterRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterChipActive: { backgroundColor: "#111", borderColor: "#111" },
  filterChipInactive: { backgroundColor: "white", borderColor: "#ddd" },
  filterText: { fontSize: 12, fontWeight: "700" },
  filterTextActive: { color: "white" },
  filterTextInactive: { color: "#333" },

  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  workoutTitle: { fontSize: 16, fontWeight: "800", color: "#111" },
  workoutDate: { fontSize: 12, color: "#777", marginTop: 2 },
  workoutMeta: { marginTop: 8, fontSize: 13, color: "#444" },
  note: { marginTop: 8, fontSize: 12, color: "#666", fontStyle: "italic" },

  emptyBox: {
    marginTop: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
  },
  emptyTitle: { fontSize: 16, fontWeight: "800", marginBottom: 6, color: "#111" },
  emptyText: { fontSize: 13, color: "#666", textAlign: "center" },
});
