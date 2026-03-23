import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, register } from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // LOGIN
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const data = await login(email, password);

            if (data.error) {
                throw new Error(data.error);
            }

            setUser(data.session.user);

            await AsyncStorage.setItem(
                "token",
                data.session.access_token
            );

        } catch (err) {
            console.log("signIn error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // REGISTER
    const signUp = async (email, password, username) => {
        setLoading(true);
        try {
            const data = await register(
                email,
                password,
                username
            );

            if (data.error) {
                throw new Error(data.error);
            }

            setUser(data.user);

            if (data.session?.access_token) {
                await AsyncStorage.setItem(
                    "token",
                    data.session.access_token
                );
            }

        } catch (err) {
            console.log("signUp error:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setUser(null);
        await AsyncStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};