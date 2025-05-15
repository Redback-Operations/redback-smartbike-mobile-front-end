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

const SignUp = () => {
  const { setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSignup = async () => {
    //PRODUCTION CODE
    // if (!userData.username || !userData.email || !userData.password) {
    //   alert("Please complete all fields");
    //   return;
    // }
    // const response = await fetch(`http://0.0.0.0:8000/signup/`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
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
          <View className="bg-white max-h-[78%] py-6 m-6 rounded-[48px] flex justify-center px-4">
            <Image
              source={require("@assets/redback-logo.png")}
              className="max-w-[130px] max-h-[130px] self-center mb-6"
              resizeMode="contain"
            />
            <Text className="text-brand-navy text-center text-3xl font-bold">
              Tell Us About Yourself
            </Text>
            <Text className="text-xl font-semibold text-center">
              Create an Account
            </Text>
            <View className="gap-4 my-12">
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
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
