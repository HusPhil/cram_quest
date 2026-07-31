import { redirect } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { refreshSession, updateStoresFromRefreshData } from './lib/axios/token';
import { getLatestCheckIn } from './services/api/crud/weekly_check_in_crud';
import {
	getPlayerSkins,
	getPlayerSubjects,
} from './services/api/crud/player_crud';
import { RefreshTokenResponse } from './services/api/schema/auth_schema';

const REFRESH_SESSION_KEY = ['refreshSession'] as const;

const ensureSession = (): Promise<RefreshTokenResponse> =>
	queryClient.ensureQueryData({
		queryKey: REFRESH_SESSION_KEY,
		queryFn: refreshSession,
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});

export const requireAuthLoader = async () => {
	try {
		const data = await ensureSession();
		updateStoresFromRefreshData(data);
		return null;
	} catch {
		return redirect('/auth');
	}
};

export const rejectAuthLoader = async () => {
	try {
		const data = await ensureSession();
		updateStoresFromRefreshData(data);
		return redirect('/home/check-in');
	} catch {
		return null;
	}
};

const getSessionPlayerId = async (): Promise<number | null> => {
	try {
		const data = await ensureSession();
		return data.player_session_info.id;
	} catch {
		return null;
	}
};

export const checkInLoader = async () => {
	const playerId = await getSessionPlayerId();
	if (playerId == null) return null;
	await queryClient.prefetchQuery({
		queryKey: ['weekly_check_in', playerId],
		queryFn: () => getLatestCheckIn(playerId),
	});
	return null;
};

export const subjectsLoader = async () => {
	const playerId = await getSessionPlayerId();
	if (playerId == null) return null;
	await queryClient.prefetchQuery({
		queryKey: ['players', playerId, 'subjects'],
		queryFn: () => getPlayerSubjects(playerId),
	});
	return null;
};

export const skinsLoader = async () => {
	const playerId = await getSessionPlayerId();
	if (playerId == null) return null;
	await queryClient.prefetchQuery({
		queryKey: ['player', playerId, 'skins'],
		queryFn: () => getPlayerSkins(playerId),
	});
	return null;
};
