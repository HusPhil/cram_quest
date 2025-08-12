import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getPlayerBossAvailabilityCounter } from '../../../../services/api/crud/player_crud';

export const useGetBossAvailabilityCounter = (playerId?: number) => {
	const latestCheckInQuery = useQuery({
		queryKey: ['player', playerId, 'boss_availability_counter'],
		queryFn: () => getPlayerBossAvailabilityCounter(playerId!),
		enabled: !!playerId,
	});

	if (latestCheckInQuery.isError)
		toast.error('Failed to load boss availability counter', {
			toastId: 'latest-boss_availability_counter-error',
		});

	return latestCheckInQuery;
};
