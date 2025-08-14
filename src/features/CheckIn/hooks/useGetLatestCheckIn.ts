import { useQuery } from '@tanstack/react-query';
import { getLatestCheckIn } from '../../../services/api/crud/weekly_check_in_crud';
import { toast } from '../../../lib/toastify/charLimitedToast';

export const useGetLatestCheckIn = (playerId?: number) => {
	const latestCheckInQuery = useQuery({
		queryKey: ['weekly_check_in', playerId],
		queryFn: () => getLatestCheckIn(playerId!),
		enabled: !!playerId,
	});

	if (latestCheckInQuery.isError)
		toast.error('Weekly check in not found', {
			toastId: 'latest-weekly-check-in-error',
		});

	return latestCheckInQuery;
};
