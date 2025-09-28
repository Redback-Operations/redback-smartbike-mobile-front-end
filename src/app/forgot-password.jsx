
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useThemeStyles } from "@/hooks/useThemeStyles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { inlineStyles, theme } = useThemeStyles();

  const handleResetPassword = () => {
    if (!email) {
      alert("Please enter your registered email.");
      return;
    }
    // 🚀 Replace this with your backend call later
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient style={{ flex: 1 }} colors={["#340C4C", "#EB7363"]}>
        <SafeAreaView className="flex-1 justify-center px-6">
          <View 
            style={inlineStyles.card} 
            className="rounded-[32px] p-8"
          >
            <Text 
              style={{ color: theme.primary }} 
              className="text-3xl font-bold text-center mb-4"
            >
              Forgot Password
            </Text>
            <Text 
              style={{ color: theme.textSecondary }} 
              className="text-center mb-6"
            >
              Enter your registered email below and we'll send you instructions
              to reset your password.
            </Text>

            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
                color: theme.text,
              }}
              className="border rounded-xl px-4 py-3 mb-6"
            />

            <TouchableOpacity
              onPress={handleResetPassword}
              className="bg-brand-purple rounded-full py-4"
            >
              <Text className="text-white text-center font-semibold">
                Send Reset Link
              </Text>
            </TouchableOpacity>

            <Link href="/" asChild>
              <TouchableOpacity className="mt-6">
                <Text 
                  style={{ color: theme.primary }} 
                  className="text-center"
                >
                  Back to Login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;