import { useEffect } from "react";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "./AuthContext";

const PUBLIC_ROUTES = ["/", "/signup", "/forgot-password"];

function isPublic(pathname: string) {
  return PUBLIC_ROUTES.includes(pathname);
}

export default function AuthGate() {
  const { isBooting, isAuthed } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isBooting) return;

    // Not authed: block everything except public routes
    if (!isAuthed && !isPublic(pathname)) {
      router.replace("/");
      return;
    }

    // Authed: keep out of auth screens
    if (isAuthed && isPublic(pathname)) {
      router.replace("/home");
      return;
    }
  }, [isBooting, isAuthed, pathname]);

  return null;
}
