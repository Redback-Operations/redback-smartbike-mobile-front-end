import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomSafeArea from "@/components/CustomSafeArea";
import DropDown from "@/components/DropDown";
import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const MESSAGE_URL = `${API_BASE_URL}/messages/`;
const options = ["General Inquiry", "Technical Support", "Billing Issue", "Other"];

const Contact = () => {
  const { user, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    subject: "",
    topic: "Select...",
    email: "",
    message: "",
    topicEnum: 0,
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleCategorySelect = (option) => {
    const index = options.indexOf(option);
    setFormData({ ...formData, topicEnum: index, topic: option });
  };

  const handleContact = async () => {
    try {
      if (!user) {
        alert("No user found.");
        return;
      }

      if (!formData.subject || !formData.email || !formData.message) {
        alert("Please fill in all required fields.");
        return;
      }

      let finalTopic = formData.topic;
      let finalTopicEnum = formData.topicEnum;

      if (finalTopicEnum === 0) {
        finalTopic = options[3];
        finalTopicEnum = 3;
      }

      const bodyData = new FormData();
      bodyData.append("id", user?.id || "");
      bodyData.append("email", formData.email);
      bodyData.append("subject", formData.subject);
      bodyData.append("topic", finalTopic);
      bodyData.append("message_body", formData.message);

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
          return;
        default:
          alert("Unknown Error!");
          return;
      }
    } catch (error) {
      console.error("Contact request failed:", error);
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
        <View className="flex justify-center h-full px-4">
          <Text className="text-brand-purple text-3xl my-8 font-bold text-center">
            How can we help?
          </Text>

          <View className="gap-4 my-4 flex-1">
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
              topic={formData.topic}
              options={options}
              selectedOption={formData.topic}
              handlePress={handleCategorySelect}
            />

            <TextInput
              className="text-black -z-10 bg-white box-border border-[1.5px] rounded-xl p-4 flex items-center justify-center border-gray-200 focus:border-brand-purple"
              placeholderTextColor={"gray"}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCapitalize="none"
            />

            <TextInput
              className="text-black bg-white -z-10 box-border border-[1.5px] h-1/2 rounded-xl p-4 border-gray-200 focus:border-brand-purple"
              placeholderTextColor={"gray"}
              placeholder="Message"
              value={formData.message}
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              multiline={true}
              style={{ textAlignVertical: "top" }}
            />

            <View className="flex-grow items-center justify-center">
              <TouchableOpacity
                className="text-white bg-brand-purple w-full py-4 rounded-xl text-xl"
                onPress={handleContact}
              >
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