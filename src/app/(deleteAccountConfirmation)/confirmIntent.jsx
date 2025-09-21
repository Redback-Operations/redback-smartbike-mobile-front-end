import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const DELETE_URL = `${API_BASE_URL}/user/delete/`;

const ConfirmDeletionForm = ({ setConfirmDeletion, setDeleteSuccessful }) => {
  const { user } = useContext(AuthContext);

  const handleDeleteUser = async () => {
    //PRODUCTION CODE

    console.log(`${JSON.stringify(user)}`)
    const response = await fetch(
      `${DELETE_URL}${user.id}/`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    switch (response.status) {
      case 404:
        alert("User not found");
        return;
      case 204:
        //setDeleteSuccessful(true); //function doesn't exist - someone fix this
        router.push("/confirmAccountDeletion");
        break;
    }

    //DEV CODE
    //router.push("/confirmAccountDeletion");
  };

  return (
    <View className="bg-black/80  flex-1">
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
        {/* Buttons */}
        <View className="flex-row gap-4">
          {/* BACK BUTTON */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 rounded-full border border-gray-200 p-4"
          >
            <Text className="text-center font-semibold">Back</Text>
          </TouchableOpacity>
          {/* CONFIRM BUTTON */}
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
