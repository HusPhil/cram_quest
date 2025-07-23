import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../../lib/axios/axiosInstance';
import { getCheckInEndRoute } from '../../../services/api/routes/weekly_check_in_routes';

export const useCheckIn = () => {
	return useMutation({
		mutationFn: checkIn,
	});
};

const checkIn = async ({ playerId }: { playerId: number }) => {
	const response = await axiosInstance.post(
		getCheckInEndRoute(playerId),
		{},
		{ withCredentials: true }
	);

	if (response.status !== 200) {
		throw new Error('Failed to create new subject');
	}

	return response;
};
