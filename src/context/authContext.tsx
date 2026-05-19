import "react-native-url-polyfill/auto";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, Session, User } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

type FormattedUser = {
  id: string;
  username: string;
  email: string;
  rawUser: User;
} | null;

type AuthContextType = {
  session: Session | null;
  user: FormattedUser;
  loading: boolean;
  supabase: typeof supabase;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, username?: string) => Promise<any>;
  signOut: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  setUser: React.Dispatch<React.SetStateAction<FormattedUser>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const formatUser = (supabaseUser: User | null | undefined): FormattedUser => {
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<FormattedUser>(null);
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

      signIn: async (email: string, password: string) => {
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

      signUp: async (email: string, password: string, username = "") => {
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

      resetPassword: async (email: string) => {
        return await supabase.auth.resetPasswordForEmail(email.trim());
      },

      setUser,
    }),
    [session, user, loading],
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
