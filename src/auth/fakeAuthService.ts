export type FakeLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function fakeLogin(email: string, password: string): Promise<FakeLoginResponse> {
  await new Promise((r) => setTimeout(r, 400));
  if (!email || !password) throw new Error("Missing credentials");

  // Fake JWT-like string (no base64 needed for MVP)
  const accessToken = `mockHeader.${email}.${Date.now()}`;
  const refreshToken = `mockRefresh.${Date.now()}`;

  return { accessToken, refreshToken };
}
