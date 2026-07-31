const baseWeeklyCheckInRoute = '/weekly_check_in';

export const getCheckInEndRoute = (playerId: number) => {
	return `${baseWeeklyCheckInRoute}/check_in/${playerId}`;
};

export const getLatestCheckInEndRoute = (playerId: number) => {
	return `${baseWeeklyCheckInRoute}/check_in/latest/${playerId}`;
};

export const getPerfectWeeklyCheckInRewardEndRoute = (playerId: number) => {
	return `${baseWeeklyCheckInRoute}/check_in/reward/${playerId}`;
};
