import React, { useContext, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";

const SignUp = () => {
    const { signUp, loading } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [photo, setPhoto] = useState(null);

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
        if (!userData.username || !userData.email || !userData.password) {
            alert("Please complete all fields");
            return;
        }

        try {
            await signUp(userData.email, userData.password, userData.username);
            router.replace("/home");
        } catch (err) {
            alert(err.message || "Signup failed");
        }
    };

    return (
        <LinearGradient style={{ flex: 1 }} colors={["#340C4C", "#EB7363"]}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: "center",
                            padding: 24,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="bg-white py-6 m-6 rounded-[48px] px-4">
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
                                    placeholder="Name"
                                    logo={<AntDesign name="user" size={24} color="black" />}
                                    id="username"
                                />
                                <TextInputWithLogo
                                    data={userData}
                                    setData={setUserData}
                                    placeholder="example@gmail.com"
                                    logo={<AntDesign name="mail" size={24} color="black" />}
                                    id="email"
                                />
                                <TextInputWithLogo
                                    data={userData}
                                    setData={setUserData}
                                    placeholder="Enter your password"
                                    secure
                                    logo={<AntDesign name="lock1" size={28} color="black" />}
                                    id="password"
                                />

                                {/* Photo Upload */}
                                <TouchableOpacity
                                    onPress={pickImage}
                                    className="bg-gray-200 w-2/3 self-center rounded-full px-6 py-3 mt-4"
                                >
                                    <Text className="text-center text-brand-navy">
                                        {photo ? "Change Photo" : "Upload Photo (Optional)"}
                                    </Text>
                                </TouchableOpacity>

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
                                disabled={loading}
                            >
                                <Text className="text-white text-lg text-center">
                                    {loading ? "Creating Account..." : "Create Account"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex flex-grow justify-center gap-4 mt-6">
                            <View className="flex-row justify-between w-1/2 self-center">
                                <LoginIcon image={require("@assets/apple-logo.png")} />
                                <LoginIcon image={require("@assets/facebook.png")} />
                                <LoginIcon image={require("@assets/google.png")} />
                            </View>
                            <Text className="text-white text-center">
                                Already have an account?{" "}
                                <Link href="/">
                                    <Text className="text-brand-purple font-semibold">Sign in here</Text>
                                </Link>
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SignUp;