import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import "../../global.css";
import AntDesign from "@expo/vector-icons/AntDesign";
import TextInputWithLogo from "@/components/TextInputWithLogo";
import LoginIcon from "@/components/LoginIcon";
import { Link, router, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/context/authContext";
import { useThemeStyles } from "@/hooks/useThemeStyles";
import * as ImagePicker from "expo-image-picker"; // ✅ added

const SignUp = () => {
  const { setUser } = useContext(AuthContext);
  const { inlineStyles, theme } = useThemeStyles();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [photo, setPhoto] = useState(null); // ✅ local photo state

  // ✅ Image Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    //PRODUCTION CODE
    // if (!userData.username || !userData.email || !userData.password) {
    //   alert("Please complete all fields");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("username", userData.username);
    // formData.append("email", userData.email);
    // formData.append("password", userData.password);

    // if (photo) {
    //   const filename = photo.split("/").pop();
    //   const match = /\.(\w+)$/.exec(filename ?? "");
    //   const type = match ? `image/${match[1]}` : `image`;
    //   formData.append("photo", { uri: photo, name: filename, type });
    // }

    // const response = await fetch(`http://0.0.0.0:8000/signup/`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // });

    // switch (response.status) {
    //   case 409:
    //     alert("This email or username already exists");
    //     break;
    //   case 400:
    //     alert("An error occured");
    //     break;
    //   case 201:
    //     const data = await response.json();
    //     setUser({
    //       id: data.id,
    //       username: data.username,
    //       email: data.email,
    //       photo: data.photo ?? null, // ✅ store server photo url
    //     });
    //     router.replace("/home");
    //     break;
    // }

    //DEV CODE
    router.replace("/home");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient style={{ flex: 1 }} colors={["#340C4C", "#EB7363"]}>
        <StatusBar barStyle={"light-content"} />
        <SafeAreaView>
          <View 
            style={[inlineStyles.card, { maxHeight: '78%' }]} 
            className="py-6 m-6 rounded-[48px] flex justify-center px-4"
          >
            <Image
              source={require("@assets/redback-logo.png")}
              className="max-w-[130px] max-h-[130px] self-center mb-6"
              resizeMode="contain"
            />
            <Text 
              style={{ color: theme.secondary }} 
              className="text-center text-3xl font-bold"
            >
              Tell Us About Yourself
            </Text>
            <Text 
              style={inlineStyles.text} 
              className="text-xl font-semibold text-center"
            >
              Create an Account
            </Text>
            <View className="gap-4 my-12">
              <TextInputWithLogo
                data={userData}
                setData={setUserData}
                placeholder={"Name"}
                logo={<AntDesign name="user" size={24} color={theme.text} />}
                id="username"
              />
              <TextInputWithLogo
                data={userData}
                setData={setUserData}
                logo={<AntDesign name="mail" size={24} color={theme.text} />}
                placeholder={"example@gmail.com"}
                id={"email"}
              />
              <TextInputWithLogo
                data={userData}
                setData={setUserData}
                secure
                logo={<AntDesign name="lock1" size={28} color={theme.text} />}
                placeholder={"Enter your password"}
                id={"password"}
              />

              {/* ✅ Photo Upload Button */}
              <TouchableOpacity
                onPress={pickImage}
                style={{ backgroundColor: theme.surface }}
                className="w-2/3 self-center rounded-full px-6 py-3 mt-4"
              >
                <Text 
                  style={{ color: theme.secondary }} 
                  className="text-center"
                >
                  {photo ? "Change Photo" : "Upload Photo (Optional)"}
                </Text>
              </TouchableOpacity>

              {/* ✅ Show selected photo preview */}
              {photo && (
                <Image
                  source={{ uri: photo }}
                  className="w-24 h-24 rounded-full self-center mt-3"
                />
              )}
            </View>

            <TouchableOpacity
              onPress={handleSignup}
              className="bg-brand-purple w-2/3 self-center rounded-full px-6 py-4"
            >
              <Text className="text-white text-lg text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-grow justify-center gap-4">
            <View className="flex-row justify-between w-1/2 self-center">
              <LoginIcon image={require("@assets/apple-logo.png")} />
              <LoginIcon image={require("@assets/facebook.png")} />
              <LoginIcon image={require("@assets/google.png")} />
            </View>
            <Text className="text-white text-center">
              Already have an account?{" "}
              <Link href={"/"}>
                <Text 
                  style={{ color: theme.primary }} 
                  className="font-semibold"
                >
                  Sign in here
                </Text>
              </Link>
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;