import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAccessToken, saveTokens, clearTokens } from "./tokenStorage";
import { fakeLogin } from "./fakeAuthService";

type AuthValue = {
  isBooting: boolean;
  isAuthed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setIsAuthed(!!token);
      setIsBooting(false);
    })();
  }, []);

  async function signIn(email: string, password: string) {
    // Fake JWT for MVP
    const { accessToken, refreshToken } = await fakeLogin(email, password);
    await saveTokens(accessToken, refreshToken);
    setIsAuthed(true);
  }

async function signOut() {
  console.log("[signOut] start");

  // flip state immediately
  setIsAuthed(false);

  // clear storage
  await clearTokens();

  // confirm storage is actually cleared
  const tokenAfter = await getAccessToken();
  console.log("[signOut] token after clear =", tokenAfter);

  console.log("[signOut] done");
  }

  const value = useMemo(() => ({ isBooting, isAuthed, signIn, signOut }), [isBooting, isAuthed]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}