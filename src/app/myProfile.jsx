import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Button, Linking, ActivityIndicator } from "react-native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { AuthContext } from "@/context/authContext";

export default function UserDetails() {
  const { user, loading } = useContext(AuthContext);

  const profileUser = {
    name: user?.username || "Username",
    email: user?.email || "",
    dob: "1998-07-25",
    photo: "https://i.pravatar.cc/150?img=5",
    stravaLink: "https://www.strava.com/",
  };

  const handleStravaPress = () => {
    Linking.openURL(profileUser.stravaLink);
  };

  if (loading) {
    return (
      <CustomSafeArea>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#3A1C72" />
        </View>
      </CustomSafeArea>
    );
  }

  if (!user) {
    return (
      <CustomSafeArea>
        <View style={styles.centered}>
          <Text>No user found</Text>
        </View>
      </CustomSafeArea>
    );
  }

  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <Image source={{ uri: profileUser.photo }} style={styles.avatar} />
        <Text style={styles.name}>{profileUser.name}</Text>
        <Text style={styles.detail}>📧 {profileUser.email}</Text>
        <Text style={styles.detail}>🎂 {profileUser.dob}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="View on Strava"
            onPress={handleStravaPress}
            color="#FC4C02"
          />
        </View>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    marginTop: 24,
    width: "80%",
  },
});