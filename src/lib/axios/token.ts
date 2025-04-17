// src/lib/axios/token.ts
import { useAuth } from '../../context/AuthContext';
import { BASE_URL } from '../../data/api';
import { RefreshTokenResponse } from '../../services/api/schema/auth_schema';
import { axiosInstance } from './axiosInstance';

// Function to retrieve the auth token
export function getAuthToken() {
	const { accessToken } = useAuth();
	return accessToken; // Replace with actual logic (e.g., from localStorage or context)
}

// Function to refresh the access token
export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
	try {
		const response = await fetch(`${BASE_URL}/auth/refresh_token`, {
			method: 'POST',
			credentials: 'include', // Ensure cookies are sent with request
		});

		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Failed to refresh token', error);
		throw error;
	}
}

// Function to set the Authorization header globally
export function setAuthHeader(token: string) {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// This can be used directly in interceptors to set the token from context dynamically.
export const updateAuthHeaderFromContext = () => {
	const { accessToken } = useAuth();
	setAuthHeader(accessToken); // Set the token from context to the axios headers
};
