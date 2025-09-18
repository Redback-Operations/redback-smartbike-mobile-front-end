import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import Avatar from "@/components/Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuthContext } from "@/context/authContext";
import { useTheme } from "@/context/ThemeContext";

import CustomSafeArea from "@/components/CustomSafeArea";
const editProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ username: "", email: "" });
  // useEffect(() => {
  //   setUser({ id: 1, username: "Jordan", email: "jordan@gmail.com" });
  // }, []);

  const submitChanges = async () => {
    //logic to submit changes and update account details.
  };

  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const inputBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-400";

  return (
    <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
      <View className={`flex-1 bg-${bgColor}`}>
        <View>
          <Avatar
            size={100}
            className="self-center"
            icon={<AntDesign name="edit" size={14} color="white" />}
            iconBgColour={"bg-blue-500"}
          />
        </View>
        {user && (
          <View className="flex-1 gap-4 p-4">
            <View className="gap-2 ">
              <Text className={textColor}>Username:</Text>
              <TextInput
                value={formData.username}
                onChangeText={(text) =>
                  setFormData({ ...formData, username: text })
                }
                className={`border ${borderColor} p-2 rounded-xl ${inputBgColor} ${textColor}`}
                placeholder={user.username ? user.username : "Username"}
                placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
            </View>
            <View className="gap-2">
              <Text className={textColor}>Password:</Text>
              <TextInput
                secureTextEntry
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                className={`border ${borderColor} p-2 rounded-xl ${inputBgColor} ${textColor}`}
                placeholder={"*********"}
                placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
            </View>

            <Text className={textColor}>{formData.username}</Text>
            <Text className={textColor}>{formData.password}</Text>

            <TouchableOpacity
              onPress={submitChanges}
              className={`bg-brand-purple p-4 rounded-xl mt-auto `}
            >
              <Text className="text-white text-center font-semibold">
                Submit Changes
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </CustomSafeArea>
  );
};

export default editProfile;
