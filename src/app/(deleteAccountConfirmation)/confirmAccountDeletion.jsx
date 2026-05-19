import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { AuthContext } from "@/context/authContext";

const ConfirmAccountDeletion = () => {
  const { user, loading, signOut, setUser } = useContext(AuthContext);

  const handleClose = async () => {
    try {
      if (signOut) {
        await signOut();
      } else if (setUser) {
        setUser(null);
      }

      router.replace("/");
    } catch (error) {
      console.error("Logout after deletion failed:", error);
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <View className="bg-black/80 flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="bg-black/80 flex-1">
      <View className="p-4 gap-4 h-[250px] bg-white flex-col rounded-xl justify-center absolute bottom-0 left-0 right-0">
        <View className="w-[70px] bg-green-500 self-center rounded-full">
          <Text className="text-white text-center">Success</Text>
        </View>

        <Text className="text-lg font-bold text-center">Account Deleted!</Text>

        <Text className="text-center text-gray-600">
          Your account has been successfully deleted. We're sorry to see you go.
        </Text>

        <TouchableOpacity
          onPress={handleClose}
          className="bg-brand-purple p-4 rounded-full"
        >
          <Text className="font-semibold text-center text-white">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmAccountDeletion;