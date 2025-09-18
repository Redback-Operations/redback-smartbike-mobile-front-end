import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/components/CustomSafeArea";
import DropDown from "@/components/DropDown";
import { useTheme } from "@/context/ThemeContext";

const options = ["General Equiry", "Technical Support", "Billing", "Other"];

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    subject: "",
    category: "Select...",
    email: "",
    message: "",
  });

  const handleCategorySelect = (option) => {
    setFormData({ ...formData, category: option });
  };
  
  // Theme-aware colors
  const bgColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const inputBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-200";
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <CustomSafeArea applyTopInset={false} bgColour={bgColor}>
        <View className={`flex justify-center h-full px-4 bg-${bgColor}`}>
          <Text className="text-brand-purple text-3xl my-8 font-bold text-center">
            How can we help?
          </Text>
          <View className="gap-4 my-4 flex-1">
            <TextInput
              className={`${textColor} ${inputBgColor} box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center ${borderColor} focus:border-brand-purple`}
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "gray"}
              placeholder="Subject"
              value={formData.subject}
              onChangeText={(text) =>
                setFormData({ ...formData, subject: text })
              }
            />
            <View className="z-10">
              <DropDown
                data={formData}
                setData={setFormData}
                category={formData.category}
                options={options}
                selectedOption={formData.category}
                handlePress={handleCategorySelect}
              />
            </View>
            <TextInput
              className={`${textColor} ${inputBgColor} box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center ${borderColor} focus:border-brand-purple`}
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "gray"}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCapitalize="none"
            />
            <TextInput
              className={`${textColor} ${inputBgColor} box-border border-[1.5px] h-1/2 rounded-xl p-4 ${borderColor} focus:border-brand-purple`}
              placeholderTextColor={isDarkMode ? "#9CA3AF" : "gray"}
              placeholder="Message"
              value={formData.message}
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              multiline={true}
              style={{ textAlignVertical: "top" }}
            />
            <View className="flex-grow items-center justify-center">
              <TouchableOpacity className="text-white bg-brand-purple w-full py-4 rounded-xl text-xl">
                <Text className="text-white font-semibold text-center">
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomSafeArea>
    </TouchableWithoutFeedback>
  );
};

export default Contact;
