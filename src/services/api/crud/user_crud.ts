import { BASE_URL } from '../../../data/api';
import { fetcher } from '../fetcher';
import { getUserPlayerEndRoute } from '../routes/user_routes';
import { PlayerRead } from '../schema/player_schema';

export const getUserPlayer = async (userId: number): Promise<PlayerRead> => {
	const response = await fetcher(
		`${BASE_URL}${getUserPlayerEndRoute(userId)}`
	);

	if (response.status !== 200) {
		throw new Error('Failed to fetch player by id');
	}

	return response.data;
};
