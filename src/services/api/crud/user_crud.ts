import { fetcher } from '../fetcher';
import { getUserEndRoute, getUserPlayerEndRoute } from '../routes/user_routes';
import { PlayerRead } from '../schema/player_schema';
import { UserRead } from '../schema/user_schema';

export const getUser = async (userId: number): Promise<UserRead> => {
	const response = await fetcher(getUserEndRoute(userId));

	if (response.status !== 200) {
		throw new Error('Failed to fetch player by id');
	}

	return response.data;
};

export const getUserPlayer = async (userId: number): Promise<PlayerRead> => {
	const response = await fetcher(getUserPlayerEndRoute(userId));

	if (response.status !== 200) {
		throw new Error('Failed to fetch player by id');
	}

	return response.data;
};
