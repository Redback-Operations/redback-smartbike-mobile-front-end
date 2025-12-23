import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuth } from "@/auth/AuthContext";

const ConfirmDeletionForm = ({ setConfirmDeletion, setDeleteSuccessful }) => {
  const { isAuthed, signOut } = useAuth();

  const handleDeleteUser = async () => {
    if (!isAuthed) {
      alert("You must be signed in to delete your account.");
      return;
    }

    // MVP: backend not ready, so simulate deletion flow
    // Optional: clear auth to mimic account removal session end
    await signOut();

    // If you have a success state in parent, you can set it here
    if (setDeleteSuccessful) setDeleteSuccessful(true);

    router.push("/");
  };

  return (
    <View className="bg-black/80 flex-1">
      <View className="gap-4 p-4 h-[250px] bg-white flex-col rounded-xl justify-center absolute bottom-0 left-0 right-0">
        <View className="w-[70px] bg-red-500 self-center rounded-full">
          <Text className="text-white text-center">Warning</Text>
        </View>

        <Text className="text-lg font-bold text-center">
          Are you sure you want to delete your account?
        </Text>

        <Text className="text-center text-gray-600">
          By deleting your account you will lose your data.
        </Text>

        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 rounded-full border border-gray-200 p-4"
          >
            <Text className="text-center font-semibold">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteUser}
            className="flex-1 rounded-full bg-brand-purple p-4"
          >
            <Text className="text-center text-white font-semibold">
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmDeletionForm;
