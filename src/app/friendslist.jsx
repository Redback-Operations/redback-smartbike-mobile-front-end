import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import CustomSafeArea from "@/components/CustomSafeArea";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";

const initialFriends = [
  {
    id: 1,
    name: "Jordan Anderson",
    photo: "https://i.pravatar.cc/150?img=12",
    email: "jordan@example.com",
    dob: "1995-04-12",
  },
  {
    id: 2,
    name: "Aviksha Vidya",
    photo: "https://i.pravatar.cc/150?img=5",
    email: "aviksha@example.com",
    dob: "1998-09-28",
  },
  {
    id: 3,
    name: "Karan Kapoor",
    photo: "https://i.pravatar.cc/150?img=20",
    email: "karan@example.com",
    dob: "1993-07-22",
  },
  {
    id: 4,
    name: "Alicia Chen",
    photo: "https://i.pravatar.cc/150?img=24",
    email: "alicia@example.com",
    dob: "1996-01-17",
  },
];

const FriendsList = () => {
  const [friends] = useState(initialFriends);
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  
  return (
    <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
      <View className={`mt-5 flex-1 bg-${bgColor}`}>
        <Text className={`${textColor} text-4xl font-bold mb-2 pl-2`}>Friends</Text>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ padding: 10, gap: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`friendsdetails/${item.id}`);
              }}
              className="bg-green-500 rounded-xl items-center m-2 py-5 flex-1 shadow-md"
            >
              <Image
                source={{ uri: item.photo }}
                className="w-20 h-20 rounded-full mb-2"
              />
              <Text className="text-white text-base font-semibold">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </CustomSafeArea>
  );
};

export default FriendsList;
