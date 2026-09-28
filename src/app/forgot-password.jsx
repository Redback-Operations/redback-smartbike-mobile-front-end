import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useAuth } from "@/context/authContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your registered email.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return;
    }

    setError("");
    setSending(true);
    try {
      const { error: resetError } = await resetPassword(trimmedEmail);

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSent(true);
    } catch (err) {
      setError("Something went wrong while sending the reset link. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["#340C4C", "#EB7363"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView className="flex-1 justify-center px-6">
          <View className="bg-white rounded-[32px] p-8">
            <Text className="text-3xl font-bold text-center text-brand-purple mb-4">
              Forgot Password
            </Text>

            {sent ? (
              <>
                <Text className="text-gray-700 text-center mb-6">
                  If an account exists for {email.trim()}, a password reset link has
                  been sent. Please check your inbox and spam folder.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="border border-brand-purple rounded-full py-4"
                >
                  <Text className="text-brand-purple text-center font-semibold">
                    Use a different email
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text className="text-gray-600 text-center mb-6">
                  Enter your registered email below and we will send you
                  instructions to reset your password.
                </Text>

                <TextInput
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError("");
                  }}
                  onSubmitEditing={handleResetPassword}
                  editable={!sending}
                  accessibilityLabel="Email address"
                  className={`border rounded-xl px-4 py-3 ${
                    error ? "border-red-500 mb-2" : "border-gray-300 mb-6"
                  }`}
                />

                {error ? (
                  <Text className="text-red-600 text-sm mb-4">{error}</Text>
                ) : null}

                <TouchableOpacity
                  onPress={handleResetPassword}
                  disabled={sending}
                  className={`rounded-full py-4 ${sending ? "bg-gray-400" : "bg-brand-purple"}`}
                >
                  {sending ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center font-semibold">
                      Send Reset Link
                    </Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            <Link href="/" asChild>
              <TouchableOpacity className="mt-6">
                <Text className="text-brand-purple text-center">
                  Back to Login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ForgotPassword;