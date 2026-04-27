// AIInsights.jsx
// Shows a personalised AI-generated message based on the user's workout data.
// Uses Google Gemini API to generate motivational messages and goal predictions.
// Author: Krishaan Nagi

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Gemini API config - reads from .env via Expo
// const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_KEY = "AIzaSyBHimvWD8taQWcOKebT5MX9MVxqzQCROjA"; // Replace with your actual API key or use the environment variable
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
  GEMINI_API_KEY;

// This is the mock workout data that already exists in the app (from statistics.jsx).
// When the backend is ready, replace this with real data from the API.
const MOCK_WORKOUT_DATA = {
  weeklyMinutes: [
    { day: "Mon", minutes: 22 },
    { day: "Tue", minutes: 48 },
    { day: "Wed", minutes: 26 },
    { day: "Thu", minutes: 55 },
    { day: "Fri", minutes: 99 },
    { day: "Sat", minutes: 35 },
    { day: "Sun", minutes: 20 },
  ],
  totalDistance: "92.4 km",
  calories: 3250,
  avgHeartRate: "148 bpm",
};

// Build a prompt string from the workout data to send to Gemini
function buildPrompt(workoutData, username) {
  var totalMinutes = 0;
  var activeDays = 0;
  var dailyBreakdown = "";

  for (var i = 0; i < workoutData.weeklyMinutes.length; i++) {
    var day = workoutData.weeklyMinutes[i];
    totalMinutes = totalMinutes + day.minutes;
    if (day.minutes > 0) {
      activeDays = activeDays + 1;
    }
    dailyBreakdown = dailyBreakdown + day.day + ": " + day.minutes + " min, ";
  }

  var prompt =
    "You are a friendly fitness coach for the Redback Smart Bike app. " +
    "Based on this user's workout data, give a short motivational message " +
    "(2-3 sentences max). Include a prediction about their goal progress, " +
    "like when they might hit a distance or time milestone.\n\n" +
    "User: " + (username || "Rider") + "\n" +
    "This week's rides: " + dailyBreakdown + "\n" +
    "Total minutes: " + totalMinutes + "\n" +
    "Active days: " + activeDays + "/7\n" +
    "Total distance: " + workoutData.totalDistance + "\n" +
    "Calories burned: " + workoutData.calories + "\n" +
    "Average heart rate: " + workoutData.avgHeartRate + "\n\n" +
    "Keep it casual and encouraging, like talking to a mate. " +
    "Don't use emojis. Keep it under 3 sentences.";

  return prompt;
}

// Call the Gemini API and return the response text
async function getAIMessage(workoutData, username) {
  var prompt = buildPrompt(workoutData, username);

  var requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  var response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Gemini API error: " + response.status);
  }

  var data = await response.json();

  // The response structure from Gemini
  var message = data.candidates[0].content.parts[0].text;
  return message;
}

// The actual component that shows on screen
export default function AIInsights({ username }) {
  var [message, setMessage] = useState("");
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(false);

  // Fetch the AI message when the component first loads
  useEffect(function () {
    fetchMessage();
  }, []);

  function fetchMessage() {
    setLoading(true);
    setError(false);

    getAIMessage(MOCK_WORKOUT_DATA, username)
      .then(function (result) {
        setMessage(result);
        setLoading(false);
      })
      .catch(function (err) {
        console.log("AI Insights error:", err);
        setError(true);
        setLoading(false);
      });
  }

  return (
    <LinearGradient
      colors={["#1C1C1E", "#212124"]}
      start={[0, 0]}
      end={[1, 0]}
      style={{
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
      }}
    >
      {/* Header */}
      <Text
        style={{
          color: "#EB7363",
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        AI Coach Insights
      </Text>

      {/* Loading state */}
      {loading && (
        <View style={{ alignItems: "center", paddingVertical: 12 }}>
          <ActivityIndicator size="small" color="white" />
          <Text style={{ color: "rgba(255,255,255,0.7)", marginTop: 6, fontSize: 12 }}>
            Analysing your workouts...
          </Text>
        </View>
      )}

      {/* Error state */}
      {error && !loading && (
        <View>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
            Could not load insights right now. Check your connection and try again.
          </Text>
          <TouchableOpacity
            onPress={fetchMessage}
            style={{
              backgroundColor: "#EB7363",
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
              alignSelf: "flex-start",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* The AI message */}
      {!loading && !error && (
        <View>
          <Text style={{ color: "white", fontSize: 14, lineHeight: 20 }}>
            {message}
          </Text>

          {/* Refresh button to get a new message */}
          <TouchableOpacity
            onPress={fetchMessage}
            style={{
              backgroundColor: "#EB7363",
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
              alignSelf: "flex-start",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
              New Insight
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}
