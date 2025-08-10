import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getCheckInEndRoute } from '../../../services/api/routes/weekly_check_in_routes';
import { WeeklyCheckInRead } from '../../../services/api/schema/weekly_check_in_schema';

export const useCheckIn = () => {
	return useMutation({
		mutationFn: checkIn,
	});
};

const checkIn = async ({
	playerId,
}: {
	playerId: number;
}): Promise<WeeklyCheckInRead> => {
	const response = await axiosInstance.post(
		getCheckInEndRoute(playerId),
		{},
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response.data;
};
