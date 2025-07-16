import { fetcher } from '../fetcher';
import {
	getPlayerProfileEndRoute,
	getPlayerSubjectsEndRoute,
} from '../routes/player_routes';
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
