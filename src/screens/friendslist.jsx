import React from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { initialFriends } from "../data/friendsdata";

const FriendsList = () => {
  const router = useRouter();

  const renderFriend = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/FriendDetails", params: { ...item } })}
    >
      <Image source={{ uri: item.photo }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={initialFriends}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderFriend}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  list: { justifyContent: "center" },
  card: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FDEDEC",
    borderRadius: 15,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FriendsList;
