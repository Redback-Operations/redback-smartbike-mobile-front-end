import { useEffect } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "./AuthContext";

// Public screens in your stack
const PUBLIC_ROUTES = ["/", "/index", "/signup", "/forgot-password"];

function isPublic(pathname: string) {
  return PUBLIC_ROUTES.includes(pathname);
}

export default function AuthGate() {
  const { isBooting, isAuthed } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isBooting) return;

    // If not authed, block access to everything except public pages
    if (!isAuthed && !isPublic(pathname)) {
      router.replace("/index");
      return;
    }

    // If authed, keep them out of login/signup
    if (isAuthed && (pathname === "/index" || pathname === "/signup" || pathname === "/")) {
      // IMPORTANT: this must match your actual “main app” route
      // If your main screen is /home, use "/home"
      router.replace("/home");
    }
  }, [isBooting, isAuthed, pathname, router]);

  return null;
}