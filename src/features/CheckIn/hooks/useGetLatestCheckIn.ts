import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getLatestCheckIn } from '../../../services/api/crud/weekly_check_in_crud';

export const useGetLatestCheckIn = (playerId?: number) => {
	const latestCheckInQuery = useQuery({
		queryKey: ['weekly_check_in', playerId],
		queryFn: () => getLatestCheckIn(playerId!),
		enabled: !!playerId,
	});

	if (latestCheckInQuery.isError)
		toast.error('Failed to load latest weekly check in', {
			toastId: 'latest-weekly_check_in-error',
		});

	return latestCheckInQuery;
};
