import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import Avatar from "@/components/Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDown from "@/components/DropDown";
import { AuthContext } from "@/context/authContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";

const options = [
  "Poor service",
  "I've found a better alternative",
  "Privacy concerns",
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

const deleteAccount = () => {
  const headerHeight = useHeaderHeight();

  const { user } = useContext(AuthContext);
  //sets the reasonEnum to the ENUM value expected by backend
  const handleDeleteReason = (option) => {
    const index = options.indexOf(option);
    setFormData({ ...formData, reasonEnum: index, reason: option });
  };

  const [formData, setFormData] = useState({
    reason: "Select...",
    moreInfo: "",
    reasonEnum: 0,
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className={`h-full bg-white `}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? headerHeight : 0,
          }}
          className=" self-center mb-4  relative"
        >
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
          <View className="gap-2 ">
            <Text className="font-semibold">
              Please provide further details:
            </Text>
            <TextInput
              multiline={true}
              style={{ textAlignVertical: "top" }}
              numberOfLines={5}
              placeholder="Comments..."
              className="text-black h-36  box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center border-gray-200 focus:border-brand-purple"
            />
          </View>
          <View className="gap-2">
            <Text className="font-semibold text-black">
              We're sorry to see you go. Please note:
            </Text>
            <FlatList
              data={bulletPoints}
              renderItem={({ item }) => (
                <View className=" gap-1 flex-row">
                  <Text>{"\u2022 "}</Text>
                  <Text>{item.note}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View className="h-2"></View>}
            />
          </View>
        </View>
        <View className="p-4 mt-auto">
          <TouchableOpacity
            onPress={() => router.push("/confirmIntent")}
            className="bg-red-500  rounded-full p-4"
          >
            <Text className="text-white font-semibold text-center">
              Delete My Account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default deleteAccount;
