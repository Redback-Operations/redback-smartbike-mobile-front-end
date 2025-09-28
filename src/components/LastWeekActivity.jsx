import { View } from "react-native";
import React, { useState } from "react";
// import { BarChart, yAxisSides } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const LastWeekActivity = () => {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const { theme, isDarkMode } = useThemeStyles();

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setChartWidth(width);
    setChartHeight(height);
  };

  const chartConfig = {
    backgroundColor: theme.background,
    backgroundGradientFrom: theme.background,
    backgroundGradientTo: theme.surface,
    color: (opacity = 1) => isDarkMode ? `rgba(168, 139, 250, ${opacity})` : `rgba(235, 115, 99, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(249, 250, 251, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: isDarkMode ? 'rgba(249,250,251,0.1)' : 'rgba(31,41,55,0.1)',
    },
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20],
        color: (opacity = 1) => isDarkMode ? `rgba(168, 139, 250, ${opacity})` : `rgba(235, 115, 99, ${opacity})`,
      },
    ],
  };

  return (
    <View 
      onLayout={handleLayout} 
      style={{
        backgroundColor: theme.card,
        borderRadius: 16,
        padding: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      className="overflow-hidden"
    >
      <LineChart
        bezier
        withShadow
        withDots={false}
        fromZero
        data={data}
        width={chartWidth - 16} // Account for padding
        height={200}
        chartConfig={chartConfig}
        withHorizontalLabels
        flatColor={true}
        withCustomBarColorFromData
        withInnerLines
        style={{
          borderRadius: 12,
          padding: 0,
          marginVertical: 0,
          marginHorizontal: 0,
        }}
      />
    </View>
  );
};

export default LastWeekActivity;
