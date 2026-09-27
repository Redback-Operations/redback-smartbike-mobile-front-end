import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { MOCK_FRIENDS } from "@/components/mockdata";

const ChallengeFriendSelector = ({ onSelect }) => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

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
        setFriends([]);
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
      setError("Failed to load friends");
      console.error("Error fetching friends:", err.message);
      // Use mock data as fallback
      setFriends(MOCK_FRIENDS);
    } finally {
      setLoading(false);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend.id);
    onSelect(friend);
  };

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
        <Text className="text-3xl font-bold text-white">
          Select Opponent
        </Text>
        <Text className="text-[#9CA3AF] text-base mt-2">
          Choose a friend to challenge
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectFriend(item)}
              testID={`friend-${item.name.toLowerCase()}`}
              className={`mx-6 mb-3 p-4 rounded-3xl flex-row items-center justify-between border ${
                selectedFriend === item.id
                  ? "bg-[#1E2A24] border-[#4ADE80]"
                  : "bg-[#141A26] border-[#1F2937]"
              }`}
            >
              <View className="flex-1">
                <Text
                  className={`text-lg font-semibold ${
                    selectedFriend === item.id
                      ? "text-[#4ADE80]"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Text>
                <Text className="text-[#9CA3AF] text-sm mt-1">
                  {item.status || "Active"}
                </Text>
              </View>

              {selectedFriend === item.id && (
                <View
                  className="w-6 h-6 rounded-full bg-[#4ADE80] justify-center items-center"
                  testID={`checkmark-${item.name.toLowerCase()}`}
                >
                  <Text className="text-white font-bold text-lg">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <FontAwesome5 name="users" size={48} color="#333" />
          <Text className="text-[#9CA3AF] text-lg mt-4">No friends found</Text>
        </View>
      )}
    </View>
  );
};

export default ChallengeFriendSelector;
