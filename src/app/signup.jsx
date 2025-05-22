import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import "../../global.css";
import AntDesign from "@expo/vector-icons/AntDesign";
import TextInputWithLogo from "@/components/TextInputWithLogo";
import LoginIcon from "@/components/LoginIcon";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/context/authContext";

const SignUp = () => {
  const { setUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

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

  const handleSignup = async () => {
    if (!userData.username || !userData.email || !userData.password) {
      alert("Please complete all fields");
      return;
    }

    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    if (image) {
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("profile_photo", {
        uri: image,
        name: filename,
        type,
      });
    }

    // try {
    //   const response = await fetch("http://0.0.0.0:8000/signup/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Accept: "application/json",
    //     },
    //     body: formData,
    //   });

    //   switch (response.status) {
    //     case 409:
    //       alert("This email or username already exists");
    //       break;
    //     case 400:
    //       alert("An error occurred");
    //       break;
    //     case 201:
    //       const data = await response.json();
    //       setUser({
    //         id: data.id,
    //         username: data.username,
    //         email: data.email,
    //       });
    //       router.replace("/home");
    //       break;
    //     default:
    //       alert("Unexpected error");
    //   }
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   alert("Network error");
    // }

    // DEV ONLY
    router.replace("/home");
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#340C4C", "#EB7363"]}>
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView>
        <View className="bg-white max-h-[78%] py-6 m-6 rounded-[48px] justify-center px-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={require("@assets/redback-logo.png")}
                className="self-center mb-6"
                style={{width:130, height:130}}
                resizeMode="contain"
              />
              <Text className="text-brand-navy text-center text-3xl font-bold">
                Tell Us About Yourself
              </Text>
              <Text className="text-xl font-semibold text-center">
                Create an Account
              </Text>

              {/* Profile Image */}
              <View className="items-center mb-6 mt-6">
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
              </View>

              <View className="gap-4 my-6">
                <TextInputWithLogo
                  data={userData}
                  setData={setUserData}
                  placeholder={"Name"}
                  logo={<AntDesign name="user" size={24} color="black" />}
                  id="username"
                />
                <TextInputWithLogo
                  data={userData}
                  setData={setUserData}
                  logo={<AntDesign name="mail" size={24} color="black" />}
                  placeholder={"example@gmail.com"}
                  id={"email"}
                />
                <TextInputWithLogo
                  data={userData}
                  setData={setUserData}
                  secure
                  logo={<AntDesign name="lock1" size={28} color="black" />}
                  placeholder={"Enter your password"}
                  id={"password"}
                />
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
          </ScrollView>
        </View>

        {/* Social & Navigation */}
        <View className="flex flex-grow justify-center gap-4">
          <View className="flex-row justify-between w-1/2 self-center">
            <LoginIcon image={require("@assets/apple-logo.png")} />
            <LoginIcon image={require("@assets/facebook.png")} />
            <LoginIcon image={require("@assets/google.png")} />
          </View>
          <Text className="text-white text-center">
            Already have an account?{" "}
            <Link href={"/"}>
              <Text className="text-brand-purple font-semibold">
                Sign in here
              </Text>
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUp;
