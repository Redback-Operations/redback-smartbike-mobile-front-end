import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!subject || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent!");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomSafeArea>
        <ScrollView contentContainerStyle={styles.container}>
          {/* BACK BUTTON */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/settings")}
          >
            <AntDesign name="arrowleft" size={22} color="white" />
          </TouchableOpacity>

          {/* TITLE */}
          <Text style={styles.title}>How can we help?</Text>

          {/* FORM CARD */}
          <View style={styles.card}>
            {/* SUBJECT */}
            <Text style={styles.label}>Subject</Text>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder="Enter subject"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />

            {/* EMAIL */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#6b7280"
              style={styles.input}
              keyboardType="email-address"
            />

            {/* MESSAGE */}
            <Text style={styles.label}>Message</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor="#6b7280"
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          {/* SEND BUTTON */}
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>
        </ScrollView>
      </CustomSafeArea>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#050505",
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#101010",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },

  label: {
    color: "#d1d5db",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#181818",
    color: "white",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#ff7a6b",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});