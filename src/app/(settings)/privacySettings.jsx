import { View, Text, SafeAreaView, Platform } from "react-native";
import React, { useState } from "react";
import DropDown from "@/components/DropDown";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomSafeArea from "@/components/CustomSafeArea";
import { useTheme } from "@/context/ThemeContext";

const visibilityOptions = ["public", "private"];

const privacySettings = () => {
  const { isDarkMode } = useTheme();
  const [visibility, setVisibility] = useState("select..");
  
  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  
  return (
    <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
      <View className={`flex-1 bg-${bgColor}`}>
        <View className="p-4 gap-4 items-center flex-row">
          <Text className={`font-semibold ${textColor}`}>Profile Visibility</Text>
          <View className="flex-1">
            <DropDown
              handlePress={(selectedOption) => setVisibility(selectedOption)}
              options={visibilityOptions}
              selectedOption={visibility}
            />
          </View>
        </View>
        <View>
          <Text className={`font-semibold p-4 ${textColor}`}>Notification Settings</Text>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default privacySettings;
