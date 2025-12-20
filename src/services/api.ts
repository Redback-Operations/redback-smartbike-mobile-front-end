import axios from "axios";
import { getAccessToken } from "../auth/tokenStorage";

export const api = axios.create({
  baseURL: "http://placeholder.local", // swap to real backend later
  timeout: 15000,
});

// Requirement: do not validate token in FE, just send/retrieve it
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});