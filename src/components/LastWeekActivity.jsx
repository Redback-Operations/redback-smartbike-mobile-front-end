import { View } from "react-native";
import React, { useState } from "react";
// import { BarChart, yAxisSides } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "@/context/ThemeContext";

const LastWeekActivity = () => {
  const { isDarkMode } = useTheme();
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setChartWidth(width);
    setChartHeight(height);
  };

  // Chart configuration - only change background for theme
  const chartConfig = {
    backgroundColor: isDarkMode ? "#1C1C1E" : "#F8F9FA",
    backgroundGradientFrom: isDarkMode ? "#1C1C1E" : "#F8F9FA",
    backgroundGradientTo: isDarkMode ? "#1C1C1E" : "#F8F9FA",
    color: (opacity = 1) => `gray`, // Keep original working color
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20],
        color: (opacity = 1) => `#EB7363`,
      },
    ],
  };

  const chartBackgroundColor = isDarkMode ? "#1C1C1E" : "#F8F9FA";

  return (
    <View onLayout={handleLayout} className={`overflow-hidden`}>
      {/* Chart container with theme background */}
      <View style={{ 
        backgroundColor: chartBackgroundColor,
        borderRadius: 16,
        padding: 0,
        marginVertical: 10,
        marginHorizontal: 0,
      }}>
        <LineChart
          bezier
          withShadow
          withDots={false}
          fromZero
          data={data}
          width={chartWidth}
          height={200}
          chartConfig={chartConfig}
          withHorizontalLabels
          flatColor={true}
          withCustomBarColorFromData
          withInnerLines
          style={{
            borderRadius: 16,
            padding: 0,
          }}
        />
      </View>
    </View>
  );
};

export default LastWeekActivity;
