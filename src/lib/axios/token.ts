// src/lib/axios/token.ts
import { usePlayerInformationStore } from '../../features/Auth/store/playerInformationStore';
import { BASE_URL } from '../../services/api/api';
import { RefreshTokenResponse } from '../../services/api/schema/auth_schema';
import { axiosInstance } from './axiosInstance';

// Function to refresh the access token
export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
	try {
		const response = await fetch(`${BASE_URL}/auth/refresh_token`, {
			method: 'POST',
			credentials: 'include', // Ensure cookies are sent with request
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Failed to refresh token');
		}

		const setCurrentAccessToken =
			usePlayerInformationStore.getState().setAcessToken;

		const setPlayerCurrentUserId =
			usePlayerInformationStore.getState().setUserId;

		const setPlayerCurrentPlayerId =
			usePlayerInformationStore.getState().setPlayerId;

		setCurrentAccessToken(data.access_token);
		setPlayerCurrentUserId(data.user_id);
		setPlayerCurrentPlayerId(data.player_id);

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
export const updateAuthHeaderFromStore = () => {
	const currentAccessToken = usePlayerInformationStore.getState().accessToken;
	setAuthHeader(currentAccessToken!); // Set the token from context to the axios headers
};
