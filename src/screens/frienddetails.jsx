import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const FriendDetails = () => {
  const { name, photo, email, dob } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text>Email: {email}</Text>
      <Text>Date of Birth: {dob}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});

export default FriendDetails;
