import { BASE_URL } from '../../../data/api';
import { fetcher } from '../fetcher';
import { getPlayerByUserEndRoute } from '../router/user_routers';
import { PlayerRead } from '../schema/player_schema';

export const getPlayerByUser = async (userId: number): Promise<PlayerRead> => {
	const response = await fetcher(
		`${BASE_URL}${getPlayerByUserEndRoute(userId)}`
	);

	console.log('GetSubects: ', response);

	if (response.status !== 200) {
		throw new Error('Failed to fetch player by id');
	}

	return response.data;
};
