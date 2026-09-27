import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AddFriendChallengeModal from "@/components/AddFriendChallengeModel";
import { MOCK_FRIENDS } from "@/components/mockdata";

const FriendsList = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      setLoading(true);

      if (!user?.id) {
        setError("User not authenticated");
        setFriends([]);
        setLoading(false);
        return;
      }

      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/friends?user_id=${user.id}`;
      console.log("Fetching friends from:", apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        setError(`Failed to load friends (${response.status})`);
        // Use mock data as fallback
        setFriends(MOCK_FRIENDS);
        return;
      }

      const data = await response.json();
      console.log("Friends data received:", data);

      let friendsList = Array.isArray(data) ? data : data.data || [];

      // Mock data for testing if no friends are found
      if (friendsList.length === 0) {
        console.log("No friends found, using mock data for demonstration...");
        friendsList = MOCK_FRIENDS;
      }

      setFriends(friendsList);
      setError(null);
    } catch (err) {
      console.error("Error fetching friends:", err.message);
      setError("Failed to load friends");
      // Use mock data as fallback
      setFriends(MOCK_FRIENDS);
    } finally {
      setLoading(false);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFriend = (friendId, friendName) => {
    Alert.alert(
      "Remove Friend",
      `Are you sure you want to remove ${friendName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              // Call API to remove friend
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/friends/${friendId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.ok) {
                setFriends(friends.filter((f) => f.id !== friendId));
                Alert.alert("Success", `${friendName} removed from friends`);
              } else {
                Alert.alert("Error", "Failed to remove friend");
              }
            } catch (error) {
              console.error("Error removing friend:", error);
              Alert.alert("Error", "Failed to remove friend");
            }
          },
        },
      ]
    );
  };

  const renderFriendCard = ({ item }) => (
    <View className="mx-6 mb-4 p-4 bg-[#141A26] rounded-3xl border border-[#1F2937]">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {/* Friend Avatar */}
          <View className="w-14 h-14 rounded-full bg-[#1D2432] mr-4 justify-center items-center overflow-hidden">
            {item.photo ? (
              <Text className="text-xl">👤</Text>
            ) : (
              <MaterialIcons name="person" size={24} color="#9CA3AF" />
            )}
          </View>

          {/* Friend Info */}
          <View className="flex-1">
            <Text className="text-lg font-semibold text-white">
              {item.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${
                  item.status === "Active" ? "bg-[#4ADE80]" : "bg-[#9CA3AF]"
                }`}
              />
              <Text className="text-sm text-[#9CA3AF]">
                {item.status || "Active"}
              </Text>
            </View>
          </View>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          onPress={() => handleRemoveFriend(item.id, item.name)}
          className="ml-2"
        >
          <MaterialIcons name="close" size={24} color="#EB7363" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator
          size="large"
          color="#EB7363"
          testID="loading-spinner"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-3xl font-bold text-white">Friends</Text>
        <Text className="text-[#9CA3AF] text-base mt-2">
          {friends.length} {friends.length === 1 ? "friend" : "friends"}
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 pb-4">
        <View className="flex-row items-center bg-[#1D2432] rounded-2xl px-4 border border-[#1F2937]">
          <FontAwesome5 name="search" size={18} color="#666" />
          <TextInput
            placeholder="Search friends..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 py-3 text-base text-white"
            placeholderTextColor="#666"
            testID="friend-search-input"
          />
        </View>
      </View>

      {/* Error State */}
      {error && (
        <View className="mx-6 mb-4 p-4 bg-[#2B1F1C] rounded-2xl border border-[#EB7363]">
          <Text className="text-[#EB7363] font-semibold" testID="error-message">
            {error}
          </Text>
        </View>
      )}

      {/* Friends List */}
      {filteredFriends.length > 0 ? (
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFriendCard}
          contentContainerStyle={{ paddingBottom: 100 }}
          testID="friends-list"
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <FontAwesome5 name="users" size={48} color="#333" />
          <Text className="text-[#9CA3AF] text-lg mt-4">
            {searchQuery ? "No friends found" : "No friends yet"}
          </Text>
          {!searchQuery && (
            <Text className="text-[#9CA3AF] text-sm mt-2">
              Add friends to get started
            </Text>
          )}
        </View>
      )}

      {/* Floating Action Button - Create Challenge */}
      <TouchableOpacity
        onPress={() => setShowChallengeModal(true)}
        className="absolute bottom-8 right-6 w-16 h-16 bg-[#EB7363] rounded-full justify-center items-center shadow-lg"
        testID="add-challenge-fab"
      >
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Challenge Modal */}
      <AddFriendChallengeModal
        visible={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        friends={friends.length > 0 ? friends : MOCK_FRIENDS}
      />
    </View>
  );
};

export default FriendsList;
