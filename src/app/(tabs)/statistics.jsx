import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

const mockData = [
  { day: 'Mon', minutes: 22 },
  { day: 'Tue', minutes: 48 },
  { day: 'Wed', minutes: 26 },
  { day: 'Thu', minutes: 55 },
  { day: 'Fri', minutes: 99 },
  { day: 'Sat', minutes: 35 },
  { day: 'Sun', minutes: 20 },
];

const caloriesData = [
  { day: 'Mon', calories: 180 },
  { day: 'Tue', calories: 320 },
  { day: 'Wed', calories: 210 },
  { day: 'Thu', calories: 390 },
  { day: 'Fri', calories: 540 },
  { day: 'Sat', calories: 260 },
  { day: 'Sun', calories: 170 },
];

const workoutSummary = {
  totalDistance: '92.4 km',
  calories: 3250,
  avgHeartRate: '148 bpm',
  longestRide: '99 min',
};

const recentWorkouts = [
  { id: 1, title: 'Morning Ride', duration: '35 min', calories: '280 cal' },
  { id: 2, title: 'Hill Climb', duration: '42 min', calories: '360 cal' },
  { id: 3, title: 'Recovery Ride', duration: '20 min', calories: '140 cal' },
];

export default function RedbackWeeklySummary() {
  const [loading, setLoading] = useState(true);
  const [rideData, setRideData] = useState([]);
  const [selectedChart, setSelectedChart] = useState('Minutes');
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setRideData(mockData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const totalMinutes = rideData.reduce((sum, d) => sum + d.minutes, 0);
  const activeDays = rideData.filter((d) => d.minutes > 0).length;

  const bestDay =
    rideData.length > 0
      ? rideData.reduce((prev, current) =>
          current.minutes > prev.minutes ? current : prev
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
    selectedChart === 'Minutes' ? minutesLineData : caloriesLineData;

  const chartWidth = screenWidth - 60;
  const spacing = Math.max(35, chartWidth / currentLineData.length);

  const peakPoint =
    currentLineData.length > 0
      ? currentLineData.reduce((prev, current) =>
          current.value > prev.value ? current : prev
        )
      : null;

  const chartColor = selectedChart === 'Minutes' ? '#ff7f50' : '#FFD700';
  const tabActiveColor = selectedChart === 'Minutes' ? '#ff7f50' : '#FFD700';
  const tabActiveTextColor = selectedChart === 'Minutes' ? '#fff' : '#111';
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Weekly Ride Statistics</Text>
        <Text style={styles.subtitle}>
          Consistency builds strength—track your weekly wins!
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#ff4500" style={styles.loader} />
        ) : (
          <>
            <View style={styles.cardGrid}>
              <View style={styles.summaryCard}>
                <Text style={styles.cardLabel}>Distance</Text>
                <Text style={styles.cardValue}>{workoutSummary.totalDistance}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.cardLabel}>Calories</Text>
                <Text style={styles.cardValue}>{workoutSummary.calories}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.cardLabel}>Avg Heart Rate</Text>
                <Text style={styles.cardValue}>{workoutSummary.avgHeartRate}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.cardLabel}>Longest Ride</Text>
                <Text style={styles.cardValue}>{workoutSummary.longestRide}</Text>
              </View>
            </View>

            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Ride Trends</Text>

                <View style={styles.chartTabs}>
                  {['Minutes', 'Calories'].map((tab) => {
                    const isActive = selectedChart === tab;
                    return (
                      <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedChart(tab)}
                        style={[
                          styles.chartTab,
                          isActive && { backgroundColor: tabActiveColor },
                        ]}
                      >
                        <Text
                          style={[
                            styles.chartTabText,
                            isActive && { color: tabActiveTextColor },
                          ]}
                        >
                          {tab}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.chartInner}>
                <LineChart
                  data={currentLineData}
                  curved
                  thickness={3}
                  color={chartColor}
                  hideDataPoints={false}
                  dataPointsColor={chartColor}
                  dataPointsRadius={4}
                  yAxisColor="rgba(255,255,255,0.12)"
                  xAxisColor="rgba(255,255,255,0.12)"
                  rulesColor="rgba(255,255,255,0.08)"
                  yAxisTextStyle={{ color: '#888' }}
                  xAxisLabelTextStyle={{ color: '#aaa' }}
                  backgroundColor="#1a1a1a"
                  noOfSections={4}
                  maxValue={selectedChart === 'Minutes' ? 120 : 600}
                  width={chartWidth}
                  spacing={spacing}
                  initialSpacing={12}
                  endSpacing={12}
                  isAnimated
                  animateOnDataChange
                  hideOrigin
                  pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: chartColor,
                    pointerStripWidth: 1,
                    pointerColor: chartColor,
                    radius: 6,
                    pointerLabelWidth: 90,
                    pointerLabelHeight: 50,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: true,
                    pointerLabelComponent: (items) => {
                      const item = items[0];
                      return (
                        <View style={styles.pointerBox}>
                          <Text style={styles.pointerTitle}>{item.label}</Text>
                          <Text style={styles.pointerValue}>
                            {item.value} {selectedChart === 'Minutes' ? 'min' : 'cal'}
                          </Text>
                        </View>
                      );
                    },
                  }}
                />
              </View>

              <Text style={[styles.chartInsight, { color: chartColor }]}>
                {peakPoint
                  ? `Peak ${selectedChart.toLowerCase()} was ${peakPoint.value} on ${peakPoint.label}`
                  : 'No chart data available'}
              </Text>
            </View>

            <View style={styles.stats}>
              <Text style={styles.statText}>
                🕒 Total Ride Time:{' '}
                <Text style={styles.statHighlight}>{formattedTotalTime}</Text>
              </Text>
              <Text style={styles.statText}>
                📅 Active Days:{' '}
                <Text style={styles.statHighlight}>{activeDays} days</Text>
              </Text>
            </View>

            <View style={styles.motivationBox}>
              <Text style={styles.motivation}>
                {bestDay
                  ? `🔥 Your strongest day was ${bestDay.day} with ${bestDay.minutes} minutes!`
                  : '💪 Keep pushing to hit your weekly targets!'}
              </Text>
            </View>

            <View style={styles.recentBox}>
              <Text style={styles.recentTitle}>Recent Workouts</Text>

              {recentWorkouts.map((workout) => (
                <View key={workout.id} style={styles.workoutRow}>
                  <View>
                    <Text style={styles.workoutName}>{workout.title}</Text>
                    <Text style={styles.workoutDuration}>{workout.duration}</Text>
                  </View>

                  <Text style={styles.workoutCalories}>{workout.calories}</Text>
                </View>
              ))}
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
    backgroundColor: '#121212',
    paddingTop: StatusBar.currentHeight || 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loader: {
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff4500',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  cardLabel: {
    color: '#aaa',
    fontSize: 13,
  },
  cardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  chartCard: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  chartTabs: {
    flexDirection: 'row',
  },
  chartTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#2c2c2c',
    marginLeft: 8,
  },
  chartTabText: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '600',
  },
  chartInner: {
    marginTop: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartInsight: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 14,
  },
  stats: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 14,
  },
  statText: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 8,
  },
  statHighlight: {
    color: '#ff7f50',
    fontWeight: '700',
  },
  motivationBox: {
    marginTop: 30,
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 14,
    width: '100%',
  },
  motivation: {
    color: '#ff6347',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  recentBox: {
    marginTop: 24,
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 14,
    width: '100%',
  },
  recentTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  workoutName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  workoutDuration: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  workoutCalories: {
    color: '#ff7f50',
    fontWeight: '700',
    fontSize: 14,
  },
  pointerBox: {
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  pointerTitle: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  pointerValue: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});