import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#121212",
  backgroundGradientTo: "#1a1a1a",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: "rgba(255,255,255,0.1)",
  },
};

// Mock weekly data
const mockData = [
  { day: "Mon", minutes: 22 },
  { day: "Tue", minutes: 48 },
  { day: "Wed", minutes: 26 },
  { day: "Thu", minutes: 55 },
  { day: "Fri", minutes: 99 },
  { day: "Sat", minutes: 35 },
  { day: "Sun", minutes: 20 },
];

// Workout summary stats (static for now)
const workoutSummary = {
  totalDistance: "92.4 km",
  calories: 3250,
  avgHeartRate: "148 bpm",
};

export default function RedbackWeeklySummary() {
  const [loading, setLoading] = useState(true);
  const [rideData, setRideData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setRideData(mockData);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }, 1000);
  }, []);

  const totalMinutes = rideData.reduce((sum, d) => sum + d.minutes, 0);
  const activeDays = rideData.filter((d) => d.minutes > 0).length;

  // Total sessions = days with minutes > 0 (same as activeDays)
  const totalSessions = activeDays;

  // Average session length
  const avgSessionMin =
    totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  // Convert minutes → hours + minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTotalTime = `${hours}h ${minutes}m`;

  // Best day calculation
  const bestDay =
    rideData.length > 0
      ? rideData.reduce((prev, current) =>
          current.minutes > prev.minutes ? current : prev
        )
      : { day: "-", minutes: 0 };

  // Weekly comparison (mock baseline)
  const lastWeekMinutes = 250; // mock value
  const diffMinutes = totalMinutes - lastWeekMinutes;
  const diffPercent =
    lastWeekMinutes > 0
      ? Math.round((Math.abs(diffMinutes) / lastWeekMinutes) * 100)
      : 0;

  const comparisonLabel =
    diffMinutes === 0
      ? "No change vs last week"
      : diffMinutes > 0
      ? `⬆️ +${diffMinutes} min (${diffPercent}%) vs last week`
      : `⬇️ ${diffMinutes} min (${diffPercent}%) vs last week`;

  const chartData = useMemo(
    () => ({
      labels: rideData.map((d) => d.day),
      datasets: [
        {
          data: rideData.map((d) => d.minutes),
        },
      ],
    }),
    [rideData]
  );

  const customYLabels = ["0.00", "24.75", "49.50", "74.25", "99.00"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Weekly Ride Statistics</Text>
        <Text style={styles.subtitle}>
          Consistency builds strength—track your weekly wins!
        </Text>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#ff4500" />
            <Text style={{ color: "#fff", marginTop: 12 }}>
              Crunching your rides...
            </Text>
          </View>
        ) : (
          <>
            <BarChart
              data={chartData}
              width={screenWidth - 30}
              height={260}
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
              withInnerLines
              withHorizontalLabels
              segments={4}
              formatYLabel={(val) => {
                const index = Math.round((val / 99) * 4);
                return customYLabels[index] || "";
              }}
            />

            {/* Core stats */}
            <View style={styles.stats}>
              <Text style={styles.statText}>
                🕒 Total Time:{" "}
                <Text style={styles.statHighlight}>
                  {formattedTotalTime} ({totalMinutes} min)
                </Text>
              </Text>

              <Text style={styles.statText}>
                ✅ Total Sessions:{" "}
                <Text style={styles.statHighlight}>{totalSessions}</Text>
              </Text>

              <Text style={styles.statText}>
                ⏱ Avg Session:{" "}
                <Text style={styles.statHighlight}>{avgSessionMin} min</Text>
              </Text>

              <Text style={styles.statText}>
                📅 Active Days:{" "}
                <Text style={styles.statHighlight}>{activeDays} days</Text>
              </Text>

              <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
            </View>

            {/* Workout Summary */}
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>
                🚴 Total Distance:{" "}
                <Text style={styles.summaryHighlight}>
                  {workoutSummary.totalDistance}
                </Text>
              </Text>
              <Text style={styles.summaryText}>
                🔥 Calories Burned:{" "}
                <Text style={styles.summaryHighlight}>
                  {workoutSummary.calories}
                </Text>
              </Text>
              <Text style={styles.summaryText}>
                ❤️ Avg Heart Rate:{" "}
                <Text style={styles.summaryHighlight}>
                  {workoutSummary.avgHeartRate}
                </Text>
              </Text>
            </View>

            {/* Best Day */}
            <View style={styles.bestDayBox}>
              <Text style={styles.bestDayText}>
                🏆 Best Day: {bestDay.day} ({bestDay.minutes} min)
              </Text>
            </View>

            {/* Weekly Comparison */}
            <Text style={styles.trendText}>{comparisonLabel}</Text>

            {/* Motivation */}
            <View style={styles.motivationBox}>
              <Text style={styles.motivation}>
                {activeDays >= 5
                  ? "🔥 Pedal power at max! Your streak is unstoppable!"
                  : "💪 Keep pushing to hit your weekly targets!"}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: StatusBar.currentHeight || 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 40,
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff4500",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 20,
  },
  chart: {
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#ff4500",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginVertical: 8,
  },
  stats: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 14,
  },
  statText: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 8,
  },
  statHighlight: {
    color: "#ff7f50",
    fontWeight: "700",
  },
  lastUpdated: {
    marginTop: 6,
    fontSize: 12,
    color: "#999",
  },
  summaryBox: {
    marginTop: 20,
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 14,
    width: "100%",
  },
  summaryText: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 6,
  },
  summaryHighlight: {
    color: "#ff7f50",
    fontWeight: "700",
  },
  bestDayBox: {
    marginTop: 20,
    backgroundColor: "#262626",
    padding: 14,
    borderRadius: 12,
    width: "100%",
  },
  bestDayText: {
    color: "#ffa07a",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  trendText: {
    marginTop: 10,
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
  },
  motivationBox: {
    marginTop: 30,
    backgroundColor: "#2a2a2a",
    padding: 16,
    borderRadius: 14,
    width: "100%",
  },
  motivation: {
    color: "#ff6347",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
