export type FakeLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

function base64UrlEncode(obj: any) {
  const json = JSON.stringify(obj);
  // simple base64url without external libs
  const b64 = globalThis.btoa
    ? globalThis.btoa(json)
    : Buffer.from(json, "utf-8").toString("base64");

  return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export async function fakeLogin(email: string, password: string): Promise<FakeLoginResponse> {
  await new Promise((r) => setTimeout(r, 400));

  if (!email || !password) throw new Error("Missing credentials");

  const header = base64UrlEncode({ alg: "none", typ: "JWT" });
  const payload = base64UrlEncode({
    sub: email,
    role: "user",
    // fake expiry (1 hour)
    exp: Math.floor(Date.now() / 1000) + 3600,
  });
  const signature = "mock-signature";

  return {
    accessToken: `${header}.${payload}.${signature}`,
    refreshToken: `mock-refresh-${Date.now()}`,
  };
}