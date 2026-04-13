import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const initialFriends = [
  {
    id: 1,
    name: "Jordan Anderson",
    photo: "https://i.pravatar.cc/150?img=12",
    email: "jordan@example.com",
    dob: "1995-04-12",
    status: "Online",
    rides: 24,
  },
  {
    id: 2,
    name: "Aviksha Vidya",
    photo: "https://i.pravatar.cc/150?img=5",
    email: "aviksha@example.com",
    dob: "1998-09-28",
    status: "Active",
    rides: 18,
  },
  {
    id: 3,
    name: "Karan Kapoor",
    photo: "https://i.pravatar.cc/150?img=20",
    email: "karan@example.com",
    dob: "1993-07-22",
    status: "Offline",
    rides: 31,
  },
  {
    id: 4,
    name: "Alicia Chen",
    photo: "https://i.pravatar.cc/150?img=24",
    email: "alicia@example.com",
    dob: "1996-01-17",
    status: "Online",
    rides: 27,
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Online":
      return {
        bg: "bg-[#1E2A24]",
        text: "text-[#4ADE80]",
      };
    case "Active":
      return {
        bg: "bg-[#2B241C]",
        text: "text-[#FBBF24]",
      };
    default:
      return {
        bg: "bg-[#1D2432]",
        text: "text-[#AAB2C0]",
      };
  }
};

const FriendCard = ({ item }) => {
  const statusStyle = getStatusStyle(item.status);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/friendsdetails/${item.id}`)}
      className="w-[48.5%] bg-[#141A26] rounded-3xl p-4 border border-[#1F2937]"
    >
      <View className="items-center">
        <Image
          source={{ uri: item.photo }}
          className="w-20 h-20 rounded-full mb-3"
        />

        <Text className="text-white text-base font-semibold text-center">
          {item.name}
        </Text>

        <Text className="text-[#9CA3AF] text-xs mt-1 text-center">
          {item.email}
        </Text>

        <View className={`mt-3 px-3 py-1 rounded-full ${statusStyle.bg}`}>
          <Text className={`text-[10px] font-semibold ${statusStyle.text}`}>
            {item.status}
          </Text>
        </View>

        <View className="mt-4 w-full bg-[#1D2432] rounded-2xl p-3 items-center">
          <Text className="text-[#9CA3AF] text-xs">Total Rides</Text>
          <Text className="text-white text-lg font-bold mt-1">
            {item.rides}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FriendsList = () => {
  const [friends] = useState(initialFriends);

  return (
    <CustomSafeArea bgColour="#0B0F1A">
      <View className="flex-1 px-4 pt-4">
        <TouchableOpacity className="mb-4 self-start" onPress={() => router.back()}>
          <Text className="text-[#C2C8D0] text-base">← Back</Text>
        </TouchableOpacity>

        <View className="bg-[#141A26] rounded-[28px] p-5 mb-5 border border-[#1F2937]">
          <View className="w-16 h-16 rounded-full bg-[#221A22] items-center justify-center mb-4">
            <FontAwesome5 name="user-friends" size={28} color="#FF7A59" />
          </View>

          <Text className="text-white text-3xl font-bold">Friends</Text>

          <Text className="text-[#AAB2C0] text-sm mt-2 leading-5">
            Keep track of your riding friends, view their activity and connect
            with your cycling community.
          </Text>

          <View className="flex-row gap-3 mt-5">
            <View className="flex-1 bg-[#1D2432] rounded-2xl p-3">
              <Text className="text-[#9CA3AF] text-xs">Total Friends</Text>
              <Text className="text-white text-xl font-bold mt-1">
                {friends.length}
              </Text>
            </View>

            <View className="flex-1 bg-[#1D2432] rounded-2xl p-3">
              <Text className="text-[#9CA3AF] text-xs">Online Now</Text>
              <Text className="text-white text-xl font-bold mt-1">
                {friends.filter((friend) => friend.status === "Online").length}
              </Text>
            </View>

            <View className="flex-1 bg-[#1D2432] rounded-2xl p-3">
              <Text className="text-[#9CA3AF] text-xs">Active Riders</Text>
              <Text className="text-white text-xl font-bold mt-1">
                {friends.filter((friend) => friend.status !== "Offline").length}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 flex-row items-center bg-[#141A26] rounded-2xl px-4 py-3 border border-[#1F2937]">
            <AntDesign name="search1" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search friends"
              placeholderTextColor="#9CA3AF"
              className="ml-3 flex-1 text-white"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            className="bg-[#FF7A59] w-14 rounded-2xl items-center justify-center"
          >
            <MaterialIcons name="person-add-alt-1" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mb-3">
          <Text className="text-white text-lg font-semibold">
            Your Network
          </Text>
          <Text className="text-[#9CA3AF] text-sm mt-1">
            Tap a rider to view more details
          </Text>
        </View>

        <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 14 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <FriendCard item={item} />}
        />
      </View>
    </CustomSafeArea>
  );
};

export default FriendsList;

