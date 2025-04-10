// src/services/api/crud/auth/refresh.ts

import { axiosInstance } from "../../../../lib/axios/axiosInstance";
import { refreshTokenEndRoute } from "../../router/auth_router";


// Function to refresh the access token
export async function refreshToken() {
  try {
    const response = await axiosInstance.post(
      refreshTokenEndRoute,
      {},
      {
        withCredentials: true, // needed to send cookies
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}
