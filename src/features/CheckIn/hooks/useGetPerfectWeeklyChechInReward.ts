import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getPerfectWeeklyCheckInRewardEndRoute } from '../../../services/api/routes/weekly_check_in_routes';
import { PerfectWeeklyCheckInRewardRead } from '../../../services/api/schema/weekly_check_in_schema';

export const useGetPerfectWeeklyChechInReward = () => {
	return useMutation({
		mutationFn: checkIn,
	});
};

const checkIn = async ({
	playerId,
}: {
	playerId: number;
}): Promise<PerfectWeeklyCheckInRewardRead> => {
	const response = await axiosInstance.post(
		getPerfectWeeklyCheckInRewardEndRoute(playerId),
		{},
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response.data;
};
