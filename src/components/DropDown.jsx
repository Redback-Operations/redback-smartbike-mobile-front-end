import { View, Text, TouchableOpacity, Modal, Keyboard } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

const DropDown = ({ options, selectedOption, handlePress }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <TouchableOpacity
      onBlur={() => setMenuOpen(false)}
      onPress={() => {
        setMenuOpen(!menuOpen);
        Keyboard.dismiss();
      }}
      className={`border-[1.5px]  relative rounded-xl ${
        menuOpen ? "border-brand-purple" : "border-gray-200"
      }`}
    >
      <View className="flex-row items-center justify-between ">
        <Text
          className={`p-4 ${
            selectedOption == "Select..." ? "text-gray-500" : "text-black"
          }`}
          p-6
        >
          {selectedOption}
        </Text>
        <Entypo
          name="chevron-right"
          size={18}
          color="gray"
          className={`${menuOpen ? "rotate-90" : "rotate-0"} mr-6`}
        />
      </View>
      <View
        className={`absolute  w-full bottom-0 translate-y-full  bg-white rounded-xl overflow-hidden flex  ${
          menuOpen ? "border-[1.5px] border-brand-purple " : "h-0"
        }`}
      >
        {menuOpen &&
          options.map((option) => (
            <TouchableOpacity
              className=" flex justify-center"
              key={option}
              onPress={() => {
                handlePress(option);
                setMenuOpen(!menuOpen);
              }}
            >
              <Text className="text-black  p-6">{option}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </TouchableOpacity>
  );
};

export default DropDown;
