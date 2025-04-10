// src/lib/axios/token.ts
import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "./axiosInstance";

// Function to retrieve the auth token
export function getAuthToken() {
  const { accessToken } = useAuth();
  return accessToken; // Replace with actual logic (e.g., from localStorage or context)
}

// Function to refresh the access token
export async function refreshAccessToken() {
  try {
    const response = await fetch("/auth/refresh", {
      method: "POST",
      credentials: "include", // Ensure cookies are sent with request
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}

// Function to set the Authorization header globally
export function setAuthHeader(token: string) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
