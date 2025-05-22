import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import * as ImagePicker from "expo-image-picker";

import CustomSafeArea from "@/components/CustomSafeArea";
const editProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "" });
  // useEffect(() => {
  //   setUser({ id: 1, username: "Jordan", email: "jordan@gmail.com" });
  // }, []);

  const [image, setImage] = useState(null);

  const submitChanges = async () => {
    //logic to submit changes and update account details.
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Access to gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Access to camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <CustomSafeArea>
      <TouchableOpacity onPress={pickImage} onLongPress={takePhoto} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={
            image
              ? { uri: image }
              : require("@assets/avatar.jpg")
          }
          style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#00000055' }}
        />
        <Text className="text-brand-purple text-sm mt-2 text-center">
          Tap to choose, hold to take photo
        </Text>
      </TouchableOpacity>
      {user && (
        <View className="flex-1 gap-4 p-4">
          <View className="gap-2 ">
            <Text>Username:</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
              className="border border-gray-400 p-2 rounded-xl"
              placeholder={user.username ? user.username : "Username"}
            />
          </View>
          <View className="gap-2">
            <Text>Password:</Text>
            <TextInput
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              className="border border-gray-400 p-2 rounded-xl"
              placeholder={"*********"}
            />
          </View>

          <Text>{formData.username}</Text>
          <Text>{formData.password}</Text>

          <TouchableOpacity
            onPress={submitChanges}
            className={`bg-brand-purple p-4 rounded-xl mt-auto `}
          >
            <Text className="text-white text-center font-semibold">
              Submit Changes
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomSafeArea>
  );
};

export default editProfile;
