import { fetcher } from '../fetcher';
import { getPlayerSkinsEndRoute } from '../routes/player_inventory_item_routes';
import {
	getPlayerBossAvailabilityCounterEndRoute,
	getPlayerProfileEndRoute,
	getPlayerSubjectsEndRoute,
} from '../routes/player_routes';
import { PlayerInventoryItemRead } from '../schema/player_inventory_item_schema';
import { ProfileRead } from '../schema/profile_schema';
import { SubjectRead } from '../schema/subject_schema';

export const getPlayerSubjects = async (
	playerId: number
): Promise<SubjectRead[]> => {
	const response = await fetcher(getPlayerSubjectsEndRoute(playerId));

	console.log('GetSubects: ', response.headers);

	if (response.status !== 200) {
		throw new Error('Failed to fetch subjects');
	}

	return response.data;
};

export const getPlayerProfile = async (
	playerId: number
): Promise<ProfileRead> => {
	const response = await fetcher(getPlayerProfileEndRoute(playerId));

	console.log('PLayer Profile: ', response);

	if (response.status !== 200) {
		throw new Error('Failed to fetch subjects');
	}

	return response.data;
};

export const getPlayerBossAvailabilityCounter = async (
	playerId: number
): Promise<number> => {
	const response = await fetcher(
		getPlayerBossAvailabilityCounterEndRoute(playerId)
	);

	if (response.status !== 200) {
		throw new Error('Failed to fetch boss availability counter');
	}

	console.log('getPlayerBossAvailabilityCounter response: ', response.data);

	return response.data;
};

export const getPlayerSkins = async (
	playerId: number
): Promise<PlayerInventoryItemRead[]> => {
	const response = await fetcher(getPlayerSkinsEndRoute(playerId));

	if (response.status !== 200) {
		throw new Error('Failed to player skins');
	}

	console.log('getPlayerSkins response: ', response.data);

	return response.data;
};
