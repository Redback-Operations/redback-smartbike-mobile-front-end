import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { router, Stack } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomSafeArea from "@/components/CustomSafeArea";

const DeleteAccount = () => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [detailsError, setDetailsError] = useState("");

  const handleDelete = () => {
    let valid = true;
    setReasonError("");
    setDetailsError("");

    if (!reason.trim()) {
      setReasonError("Please enter a reason");
      valid = false;
    }

    if (!details.trim()) {
      setDetailsError("Please provide more details");
      valid = false;
    }

    if (!valid) return;

    Alert.alert(
      "Delete Account",
      "Your delete account request has been submitted."
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomSafeArea>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/settings")}
          >
            <AntDesign name="arrowleft" size={22} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Delete Account</Text>
          <Text style={styles.subtitle}>
            We’re sorry to see you go. Please tell us why you want to delete
            your account.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Reason for account deletion</Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              placeholder="Enter reason"
              placeholderTextColor="#6b7280"
              style={styles.input}
            />
            {reasonError ? (
              <Text style={styles.errorText}>{reasonError}</Text>
            ) : null}

            <Text style={styles.label}>Please provide further details</Text>
            <TextInput
              value={details}
              onChangeText={setDetails}
              placeholder="Comments..."
              placeholderTextColor="#6b7280"
              style={[styles.input, styles.textArea]}
              multiline
            />
            {detailsError ? (
              <Text style={styles.errorText}>{detailsError}</Text>
            ) : null}
          </View>

          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>Before you continue:</Text>

            <Text style={styles.warningItem}>
              • You will no longer be able to access the application with this
              account
            </Text>
            <Text style={styles.warningItem}>
              • Your profile and data will be deleted
            </Text>
            <Text style={styles.warningItem}>
              • Interactions such as messages and likes will be removed
            </Text>
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete My Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </CustomSafeArea>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#050505",
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#9ca3af",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 700,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#101010",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    marginBottom: 20,
  },
  label: {
    color: "#d1d5db",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#181818",
    color: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 6,
  },
  textArea: {
    minHeight: 130,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 13,
    marginBottom: 4,
  },
  warningCard: {
    backgroundColor: "#0d0d0d",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    marginBottom: 24,
  },
  warningTitle: {
    color: "#fca5a5",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  warningItem: {
    color: "#d1d5db",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default DeleteAccount;