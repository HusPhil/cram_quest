import { fetcher } from '../fetcher';
import {
	getLatestCheckInEndRoute,
	getPerfectWeeklyCheckInRewardEndRoute,
} from '../routes/weekly_check_in_routes';
import {
	PerfectWeeklyCheckInRewardRead,
	WeeklyCheckInRead,
} from '../schema/weekly_check_in_schema';

export const getLatestCheckIn = async (
	playerId: number
): Promise<WeeklyCheckInRead> => {
	const response = await fetcher(getLatestCheckInEndRoute(playerId));

	if (response.status !== 200) {
		throw new Error('Failed to fetch latest weekly check in');
	}

	return response.data;
};

export const getPerfectWeeklyCheckInReward = async (
	playerId: number
): Promise<PerfectWeeklyCheckInRewardRead> => {
	const response = await fetcher(
		getPerfectWeeklyCheckInRewardEndRoute(playerId)
	);

	if (response.status !== 200) {
		throw new Error(
			'Failed to fetch getPerfectWeeklyCheckInRewardEndRoute'
		);
	}

	return response.data;
};
