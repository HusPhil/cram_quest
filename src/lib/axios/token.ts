// src/lib/axios/token.ts
import { useAuthInformationStore } from '../../features/Auth/stores/authInformationStore';
import { useUserPlayerStore } from '../../features/Auth/stores/userPlayerStore';
import { BASE_URL } from '../../services/api/api';
import { RefreshTokenResponse } from '../../services/api/schema/auth_schema';
import { axiosInstance } from './axiosInstance';

// Function to refresh the access token
export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
	try {
		const response = await fetch(`${BASE_URL}/auth/refresh_session`, {
			method: 'POST',
			credentials: 'include', // Ensure cookies are sent with request
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to refresh token');
		}

		const data: RefreshTokenResponse = await response.json();

		console.log('data: ', data);

		const setCurrentAccessToken =
			useAuthInformationStore.getState().setAcessToken;

		const setPlayerCurrentUserId =
			useAuthInformationStore.getState().setUserId;

		const setPlayerCurrentPlayerId =
			useAuthInformationStore.getState().setPlayerId;

		setCurrentAccessToken(data.access_token);
		setPlayerCurrentUserId(data.user_session_info.id);
		setPlayerCurrentPlayerId(data.player_session_info.id);

		const setPlayerProfile = useUserPlayerStore.getState().setPlayerProfile;
		setPlayerProfile(
			data.profile_session_info.id,
			data.profile_session_info.avatar_url,
			data.profile_session_info.bio!,
			data.profile_session_info.mood!
		);

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
	const currentAccessToken = useAuthInformationStore.getState().accessToken;
	setAuthHeader(currentAccessToken!); // Set the token from context to the axios headers
};
