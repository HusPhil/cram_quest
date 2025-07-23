import { BASE_URL } from '../api';

const baseWeeklyCheckInRoute = 'weekly_check_in';

export const getCheckInEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseWeeklyCheckInRoute}/check_in/${playerId}`;
};

export const getLatestCheckInEndRoute = (playerId: number) => {
	return `${BASE_URL}/${baseWeeklyCheckInRoute}/check_in/latest/${playerId}`;
};
