import React, { useState, useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import "../../global.css";

import AntDesign from "@expo/vector-icons/AntDesign";
import TextInputWithLogo from "@/components/TextInputWithLogo";
import LoginIcon from "@/components/LoginIcon";

import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "@/context/authContext";

const LoginScreen = () => {
    const { signIn } = useContext(AuthContext);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            alert("Please fill in both fields");
            return;
        }

        setLoading(true);

        try {
            await signIn(
                loginData.email,
                loginData.password
            );

            router.replace("/home");

        } catch (err) {
            console.log("LOGIN ERROR:", err);
            alert(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient style={{ flex: 1 }} colors={["#340C4C", "#EB7363"]}>
            <StatusBar barStyle="light-content" />

            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={
                        Platform.OS === "ios"
                            ? "padding"
                            : "height"
                    }
                    keyboardVerticalOffset={
                        Platform.OS === "ios"
                            ? 50
                            : 0
                    }
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: "center",
                            padding: 24,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="bg-white max-h-[78%] py-6 m-6 rounded-[48px] flex justify-center px-4">

                            <Image
                                source={require("@assets/redback-logo.png")}
                                className="max-w-[130px] max-h-[130px] self-center mb-6"
                                resizeMode="contain"
                            />

                            <Text className="text-brand-navy text-center text-3xl font-bold">
                                Redback Smart Bike
                            </Text>

                            <View className="gap-4 my-12">

                                <TextInputWithLogo
                                    id="email"
                                    logo={
                                        <AntDesign
                                            name="mail"
                                            size={24}
                                            color="black"
                                        />
                                    }
                                    placeholder="example@gmail.com"
                                    data={loginData}
                                    setData={setLoginData}
                                />

                                <TextInputWithLogo
                                    id="password"
                                    secure
                                    logo={
                                        <AntDesign
                                            name="lock1"
                                            size={28}
                                            color="black"
                                        />
                                    }
                                    placeholder="Enter your password"
                                    data={loginData}
                                    setData={setLoginData}
                                />

                            </View>

                            <TouchableOpacity
                                onPress={handleLogin}
                                className="bg-brand-purple w-2/3 self-center rounded-full px-6 py-4"
                                disabled={loading}
                            >
                                <Text className="text-white text-lg text-center">
                                    {loading
                                        ? "Signing in..."
                                        : "Sign in"}
                                </Text>
                            </TouchableOpacity>

                            <Link
                                className="self-center mt-6"
                                href="/forgot-password"
                            >
                                <Text>
                                    Forgot password?
                                </Text>
                            </Link>

                        </View>

                        <View className="flex flex-grow justify-center gap-4 mt-6">

                            <View className="flex-row justify-between w-1/2 self-center">
                                <LoginIcon image={require("@assets/apple-logo.png")} />
                                <LoginIcon image={require("@assets/facebook.png")} />
                                <LoginIcon image={require("@assets/google.png")} />
                            </View>

                            <Text className="text-white text-center">
                                Don't have an account?{" "}
                                <Link href="/signup">
                                    <Text className="text-brand-purple font-semibold">
                                        Sign up here
                                    </Text>
                                </Link>
                            </Text>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;