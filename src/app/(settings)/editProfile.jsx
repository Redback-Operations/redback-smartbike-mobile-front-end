import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import Avatar from "@/components/Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuthContext } from "@/context/authContext";
import CustomSafeArea from "@/components/CustomSafeArea";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "",
      });
    }
  }, [user]);

  const submitChanges = async () => {
    try {
      if (!formData.username || !formData.password) {
        alert("Please fill in all fields");
        return;
      }

      const updatedUser = {
        ...user,
        username: formData.username,
      };

      // Replace with real API call if needed
      // await api.put(`/user/${user.id}`, updatedUser);

      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <CustomSafeArea>
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
          <View className="gap-2">
            <Text>Username:</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
              className="border border-gray-400 p-2 rounded-xl"
              placeholder="Username"
            />
          </View>

          <View className="gap-2">
            <Text>Password:</Text>
            <TextInput
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              className="border border-gray-400 p-2 rounded-xl"
              placeholder="********"
            />
          </View>

          <TouchableOpacity
            onPress={submitChanges}
            className="bg-brand-purple p-4 rounded-xl mt-auto"
          >
            <Text className="text-white text-center font-semibold">
              Submit Changes
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomSafeArea>
  );
};

export default EditProfile;
