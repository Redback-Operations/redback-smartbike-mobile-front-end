import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const workout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Workout Session</Text>

      
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: "https://www.youtube.com/embed/L_xrDAtykMI" }} // full body HIIT video
          style={styles.webview}
          allowsFullscreenVideo
        />
      </View>

      <View style={styles.stats}>
        <Text style={styles.stat}>Speed: 22 km/h</Text>
        <Text style={styles.stat}>RPM: 90</Text>
        <Text style={styles.stat}>Distance: 4.3 km</Text>
        <Text style={styles.stat}>Incline: 5%</Text>
        <Text style={styles.stat}>Heart Rate: 132 bpm</Text>
        <Text style={styles.stat}>Temperature: 26 °C</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  videoContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  webview: {
    flex: 1,
  },
  stats: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 16,
  },
  stat: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
});

export default workout;
