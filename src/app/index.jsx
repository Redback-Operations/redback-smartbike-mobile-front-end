
import { ActivityIndicator } from "react-native";
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
import React, { useState, useContext } from "react";
import "../../global.css";
import AntDesign from "@expo/vector-icons/AntDesign";
import TextInputWithLogo from "@/components/TextInputWithLogo";
import LoginIcon from "@/components/LoginIcon";
import { Link, router, useNavigation } from "expo-router";
import "@expo/metro-runtime";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/context/authContext";

const index = () => {
  const { setUser } = useContext(AuthContext);
  const handleLogin = async () => {
    setLoading(true); // start loading

    try {
      // simulate login delay (you can replace this with API call later)
      setTimeout(() => {
        setLoading(false); // stop loading
        router.replace("/home"); // go to home page
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
    // production code
    // const response = await fetch(`http://0.0.0.0:8000/login/`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(loginData),
    // });
    // switch (response.status) {
    //   case 404:
    //     alert("Invalid credentials: email doesn't exist");
    //     break;
    //   case 401:
    //     alert("Invalid credentials: incorrect password");
    //     break;
    //   case 200:
    //     const data = await response.json();
    //     setUser({
    //       id: data.id,
    //       username: data.account_details[0].username,
    //       email: data.account_details[0].email,
    //     });
    //     router.replace("/home");
    //     break;
    // }
    // dev code
    router.replace("/home");
  };
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
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
            <Text className="text-brand-navy text-center text-4xl font-regular tracking-wide">
              Redback Smart Bike
            </Text>
            <Text className="text-gray-600 text-center text-base mt-2">
              Smarter rides, better health 🚴
            </Text>
            <View className="gap-4 my-12">
              <TextInputWithLogo
                id={"email"}
                logo={<AntDesign name="mail" size={24} color="black" />}
                placeholder={"example@gmail.com"}
                data={loginData}
                setData={setLoginData}
              />
              <TextInputWithLogo
                id={"password"}
                secure
                logo={<AntDesign name="lock1" size={28} color="black" />}
                placeholder={"Enter your password"}
                data={loginData}
                setData={setLoginData}
              />
            </View>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading} // disable while loading
              className="bg-brand-purple w-2/3 self-center rounded-full px-6 py-4 items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-xl font-bold text-center">Let's Ride</Text>
              )}
            </TouchableOpacity>

            <Link className="self-center mt-6" href={"/forgot-password"}>
              <Text>Forgot password?</Text>
            </Link>
          </View>
          <View className="flex flex-grow justify-center gap-4">
            <Text className="text-white-500 text-center my-2">or continue with</Text>
            <View className="flex-row justify-between w-1/2 self-center">
              <LoginIcon image={require("@assets/apple-logo.png")} />
              <LoginIcon image={require("@assets/facebook.png")} />
              <LoginIcon image={require("@assets/google.png")} />
            </View>
            <Text className="text-white text-center">
              Dont have an account?<Text> </Text>
              <Link href={"/signup"}>
                <Text className="text-brand-purple font-semibold">
                  Sign up here
                </Text>
              </Link>
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default index;
