import { View, Text, SafeAreaView, Platform } from "react-native";
import React, { useState } from "react";
import DropDown from "@/components/DropDown";
import { useHeaderHeight } from "@react-navigation/elements";
const visibilityOptions = ["public", "private"];

const privacySettings = () => {
  const headerHeight = useHeaderHeight();
  const [visibility, setVisibility] = useState("select..");
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ paddingTop: Platform.OS === "android" && headerHeight }}>
        <View className="p-4 gap-4 items-center flex-row">
          <Text className="font-semibold">Profile Visibility</Text>
          <DropDown
            handlePress={(selectedOption) => setVisibility(selectedOption)}
            options={visibilityOptions}
            selectedOption={visibility}
          />
        </View>
        <View>
          <Text className="font-semibold">Notification Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default privacySettings;
