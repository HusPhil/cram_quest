// src/lib/axios/token.ts
import { toast } from 'react-toastify';
import { useAuthInformationStore } from '../../features/Auth/stores/authInformationStore';
import { useUserPlayerStore } from '../../features/Auth/stores/userPlayerStore/userPlayerStore';
import { BASE_URL } from '../../services/api/api';
import { RefreshTokenResponse } from '../../services/api/schema/auth_schema';
import { axiosInstance } from './axiosInstance';

// Pure API function - no side effects
export async function refreshSession(): Promise<RefreshTokenResponse> {
	try {
		const response = await fetch(`${BASE_URL}/auth/refresh_session`, {
			method: 'POST',
			credentials: 'include',
		});

		if (response.status !== 200) {
			const errorData = await response.json();
			if (errorData.detail.toLowerCase().includes('session expired')) {
				toast.error('Session expired', {
					toastId: 'session-expired',
					autoClose: false,
				});
			}
			throw new Error(errorData.detail);
		}

		return await response.json();
	} catch (error) {
		console.error('[catch] Failed to refresh token', error);
		throw error;
	}
}

// Utility function to update stores
export function updateStoresFromRefreshData(data: RefreshTokenResponse) {
	const setCurrentAccessToken =
		useAuthInformationStore.getState().setAcessToken;
	const setPlayerCurrentUserId = useAuthInformationStore.getState().setUserId;
	const setPlayerCurrentPlayerId =
		useAuthInformationStore.getState().setPlayerId;

	setCurrentAccessToken(data.access_token);
	setPlayerCurrentUserId(data.user_session_info.id);
	setPlayerCurrentPlayerId(data.player_session_info.id);

	const setCurrentUser = useUserPlayerStore.getState().setUser;
	setCurrentUser({
		userId: data.user_session_info.id,
		username: data.user_session_info.username,
		email: data.user_session_info.email,
		is_active: data.user_session_info.is_active,
		is_admin: data.user_session_info.is_admin,
	});

	const setUserPlayer = useUserPlayerStore.getState().setPlayer;
	setUserPlayer({
		playerId: data.player_session_info.id,
		title: data.player_session_info.title,
		level: data.player_session_info.level,
		experience: data.player_session_info.experience,
		next_level_xp: data.player_session_info.next_level_xp,
		daily_streak: data.player_session_info.daily_streak,
		longest_daily_streak: data.player_session_info.longest_daily_streak,
		session_streak: data.player_session_info.session_streak,
		longest_session_streak: data.player_session_info.longest_session_streak,
	});

	const setPlayerProfile = useUserPlayerStore.getState().setProfile;
	setPlayerProfile({
		profileId: data.profile_session_info.id,
		avatarUrl: data.profile_session_info.avatar_url,
		bio: data.profile_session_info.bio!,
		mood: data.profile_session_info.mood!,
	});
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
