import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import CustomSafeArea from "@/components/CustomSafeArea";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const workout = () => {
  const { inlineStyles, theme } = useThemeStyles();
  
  return (
    <View style={inlineStyles.background} className="flex-1">
      <CustomSafeArea bgColour={theme.background}>
        <Text 
          style={{ color: theme.text }} 
          className="text-4xl font-bold p-4"
        >
          Workout Session
        </Text>
        <View className="h-52 p-4">
          <WebView
            source={{ uri: "https://www.youtube.com/embed/L_xrDAtykMI" }} // full body HIIT video
            className="flex-1"
            allowsFullscreenVideo
          />
        </View>
        <View className="p-4 gap-2">
          <Text 
            style={{ color: theme.text }} 
            className="text-lg font-semibold"
          >
            Speed: 22 km/h
          </Text>
          <Text 
            style={{ color: theme.text }} 
            className="text-lg font-semibold"
          >
            RPM: 90
          </Text>
          <Text 
            style={{ color: theme.text }} 
            className="text-lg font-semibold"
          >
            Distance: 4.3 km
          </Text>
          <Text 
            style={{ color: theme.text }} 
            className="text-lg font-semibold"
          >
            Incline: 5%
          </Text>
          <Text 
            style={{ color: theme.text }} 
            className="text-lg font-semibold"
          >
            Heart Rate: 132 bpm
          </Text>
          <Text 
            style={{ color: theme.text }} 
            className="text-lg font-semibold"
          >
            Temperature: 26 °C
          </Text>
        </View>
      </CustomSafeArea>
    </View>
  );
};

export default workout;
