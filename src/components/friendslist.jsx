import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { initialFriends } from '../data/friendsdata';

const FriendsList = () => {
  const [friends] = useState(initialFriends);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.heading}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.photo }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    paddingLeft: 10,
  },
  container: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#F9D6D5',
    borderRadius: 15,
    alignItems: 'center',
    margin: 8,
    paddingVertical: 20,
    flex: 1,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default FriendsList;
