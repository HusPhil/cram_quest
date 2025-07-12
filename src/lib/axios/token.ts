// src/lib/axios/token.ts
import {
	getExternalCurrentUserIdSetter,
	getExternalTokenSetter,
	useAuth,
} from '../../context/AuthContext';
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

		console.log('data: ', data);

		const setToken = getExternalTokenSetter();
		if (setToken) setToken(data.access_token);

		const setCurrentUserId = getExternalCurrentUserIdSetter();
		if (setCurrentUserId) setCurrentUserId(data.user_id);

		const setPlayerCurrentUser =
			usePlayerInformationStore.getState().setUserId;

		const setPlayerCurrentPlayer =
			usePlayerInformationStore.getState().setPlayerId;

		setPlayerCurrentUser(data.user_id);
		setPlayerCurrentPlayer(data.player_id);

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
