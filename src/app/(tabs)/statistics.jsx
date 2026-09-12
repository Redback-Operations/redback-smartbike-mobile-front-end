import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LineChart } from "react-native-gifted-charts";
import CustomSafeArea from "@/components/CustomSafeArea";

const mockData = [
  { day: "Mon", minutes: 22 },
  { day: "Tue", minutes: 48 },
  { day: "Wed", minutes: 26 },
  { day: "Thu", minutes: 55 },
  { day: "Fri", minutes: 99 },
  { day: "Sat", minutes: 35 },
  { day: "Sun", minutes: 20 },
];

const caloriesData = [
  { day: "Mon", calories: 180 },
  { day: "Tue", calories: 320 },
  { day: "Wed", calories: 210 },
  { day: "Thu", calories: 390 },
  { day: "Fri", calories: 540 },
  { day: "Sat", calories: 260 },
  { day: "Sun", calories: 170 },
];

const workoutSummary = {
  totalDistance: "92.4 km",
  calories: 3250,
  avgHeartRate: "148 bpm",
  longestRide: "99 min",
};

const recentWorkouts = [
  { id: 1, title: "Morning Ride", duration: "35 min", calories: "280 cal" },
  { id: 2, title: "Hill Climb", duration: "42 min", calories: "360 cal" },
  { id: 3, title: "Recovery Ride", duration: "20 min", calories: "140 cal" },
];

const summaryCards = [
  {
    label: "Distance",
    value: workoutSummary.totalDistance,
    icon: <FontAwesome5 name="biking" size={22} color="#EB7363" />,
  },
  {
    label: "Calories",
    value: String(workoutSummary.calories),
    icon: <MaterialCommunityIcons name="fire" size={24} color="#FFB347" />,
  },
  {
    label: "Avg Heart Rate",
    value: workoutSummary.avgHeartRate,
    icon: <MaterialIcons name="favorite" size={22} color="#FF6B6B" />,
  },
  {
    label: "Longest Ride",
    value: workoutSummary.longestRide,
    icon: <MaterialIcons name="timer" size={22} color="#7DD3FC" />,
  },
];

const StatsCard = ({ label, value, icon }) => {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricIconWrap}>{icon}</View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
};

const InfoCard = ({ label, value }) => {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
};

export default function StatisticsScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [rideData, setRideData] = useState([]);
  const [selectedChart, setSelectedChart] = useState("Minutes");

  useEffect(() => {
    const timer = setTimeout(() => {
      setRideData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const totalMinutes = rideData.reduce((sum, entry) => sum + entry.minutes, 0);
  const activeDays = rideData.filter((entry) => entry.minutes > 0).length;
  const bestDay =
    rideData.length > 0
      ? rideData.reduce((prev, current) =>
          current.minutes > prev.minutes ? current : prev,
        )
      : null;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTotalTime = `${hours}h ${minutes}m`;

  const minutesLineData = rideData.map((item) => ({
    value: item.minutes,
    label: item.day,
  }));

  const caloriesLineData = caloriesData.map((item) => ({
    value: item.calories,
    label: item.day,
  }));

  const currentLineData =
    selectedChart === "Minutes" ? minutesLineData : caloriesLineData;

  const chartWidth = screenWidth - 32 - 24 * 2;
  const pointCount = currentLineData.length;
  const usableSpacing =
    pointCount > 1 ? chartWidth / (pointCount - 1) : chartWidth;
  const spacing = Math.min(Math.max(usableSpacing, 35), 60);

  const peakPoint =
    currentLineData.length > 0
      ? currentLineData.reduce((prev, current) =>
          current.value > prev.value ? current : prev,
        )
      : null;

  const chartColor = selectedChart === "Minutes" ? "#EB7363" : "#FFB347";

  return (
    <CustomSafeArea applyTopInset={false} bgColour="#050505">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.title}>Track your stats</Text>
            <Text style={styles.subtitle}>
              Weekly SmartBike ride progress in the same Redback theme.
            </Text>
          </View>

          <View style={styles.headerIconButton}>
            <MaterialIcons name="insert-chart" size={22} color="#EB7363" />
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color="#EB7363" />
          </View>
        ) : (
          <>
            <View style={styles.heroCard}>
              <View style={styles.heroTop}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={styles.heroEyebrow}>Weekly Snapshot</Text>
                  <Text style={styles.heroTitle}>
                    {bestDay
                      ? `${bestDay.minutes} mins on ${bestDay.day}`
                      : "No rides logged yet"}
                  </Text>
                  <Text style={styles.heroCopy}>
                    Your strongest session this week sets the tone for the rest
                    of your training rhythm.
                  </Text>
                </View>

                <View style={styles.heroBadge}>
                  <MaterialCommunityIcons
                    name="bike-fast"
                    size={28}
                    color="#050505"
                  />
                </View>
              </View>

              <View style={styles.heroStats}>
                <InfoCard label="Ride time" value={formattedTotalTime} />
                <InfoCard label="Active days" value={`${activeDays} days`} />
                <InfoCard
                  label="Trend"
                  value={selectedChart === "Minutes" ? "Steady" : "Burn"}
                />
              </View>
            </View>

            <View style={styles.metricsGrid}>
              {summaryCards.map((card) => (
                <StatsCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  icon={card.icon}
                />
              ))}
            </View>

            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Ride Trends</Text>
                  <Text style={styles.sectionSubtitle}>
                    Compare weekly minutes and calories
                  </Text>
                </View>

                <View style={styles.chartTabs}>
                  {["Minutes", "Calories"].map((tab) => {
                    const isActive = selectedChart === tab;

                    return (
                      <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedChart(tab)}
                        style={[
                          styles.chartTab,
                          isActive && styles.chartTabActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.chartTabText,
                            isActive && styles.chartTabTextActive,
                          ]}
                        >
                          {tab}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.chartWrap}>
                <LineChart
                  data={currentLineData}
                  curved
                  thickness={3}
                  color={chartColor}
                  hideDataPoints={false}
                  dataPointsColor={chartColor}
                  dataPointsRadius={4}
                  yAxisColor="rgba(255,255,255,0.16)"
                  xAxisColor="rgba(255,255,255,0.16)"
                  rulesColor="rgba(255,255,255,0.12)"
                  yAxisTextStyle={{ color: "#8b8b95", fontWeight: "600" }}
                  xAxisLabelTextStyle={{ color: "#8b8b95", fontWeight: "600" }}
                  backgroundColor="transparent"
                  noOfSections={4}
                  maxValue={selectedChart === "Minutes" ? 120 : 600}
                  width={chartWidth}
                  spacing={spacing}
                  initialSpacing={18}
                  endSpacing={10}
                  isAnimated
                  animateOnDataChange
                  hideOrigin
                  pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: chartColor,
                    pointerStripWidth: 1,
                    pointerColor: chartColor,
                    radius: 6,
                    pointerLabelWidth: 96,
                    pointerLabelHeight: 54,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: true,
                    pointerLabelComponent: (items) => {
                      const item = items?.[0];

                      if (!item) {
                        return null;
                      }

                      return (
                        <View style={styles.pointerBox}>
                          <Text style={styles.pointerTitle}>{item.label}</Text>
                          <Text style={styles.pointerValue}>
                            {item.value}{" "}
                            {selectedChart === "Minutes" ? "min" : "cal"}
                          </Text>
                        </View>
                      );
                    },
                  }}
                />
              </View>

              <Text style={styles.chartInsight}>
                {peakPoint
                  ? `Peak ${selectedChart.toLowerCase()} was ${peakPoint.value} on ${peakPoint.label}.`
                  : "No chart data available."}
              </Text>
            </View>

            <View style={styles.motivationCard}>
              <Text style={styles.motivationEyebrow}>Coach Note</Text>
              <Text style={styles.motivationText}>
                {bestDay
                  ? `Your strongest day was ${bestDay.day} with ${bestDay.minutes} minutes. Keep that same pace rolling into your next session.`
                  : "Keep riding consistently to unlock a clearer weekly pattern."}
              </Text>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Recent Workouts</Text>
              <Text style={styles.sectionSubtitle}>
                Your latest sessions at a glance
              </Text>

              <View style={styles.workoutList}>
                {recentWorkouts.map((workout, index) => (
                  <View
                    key={workout.id}
                    style={[
                      styles.workoutRow,
                      index === recentWorkouts.length - 1 &&
                        styles.workoutRowLast,
                    ]}
                  >
                    <View style={styles.workoutLeft}>
                      <View style={styles.workoutIconWrap}>
                        <MaterialCommunityIcons
                          name="bike"
                          size={18}
                          color="#EB7363"
                        />
                      </View>
                      <View>
                        <Text style={styles.workoutName}>{workout.title}</Text>
                        <Text style={styles.workoutDuration}>
                          {workout.duration}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.workoutCalories}>{workout.calories}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
    backgroundColor: "#050505",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  headerCopy: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingState: {
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    backgroundColor: "#101014",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1c1c22",
    padding: 20,
    marginBottom: 14,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  heroEyebrow: {
    color: "#FCA5A5",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  heroCopy: {
    color: "#A1A1AA",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  heroBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#EB7363",
    alignItems: "center",
    justifyContent: "center",
  },
  heroStats: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#18191F",
    borderRadius: 18,
    padding: 12,
  },
  infoLabel: {
    color: "#8b8b95",
    fontSize: 12,
  },
  infoValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  metricCard: {
    width: "48.3%",
    minHeight: 132,
    backgroundColor: "#101014",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#1c1c22",
    padding: 16,
    marginBottom: 14,
    justifyContent: "space-between",
  },
  metricIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#18191F",
    alignItems: "center",
    justifyContent: "center",
  },
  metricLabel: {
    color: "#8b8b95",
    fontSize: 13,
    marginTop: 14,
  },
  metricValue: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
  sectionCard: {
    backgroundColor: "#101014",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1c1c22",
    padding: 20,
    marginBottom: 14,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: "#A1A1AA",
    fontSize: 13,
    marginTop: 4,
  },
  chartTabs: {
    flexDirection: "row",
    marginTop: 14,
  },
  chartTab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#18191F",
    marginRight: 8,
  },
  chartTabActive: {
    backgroundColor: "#EB7363",
  },
  chartTabText: {
    color: "#A1A1AA",
    fontSize: 13,
    fontWeight: "700",
  },
  chartTabTextActive: {
    color: "white",
  },
  chartWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  chartInsight: {
    color: "#D4D4D8",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },
  motivationCard: {
    backgroundColor: "#15171C",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 18,
    marginBottom: 14,
  },
  motivationEyebrow: {
    color: "#FCA5A5",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  motivationText: {
    color: "white",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  workoutList: {
    marginTop: 16,
  },
  workoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },
  workoutRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  workoutLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  workoutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#18191F",
    alignItems: "center",
    justifyContent: "center",
  },
  workoutName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  workoutDuration: {
    color: "#8b8b95",
    fontSize: 13,
    marginTop: 4,
  },
  workoutCalories: {
    color: "#EB7363",
    fontSize: 13,
    fontWeight: "700",
  },
  pointerBox: {
    backgroundColor: "#18191F",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a30",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  pointerTitle: {
    color: "#8b8b95",
    fontSize: 11,
    fontWeight: "600",
  },
  pointerValue: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
});
