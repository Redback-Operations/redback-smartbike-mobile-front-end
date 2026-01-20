import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { AuthContext } from "@/context/authContext";

export default function MyProfile() {
  const { user } = useContext(AuthContext);

  // Fallback user if AuthContext user is missing
  const defaultUser = useMemo(
    () => ({
      name: user?.username || "Rider",
      email: user?.email || "example@email.com",
      dob: "1998-07-25",
      photo: "https://i.pravatar.cc/150?img=5",
      stravaLink: "https://www.strava.com/",
    }),
    [user]
  );

  const [name, setName] = useState(defaultUser.name);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleStravaPress = () => {
    Linking.openURL(defaultUser.stravaLink);
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter a username.");
      return;
    }

    setIsEditing(false);

    // For now: local save only (no backend)
    Alert.alert("Saved", "Your profile details have been updated.");
  };

  const handleCancel = () => {
    setName(defaultUser.name);
    setBio("");
    setIsEditing(false);
  };

  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <Image source={{ uri: defaultUser.photo }} style={styles.avatar} />

        {/* Username */}
        {isEditing ? (
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter username"
            style={styles.input}
          />
        ) : (
          <Text style={styles.name}>{name}</Text>
        )}

        {/* Email + DOB */}
        <Text style={styles.detail}>📧 {defaultUser.email}</Text>
        <Text style={styles.detail}>🎂 {defaultUser.dob}</Text>

        {/* Bio */}
        <View style={styles.bioBox}>
          <Text style={styles.bioTitle}>Bio</Text>

          {isEditing ? (
            <TextInput
              value={bio}
              onChangeText={setBio}
              placeholder="Write a short bio..."
              style={[styles.input, styles.bioInput]}
              multiline
            />
          ) : (
            <Text style={styles.bioText}>
              {bio.trim()
                ? bio
                : "Add a short bio to personalize your profile."}
            </Text>
          )}
        </View>

        {/* Buttons */}
        {!isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.editBtn]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.stravaBtn]}
              onPress={handleStravaPress}
            >
              <Text style={styles.buttonText}>View on Strava</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.saveBtn]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  detail: { fontSize: 16, marginBottom: 4, color: "#333" },

  bioBox: {
    marginTop: 18,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 14,
  },
  bioTitle: { fontWeight: "700", marginBottom: 6, color: "#111" },
  bioText: { color: "#444", lineHeight: 20 },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  bioInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  button: {
    marginTop: 14,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  editBtn: { backgroundColor: "#111" },
  stravaBtn: { backgroundColor: "#FC4C02" },
  saveBtn: { backgroundColor: "#16a34a", flex: 1 },
  cancelBtn: { backgroundColor: "#6b7280", flex: 1 },

  row: { flexDirection: "row", gap: 12, width: "100%", marginTop: 14 },

  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
});
