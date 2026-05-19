import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import Avatar from "@/components/Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDown from "@/components/DropDown";
import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import CustomSafeArea from "@/components/CustomSafeArea";

const options = [
  "Poor Service",
  "Found A Better Service",
  "Privacy Concerns",
  "Other",
];

const bulletPoints = [
  {
    note: "You will no longer be able to access the application with this account",
  },
  {
    note: "Your profile and data will be deleted",
  },
  {
    note: "Interaction such as messages and likes will be removed",
  },
];

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const SAVE_TA_URL = `${API_BASE_URL}/save_ta_message/`;

const DeleteAccount = () => {
  const { user, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    reason: "Select...",
    moreInfo: "",
    reasonEnum: 0,
  });

  const handleDeleteReason = (option) => {
    const index = options.indexOf(option);
    setFormData({ ...formData, reasonEnum: index, reason: option });
  };

  const handleConfirmTA = async (inData) => {
    try {
      if (!user) {
        alert("No user found.");
        return;
      }

      let finalReason = inData.reason;
      let finalReasonEnum = inData.reasonEnum;

      if (finalReasonEnum === 0) {
        finalReason = "Other";
        finalReasonEnum = 3;
      }

      const bodyData = {
        reason: String(finalReason),
        message_body: String(inData.moreInfo ?? ""),
      };

      const response = await fetch(`${SAVE_TA_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      switch (response.status) {
        case 400:
          alert("Invalid message!");
          return;
        case 201:
          router.push("/confirmIntent");
          return;
        default:
          alert("Unknown Error!");
          return;
      }
    } catch (error) {
      console.error("Terminate account request failed:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <CustomSafeArea>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3A1C72" />
        </View>
      </CustomSafeArea>
    );
  }

  if (!user) {
    return (
      <CustomSafeArea>
        <View className="flex-1 justify-center items-center">
          <Text>No user found</Text>
        </View>
      </CustomSafeArea>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <CustomSafeArea>
        <View className="self-center mb-4 relative">
          <Avatar
            size={100}
            icon={
              <AntDesign name="exclamationcircle" size={14} color="white" />
            }
            iconBgColour={"bg-red-500"}
          />
        </View>

        <View className="p-4 gap-6">
          <View className="gap-2 z-10">
            <Text className="text font-semibold">
              Reason for account deletion:
            </Text>
            <DropDown
              handlePress={handleDeleteReason}
              options={options}
              selectedOption={formData.reason}
            />
          </View>

          <View className="gap-2">
            <Text className="font-semibold">
              Please provide further details:
            </Text>
            <TextInput
              multiline={true}
              style={{ textAlignVertical: "top" }}
              numberOfLines={5}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, moreInfo: text }))
              }
              placeholder="Comments..."
              className="text-black h-36 box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center border-gray-200 focus:border-brand-purple"
            />
          </View>

          <View className="gap-2">
            <Text className="font-semibold text-black">
              We're sorry to see you go. Please note:
            </Text>
            <FlatList
              data={bulletPoints}
              renderItem={({ item }) => (
                <View className="gap-1 flex-row">
                  <Text>{"\u2022 "}</Text>
                  <Text>{item.note}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View className="h-2" />}
            />
          </View>
        </View>

        <View className="p-4 mt-auto">
          <TouchableOpacity
            onPress={() => handleConfirmTA(formData)}
            className="bg-red-500 rounded-full p-4"
          >
            <Text className="text-white font-semibold text-center">
              Delete My Account
            </Text>
          </TouchableOpacity>
        </View>
      </CustomSafeArea>
    </TouchableWithoutFeedback>
  );
};

export default DeleteAccount;
