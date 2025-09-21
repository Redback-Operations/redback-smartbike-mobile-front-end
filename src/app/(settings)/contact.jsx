import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomSafeArea from "@/components/CustomSafeArea";
import DropDown from "@/components/DropDown";
import { AuthContext } from "@/context/authContext";
import { Link, router, useNavigation } from "expo-router";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const MESSAGE_URL = `${API_BASE_URL}/messages/`;
const options = ["General Equiry", "Technical Support", "Billing", "Other"];

const Contact = () => {
   const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    subject: "",
    category: "Select...",
    email: "",
    message: "",
    categoryEnum: 0
  });

  const handleCategorySelect = (option) => {
    const index = options.indexOf(option);
    setFormData({ ...formData, categoryEnum: index, category: option });
  };

  const handleContact = async (inData) => {

    
    console.log(`${JSON.stringify(formData)}`) //remove this in PR
    if (formData.categoryEnum == 0) {
      formData.category = options[3]; formData.categoryEnum = 3;
    }

    const bodyData = new FormData();
    bodyData.append("id", user.id)
    bodyData.append("email", formData.email);
    bodyData.append("subject", formData.subject);
    bodyData.append("category", formData.category);
    bodyData.append("message_body", formData.message);
    console.log(Object.fromEntries(bodyData.entries())); //remove this in PR

    const response = await fetch(`${MESSAGE_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: bodyData,
    });

    switch (response.status) {
      case 400:
        alert("Invalid parameters!");
        return;
      case 404:
        alert("User not found!");
        return;
      case 201:
         alert("Message sent!");
        router.replace("/contact");
        break;
      default:
        alert("Unknown Error!");
        return;  
    }
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <CustomSafeArea>
        <View className="flex justify-center h-full px-4">
          <Text className="text-brand-purple text-3xl my-8 font-bold text-center">
            How can we help?
          </Text>
          <View className="gap-4 my-4 flex-1 ">
            <TextInput
              className="text-black bg-white box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center border-gray-200 focus:border-brand-purple"
              placeholderTextColor={"gray"}
              placeholder="Subject"
              value={formData.subject}
              onChangeText={(text) =>
                setFormData({ ...formData, subject: text })
              }
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
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              multiline={true}
              style={{ textAlignVertical: "top" }}
            />
            <View className=" flex-grow items-center justify-center">
              <TouchableOpacity className="text-white  bg-brand-purple w-full py-4 rounded-xl text-xl"
                          onPress={() => handleContact()}>
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
