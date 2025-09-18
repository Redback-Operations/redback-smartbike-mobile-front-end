import { View, Text, TouchableOpacity, Modal, Keyboard } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@/context/ThemeContext";

const DropDown = ({ options, selectedOption, handlePress }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Theme-aware colors
  const textColor = isDarkMode ? "text-white" : "text-black";
  const placeholderColor = isDarkMode ? "text-gray-400" : "text-gray-500";
  const bgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-200";

  return (
    <TouchableOpacity
      onBlur={() => setMenuOpen(false)}
      onPress={() => {
        setMenuOpen(!menuOpen);
        Keyboard.dismiss();
      }}
      className={`border-[1.5px] relative rounded-xl ${
        menuOpen ? "border-brand-purple" : borderColor
      }`}
    >
      <View className="flex-row items-center justify-between ">
        <Text
          className={`p-4 ${
            selectedOption == "Select..." || selectedOption == "select.." ? placeholderColor : textColor
          }`}
          p-6
        >
          {selectedOption}
        </Text>
        <Entypo
          name="chevron-right"
          size={18}
          color={isDarkMode ? "#9CA3AF" : "gray"}
          className={`${menuOpen ? "rotate-90" : "rotate-0"} mr-6`}
        />
      </View>
      <View
        className={`absolute w-full bottom-0 translate-y-full ${bgColor} rounded-xl overflow-hidden flex ${
          menuOpen ? "border-[1.5px] border-brand-purple " : "h-0"
        }`}
      >
        {menuOpen &&
          options.map((option) => (
            <TouchableOpacity
              className="flex justify-center"
              key={option}
              onPress={() => {
                handlePress(option);
                setMenuOpen(!menuOpen);
              }}
            >
              <Text className={`${textColor} p-6`}>{option}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default DropDown;
