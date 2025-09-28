import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useThemeStyles } from '@/hooks/useThemeStyles';

const screenWidth = Dimensions.get('window').width;

// 👉 Replace this with the EXACT values from your uploaded workout summary
const mockData = [
  { day: 'Mon', minutes: 22 },
  { day: 'Tue', minutes: 48 },
  { day: 'Wed', minutes: 26 },
  { day: 'Thu', minutes: 55 },
  { day: 'Fri', minutes: 99 },
  { day: 'Sat', minutes: 35 },
  { day: 'Sun', minutes: 20 },
];

// Workout summary stats (still static for distance, calories, HR)
const workoutSummary = {
  totalDistance: '92.4 km',
  calories: 3250,
  avgHeartRate: '148 bpm',
};

export default function RedbackWeeklySummary() {
  const [loading, setLoading] = useState(true);
  const [rideData, setRideData] = useState([]);
  const { theme, isDarkMode } = useThemeStyles();

  useEffect(() => {
    setTimeout(() => {
      setRideData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const totalMinutes = rideData.reduce((sum, d) => sum + d.minutes, 0);
  const activeDays = rideData.filter(d => d.minutes > 0).length;

  // Convert minutes → hours + minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTotalTime = `${hours}h ${minutes}m`;

  const chartData = {
    labels: rideData.map(d => d.day),
    datasets: [
      {
        data: rideData.map(d => d.minutes),
      },
    ],
  };

  const customYLabels = ['0.00', '24.75', '49.50', '74.25', '99.00'];

  // Create theme-aware chart config
  const chartConfig = {
    backgroundGradientFrom: theme.background,
    backgroundGradientTo: theme.surface,
    decimalPlaces: 2,
    color: (opacity = 1) => isDarkMode ? `rgba(168, 139, 250, ${opacity})` : `rgba(235, 115, 99, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(249, 250, 251, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: isDarkMode ? 'rgba(249,250,251,0.1)' : 'rgba(31,41,55,0.1)',
    },
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.accent }]}>📊 Weekly Ride Statistics</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Consistency builds strength—track your weekly wins!
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={theme.accent} style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={{
              backgroundColor: theme.card,
              borderRadius: 16,
              padding: 8,
              marginVertical: 8,
              borderWidth: 1,
              borderColor: theme.border,
            }}>
              <BarChart
                data={chartData}
                width={screenWidth - 46} // Account for container padding
                height={260}
                chartConfig={chartConfig}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
                withInnerLines
                withHorizontalLabels
                segments={4} // 4 intervals -> 5 labels
                formatYLabel={(val) => {
                  const index = Math.round((val / 99) * 4); // map to 0-4
                  return customYLabels[index] || '';
                }}
              />
            </View>

            <View style={[styles.stats, { backgroundColor: theme.surface }]}>
              <Text style={[styles.statText, { color: theme.textSecondary }]}>
                🕒 Total Minutes: <Text style={[styles.statHighlight, { color: theme.accent }]}>{totalMinutes} min</Text>
              </Text>
              <Text style={[styles.statText, { color: theme.textSecondary }]}>
                📅 Active Days: <Text style={[styles.statHighlight, { color: theme.accent }]}>{activeDays} days</Text>
              </Text>
            </View>


            <View style={[styles.motivationBox, { backgroundColor: theme.card }]}>
              <Text style={[styles.motivation, { color: theme.accent }]}>
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
    paddingTop: StatusBar.currentHeight || 20,
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 12,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 0,
  },
  stats: {
    marginTop: 20,
    width: '100%',
    padding: 16,
    borderRadius: 14,
  },
  statText: {
    fontSize: 16,
    marginBottom: 8,
  },
  statHighlight: {
    fontWeight: '700',
  },
  motivationBox: {
    marginTop: 30,
    padding: 16,
    borderRadius: 14,
    width: '100%',
  },
  motivation: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});




