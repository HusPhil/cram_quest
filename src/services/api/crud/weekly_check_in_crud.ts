import { fetcher } from '../fetcher';
import { getLatestCheckInEndRoute } from '../routes/weekly_check_in_routes';
import { WeeklyCheckInRead } from '../schema/weekly_check_in_schema';

export const getLatestCheckIn = async (
	playerId: number
): Promise<WeeklyCheckInRead> => {
	const response = await fetcher(getLatestCheckInEndRoute(playerId));

	if (response.status !== 200) {
		throw new Error('Failed to fetch latest weekly check in');
	}

	console.log('getLatestCheckIn response: ', response.data);

	return response.data;
};
