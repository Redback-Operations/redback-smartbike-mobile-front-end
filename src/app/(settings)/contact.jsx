import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDown from "@/components/DropDown";

const options = ["General Equiry", "Technical Support", "Billing", "Other"];

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "Select...",
    email: "",
    message: "",
  });

  const handleCategorySelect = (option) => {
    setFormData({ ...formData, category: option });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView className="flex bg-white justify-center h-full p-4">
        <Text className="text-brand-purple text-3xl my-8 font-bold text-center">
          How can we help?
        </Text>

        <View className="gap-4 my-4 flex-1 ">
          <TextInput
            className="text-black bg-white box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center border-gray-200 focus:border-brand-purple"
            placeholderTextColor={"gray"}
            placeholder="Subject"
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
          />
          <DropDown
            data={formData}
            setData={setFormData}
            category={formData.category}
            options={options}
            selectedOption={formData.category}
            handlePress={handleCategorySelect}
          ></DropDown>
          <TextInput
            className="text-black -z-10 bg-white box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center border-gray-200 focus:border-brand-purple"
            placeholderTextColor={"gray"}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            autoCapitalize="none"
          />
          <TextInput
            className="text-black bg-white -z-10 box-border border-[1.5px] h-1/2  rounded-xl p-4  border-gray-200 focus:border-brand-purple"
            placeholderTextColor={"gray"}
            placeholder="Message"
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            multiline={true}
            style={{ textAlignVertical: "top" }}
          />

          <View className=" flex-grow items-center justify-center">
            <TouchableOpacity className="text-white  bg-brand-purple w-full py-4 rounded-xl text-xl">
              <Text className="text-white font-semibold text-center">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Contact;
