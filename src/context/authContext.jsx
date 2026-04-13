import "react-native-url-polyfill/auto";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bylihttcbjwpqmketsam.supabase.co";
const supabaseAnonKey = "sb_publishable_HE_fQmaCn7Wfsc9pl1sVsw_lwAAks1v";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const AuthContext = createContext();

const formatUser = (supabaseUser) => {
  if (!supabaseUser) return null;

  return {
    id: supabaseUser.id,
    username:
      supabaseUser.user_metadata?.username ||
      supabaseUser.email?.split("@")[0] ||
      "User",
    email: supabaseUser.email || "",
    rawUser: supabaseUser,
  };
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log("Get session error:", error.message);
      }

      if (mounted) {
        const currentSession = data?.session ?? null;
        setSession(currentSession);
        setUser(formatUser(currentSession?.user));
        setLoading(false);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      setUser(formatUser(newSession?.user));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      supabase,

      signIn: async (email, password) => {
        const response = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (response?.data?.session) {
          setSession(response.data.session);
          setUser(formatUser(response.data.session.user));
        }

        return response;
      },

      signUp: async (email, password, username = "") => {
        const response = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              username: username.trim(),
            },
          },
        });

        if (response?.data?.session) {
          setSession(response.data.session);
          setUser(formatUser(response.data.session.user));
        }

        return response;
      },

      signOut: async () => {
        const response = await supabase.auth.signOut();

        if (!response.error) {
          setSession(null);
          setUser(null);
        }

        return response;
      },

      resetPassword: async (email) => {
        return await supabase.auth.resetPasswordForEmail(email.trim());
      },

      setUser,
    }),
    [session, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};